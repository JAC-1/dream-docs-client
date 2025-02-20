import { turso } from './connection';

export async function uploadDocToTurso(doc: string, externalDocId: string) {
  console.log(externalDocId);
  try {
    await turso.execute({
      sql: 'INSERT INTO files (external_doc_id, file) VALUES (?, ?)',
      args: [`${externalDocId}`, doc],
      // args: ['', doc],
    });
    return true;
  } catch (e) {
    throw e;
  }
}
