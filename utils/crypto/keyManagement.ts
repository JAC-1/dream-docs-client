//
// utils/crypto/keyManagement.ts
import { str2ab, pemToBinary } from './helpers';

/**
 * Generates a symmetric key for encryption/decryption
 * Keeps the key within the SubtleCrypto environment
 */
export const generateSymmetricKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Encrypts a symmetric key with the server's public key
 * @param symmetricKey The symmetric key to encrypt
 * @param publicKeyBase64 The server's public key in base64 format
 * @returns The encrypted key as an ArrayBuffer
 */
export const encryptSymmetricKey = async (
  symmetricKey: ArrayBuffer,
  publicKeyRaw: string
): Promise<ArrayBuffer> => {
  const binaryDir = pemToBinary(publicKeyRaw);
  // Import the server's public key
  const importedPublicKey = await window.crypto.subtle.importKey(
    'spki',
    binaryDir.buffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );

  // Encrypt the symmetric key with the server's public key
  const encryptedKey = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    importedPublicKey,
    symmetricKey
  );
  return encryptedKey;
};

/**
 * Fetches the server's public key
 * @returns The server's public key as a base64 string
 */
export const fetchServerPublicKey = async (): Promise<string> => {
  const response = await fetch('/api/public-key');
  if (!response.ok) {
    throw new Error('Failed to fetch server public key');
  }

  const { publicKey } = await response.json();
  return publicKey;
};
