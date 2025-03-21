import { str2ab } from './helpers';

/**
 * Encrypts a message using a symmetric key
 * @param message The message to encrypt
 * @param symmetricKey The symmetric key to use
 * @returns The encrypted message as an ArrayBuffer
 */
export const encryptMessage = async (
  message: string,
  symmetricKey: CryptoKey
): Promise<ArrayBuffer> => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    symmetricKey,
    str2ab(message)
  );

  return new Blob([iv, new Uint8Array(encrypted)]).arrayBuffer();
};

/**
 * Loads a file as an ArrayBuffer
 * @param file The file to load
 * @returns The file contents as an ArrayBuffer
 */
export const loadFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result instanceof ArrayBuffer) {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to load file as ArrayBuffer'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Encrypts a file using a symmetric key
 * @param file The file to encrypt
 * @param symmetricKey The symmetric key to use
 * @returns The encrypted file as a Blob
 */
export const encryptFile = async (
  file: File,
  symmetricKey: ArrayBuffer
): Promise<Blob> => {
  const fileContent = await loadFileAsArrayBuffer(file);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await window.crypto.subtle.importKey(
    'raw',
    symmetricKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    fileContent
  );

  return new Blob([iv, new Uint8Array(encrypted)]);
};
