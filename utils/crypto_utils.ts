// Use the right crypto for your environment (needed to run tests)
const getCrypto = () => {
  if (typeof window !== 'undefined') {
    return window.crypto;
  }
  return crypto;
};
// Helper function to convert string to ArrayBuffer
const str2ab = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

// Helper function to convert ArrayBuffer to string
const ab2str = (buf: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, new Uint8Array(buf) as any);
};

export const generateSymmetricKey = async (): Promise<ArrayBuffer> => {
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  return window.crypto.subtle.exportKey('raw', key);
};

export const encryptMessage = async (
  message: string,
  symmetricKey: ArrayBuffer
): Promise<ArrayBuffer> => {
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
    str2ab(message)
  );
  return new Blob([iv, new Uint8Array(encrypted)]).arrayBuffer();
};

export const encryptMessageWithPublicKey = async (
  symmetricKey: ArrayBuffer,
  publicKey: string
): Promise<ArrayBuffer> => {
  const importedPublicKey = await window.crypto.subtle.importKey(
    'spki',
    str2ab(atob(publicKey)),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );
  return window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    importedPublicKey,
    symmetricKey
  );
};
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
  const encryptedBlob = new Blob([iv, new Uint8Array(encrypted)]);
  return encryptedBlob;
};
