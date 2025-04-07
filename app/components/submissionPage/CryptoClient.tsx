'use client';

import { useState, useCallback, useRef } from 'react';
import { EncryptRequest } from '@/interfaces';
import AnimatedTextTailwind from '../AnimatedTextTailwind';
import { Download, UploadIcon, File } from 'lucide-react';
import { SecureUploadProps } from '@/interfaces/secure-upload';
import AnimatedButton from '../AnimatedButton';
import { useAuth } from '@clerk/nextjs';
import { TablesInsert } from '@/database.types';
import { generateSymmetricKey } from '@/utils/crypto_utils';
import { encryptFile } from '@/utils/crypto';
import { encryptSymmetricKey } from '@/utils/crypto';
import { fetchServerPublicKey } from '@/utils/crypto/';
import { arrayBufferToBase64 } from '@/utils/crypto';
import { IBM_Plex_Mono } from 'next/font/google';

const mono = IBM_Plex_Mono({ weight: '400', subsets: ['latin-ext'] });
export default function CryptoClient({
  title,
  task_label,
  description,
  downloadUrl,
  task_aproved,
  count = null,
}: SecureUploadProps) {
  const initiateUpload = () => {
    if (!uploadFileRef.current) return;
    //@ts-ignore
    uploadFileRef.current.click();
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] =
    useState<TablesInsert<'file_cache'> | null>(null);
  const [base64EncryptedFile, setBase64EncryptedFile] = useState<string | null>(
    null
  );
  const [symmetricKey, setSymmetricKey] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

  const { userId } = useAuth();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      // Check for file size and deny if too big
      if (selectedFile.size > 3145728) {
        setError(
          'ファイルのサイズが大きすぎます。3MB以下のファイルを選択してください。'
        );
        return;
      }

      setFile(selectedFile);
      setError(null);
      setIsProcessing(true);

      try {
        // Set file details
        setFileDetails({
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
          document_id: window.crypto.randomUUID(),
          status: 'pending',
          user_id: userId!,
          task_type: task_label,
        });

        // Generate symmetric key and encrypt file
        const key = await generateSymmetricKey();
        setSymmetricKey(key);

        const encryptedFile = await encryptFile(selectedFile, key);

        // Convert encrypted file to base64
        const reader = new FileReader();
        reader.onload = () => {
          const base64Result = (reader.result as string).split(',')[1];
          setBase64EncryptedFile(base64Result);
          setIsProcessing(false);
        };
        reader.onerror = () => {
          throw new Error(
            '暗号化されたファイルの読み取りエラーが発生されました。'
          );
        };
        reader.readAsDataURL(encryptedFile);
      } catch (error: any) {
        setError(error.message);
        setIsProcessing(false);
        setFileDetails(null);
      }
    },
    [userId, task_label]
  );

  // Button sends encrypted file and symmetric key to server
  const sendToServer = useCallback(async () => {
    if (!base64EncryptedFile || !symmetricKey || !fileDetails) {
      setError(
        'ファイルが不足しています。ファイルを選択してもう一度お試しください。'
      );
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Get the server's public key
      const publicKey = await fetchServerPublicKey();

      // Encrypt the symmetric key with the server's public key
      const encryptedKey = await encryptSymmetricKey(symmetricKey, publicKey);

      // Convert the encrypted key to base64
      const encryptedKeyBase64 = arrayBufferToBase64(encryptedKey);

      // Prepare the payload
      const payload: EncryptRequest = {
        userId: userId!,
        encryptedFile: base64EncryptedFile,
        documentKey: encryptedKeyBase64,
        documentCache: fileDetails,
      };

      // Send the payload to the server
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsProcessing(false);
        setFileDetails(null);
        setSuccess(true);
        setSymmetricKey(null);
        setBase64EncryptedFile(null);
      } else {
        setError(data.error);
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsProcessing(false);
    }
  }, [base64EncryptedFile, symmetricKey, fileDetails, userId]);

  return (
    <div className="h-auto mt-28">
      <div className="p-5 m-3 border-none shadow-none">
        <div className="py-5 grid grid-cols-3 grid-rows-1 gap-3 w-full content-baseline">
          <div className="col-span-2 ">
            <AnimatedTextTailwind
              text={title}
              element="h1"
              className="text-3xl"
              delay={0}
            />
          </div>
          {count && (
            <p className="text-right mx-1 my-1 w-20 h-5 self-end justify-self-end ">
              現在:
              <span
                className={`pr-1 text-md ${mono.className} ${count < 3 ? 'text-red-500' : 'text-green-500'}`}
              >
                {count}
              </span>
              枚
            </p>
          )}
        </div>
        <div>
          {description.map((text, index) => (
            <AnimatedTextTailwind
              key={index}
              text={text}
              className="py-1"
              delay={0.3 * (index + 1)}
            />
          ))}

          {task_aproved ? (
            <div className="my-10">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-700 font-medium text-center">
                  このタスクはすでに完了しています。新しいアップロードは必要ありません。
                </p>
              </div>
            </div>
          ) : (
            // Original upload functionality for non-approved tasks
            <div className="grid grid-cols-3 grid-rows-2 gap-4 my-10">
              {downloadUrl && (
                <div className="col-span-1 row-span-1">
                  <AnimatedButton
                    icon={Download}
                    href={downloadUrl}
                    ariaLabel="Download Document"
                    delay={1.5}
                    buttonVariant="ghost"
                    text="ダウンロード"
                  />
                </div>
              )}
              <input
                ref={uploadFileRef}
                type="file"
                className="hidden"
                id="uploadFile"
                onChange={handleFileChange}
              />
              <div
                className={`${downloadUrl ? 'col-span-2 row-span-1' : 'col-span-3 row-span-1'}`}
              >
                <AnimatedButton
                  href="#"
                  icon={File}
                  text={
                    isProcessing
                      ? '修理中'
                      : (fileDetails?.file_name &&
                          `${fileDetails?.file_name.slice(0, 10)}...(.${fileDetails?.file_name.split('.').pop()})を選択しています`) ||
                        'ファイルを選択'
                  }
                  ariaLabel="Upload File"
                  onClick={initiateUpload}
                  buttonVariant="outline"
                  font={mono}
                />
              </div>
              <div className="col-span-3 row-span-2">
                <AnimatedButton
                  href="#"
                  icon={UploadIcon}
                  text={isProcessing ? '処理中です...' : '送信'}
                  ariaLabel="Submit File Upload"
                  delay={1.8}
                  onClick={sendToServer}
                  disabled={!fileDetails || isProcessing}
                />
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 text-red-500" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="mt-4 text-green-500 text-center" role="alert">
              "成功！ファイルが暗号化されアップロードされました。"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
