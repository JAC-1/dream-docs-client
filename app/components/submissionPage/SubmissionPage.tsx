'use client';

import { generateSymmetricKey, encryptFile } from '@/utils/crypto_utils';
import { useState, useCallback, useRef } from 'react';
import { EncryptRequest } from '@/interfaces';
import AnimatedTextTailwind from '../AnimatedTextTailwind';
import { Download, UploadIcon } from 'lucide-react';
import { SecureUploadProps } from '@/interfaces/secure-upload';
import AnimatedButton from '../AnimatedButton';
import { useAuth } from '@clerk/nextjs';
import { TablesInsert } from '@/database.types';

export default function CryptoClient({
  title,
  task_label,
  description,
  downloadUrl,
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
  const [symmetricKey, setSymmetricKey] = useState<ArrayBuffer | null>(null);
  const [symmetricKeyBase64, setSymmetricKeyBase64] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const uploadFileRef = useRef<HTMLInputElement | null>(null);

  const { userId } = useAuth();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;
      // Check for file size and denie if too big
      if (selectedFile.size > 3145728) {
        setError(
          'ファイルのサイズが大きすぎます。3MB以下のファイルを選択してください。'
        );
        return;
      }
      setFile(selectedFile);
      setError(null);
      setIsProcessing(true);
      setFileDetails({
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        document_id: window.crypto.randomUUID(),
        status: 'pending',
        user_id: userId!,
        task_type: task_label,
      });

      generateSymmetricKey()
        .then((key) => {
          setSymmetricKey(key);
          const keyBase64 = btoa(
            String.fromCharCode.apply(null, new Uint8Array(key) as any)
          );
          setSymmetricKeyBase64(keyBase64);
          return encryptFile(selectedFile, key);
        })
        .then((encryptedFile: Blob) => {
          let reader = new FileReader();
          reader.onload = () => {
            const base64Result = (reader.result as string).split(',')[1];
            setBase64EncryptedFile(base64Result);
            setIsProcessing(false);
          };
          reader.onerror = () => {
            setError('暗号化されたファイルの読み取りエラーが発生されました。');
            setIsProcessing(false);
            setFileDetails(null);
          };
          reader.readAsDataURL(encryptedFile);
        })
        .catch((error) => {
          // console.error('Error processing file:', error);
          setError(error.message);
          setIsProcessing(false);
          setFileDetails(null);
        });
    },
    []
  );

  // Button sends encrypted file and symmetric key to server
  const sendToServer = useCallback(() => {
    if (!base64EncryptedFile || !symmetricKeyBase64 || !fileDetails) {
      setError(
        '必要なデータが不足しています。ファイルを選択してもう一度お試しください。'
      );
      return;
    }
    setIsProcessing(true);
    setError(null);
    const payload: EncryptRequest = {
      userId: userId!,
      encryptedFile: base64EncryptedFile!,
      documentKey: symmetricKeyBase64,
      documentCache: fileDetails,
    };
    fetch('/api/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) =>
        response.json().then((data) => {
          if (response.ok) {
            setIsProcessing(false);
            setFileDetails(null);
            setSuccess(true);
            setSymmetricKey(null);
            setSymmetricKeyBase64(null);
            setBase64EncryptedFile(null);
          } else {
            console.log(data);
            setError(data.error);
            setIsProcessing(false);
          }
        })
      )
      .catch((error) => {
        setError(error.message);
        setIsProcessing(false);
      });
  }, [base64EncryptedFile, symmetricKeyBase64, fileDetails]);

  return (
    <div className="h-auto  mt-28">
      <div className="p-5 m-3 border-none shadow-none">
        <div className="py-5">
          <AnimatedTextTailwind
            text={title}
            element="h1"
            className="text-3xl"
            delay={0}
          />
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

          <div className="grid grid-cols-3 grid-rows-2 gap-4 my-10">
            {downloadUrl && (
              <div className="col-span-1 row-span-1">
                <AnimatedButton
                  icon={Download}
                  href={downloadUrl}
                  ariaLabel="Download Document"
                  delay={1.5}
                  buttonVariant="ghost"
                  text=""
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
                icon={UploadIcon}
                text={isProcessing ? '処理中です...' : 'アップロード'}
                ariaLabel="Upload File"
                onClick={initiateUpload}
                buttonVariant="outline"
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
