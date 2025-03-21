import { NextResponse } from 'next/server';
import { encryptWithPublic } from '@/lib/encryptWithPublic';
import { EncryptRequest } from '@/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { TablesInsert } from '@/database.types';
import {
  insertDocumentCache,
  insertDocumentKey,
} from '@/lib/supabase/opperations';
import { uploadDocToTurso } from '@/lib/turso/opperations';

export async function POST(request: Request) {
  try {
    const { encryptedFile, documentKey, documentCache }: EncryptRequest =
      await request.json();

    if (!encryptedFile || !documentKey || !documentCache) {
      return NextResponse.json({
        status: 400,
        statusText: 'Missing required data',
      });
    }

    const keyPayload: TablesInsert<'file_keys'> = {
      id: uuidv4(),
      document_id: documentCache.document_id!,
      encrypted_key: documentKey,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    try {
      const insertFileDetails = await uploadDocToTurso(
        encryptedFile,
        documentCache.document_id!
      );
      if (!insertFileDetails) {
        console.error('Turso Upload Error: Failed to insert file');
        throw new Error('Failed to insert file');
      }

      const documentCacheResponse = await insertDocumentCache(documentCache);
      if (!documentCacheResponse) {
        console.error('Cache Error: Failed to insert document cache');
        throw new Error('Failed to insert document cache');
      }

      const keyResponse = await insertDocumentKey(
        keyPayload,
        documentCache.document_id!
      );
      if (!keyResponse) {
        console.error('Key Error: Failed to insert document key');
        throw new Error('Failed to insert document key');
      }

      return NextResponse.json({ status: 200 });
    } catch (error: any) {
      console.error('Operation Error:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
      return NextResponse.json(
        {
          error:
            'ドキュメントのアップロードに問題が発生しました。この問題が続く場合は、管理者にご連絡ください。',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request Error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error:
          'ご依頼の処理中にエラーが発生しました。この問題が続く場合は、管理者にご連絡ください。',
      },
      {
        status: 500,
      }
    );
  }
}
