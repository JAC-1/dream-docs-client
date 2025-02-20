import { publicEncrypt, constants } from 'crypto';

export async function encryptWithPublic(dataPayload: string): Promise<string> {
  const chunksize = 200;
  const dataBuffer = Buffer.from(dataPayload);
  const encryptedChunks = [];
  const publicKey = process.env.PUBLIC_ENCRYPTION_KEY!;

  for (let i = 0; i < dataBuffer.length; i += chunksize) {
    const chunk = dataBuffer.subarray(i, i + chunksize);
    const encryptedChunk = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
      },
      chunk
    );
    encryptedChunks.push(encryptedChunk);
  }

  return Buffer.concat(encryptedChunks).toString('base64');
}
