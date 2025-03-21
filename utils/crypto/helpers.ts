/**
 * Gets the appropriate crypto implementation (browser or Node.js)
 */
export const getCrypto = () => {
  if (typeof window !== 'undefined') {
    return window.crypto;
  }
  return crypto;
};

/**
 * Converts a string to an ArrayBuffer
 * @param str The string to convert
 * @returns The string as an ArrayBuffer
 */
export const str2ab = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

/**
 * Converts an ArrayBuffer to a string
 * @param buf The ArrayBuffer to convert
 * @returns The ArrayBuffer as a string
 */
export const ab2str = (buf: ArrayBuffer): string => {
  return String.fromCharCode.apply(null, new Uint8Array(buf) as any);
};

/**
 * Converts an ArrayBuffer to a base64 string
 * @param buffer The ArrayBuffer to convert
 * @returns The ArrayBuffer as a base64 string
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as any));
};

/**
 * Converts a base64 string to an ArrayBuffer
 * @param base64 The base64 string to convert
 * @returns The base64 string as an ArrayBuffer
 */
export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64);
  return str2ab(binaryString);
};

export const pemToBinary = (pem: string): Uint8Array<ArrayBuffer> => {
  const pemContents = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s/g, ''); // Remove whitespace

  const binaryDer = atob(pemContents);

  return Uint8Array.from(binaryDer, (c) => c.charCodeAt(0));
};
