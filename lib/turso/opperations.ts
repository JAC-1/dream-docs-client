// PREVIEW MODE: Turso insert is mocked.
// In production, this stores the encrypted file blob in the Turso SQLite `files` table,
// indexed by `external_doc_id` so it can be retrieved and decrypted server-side.
//
// import { turso } from './connection';

// In production: executes a parameterized INSERT into the Turso `files` table.
export async function uploadDocToTurso(doc: string, externalDocId: string) {
  // try {
  //   await turso.execute({
  //     sql: 'INSERT INTO files (external_doc_id, file) VALUES (?, ?)',
  //     args: [`${externalDocId}`, doc],
  //   });
  //   return true;
  // } catch (e) {
  //   throw e;
  // }

  // Mock: simulate a successful upload.
  return true;
}
