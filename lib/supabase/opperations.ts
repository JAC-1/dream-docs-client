// PREVIEW MODE: All Supabase database operations are mocked below.
// In production, these write document metadata and encryption keys to Supabase tables.
//
// import supabase from './supabase_admin';
import { TablesInsert } from '@/database.types';

// In production: inserts a file_cache row (file metadata + task status) for the given user.
export const insertDocumentCache = async (
  payload: TablesInsert<'file_cache'>
) => {
  // try {
  //   const payloadWithFilePath = { ...payload };
  //   const { error } = await supabase
  //     .from('file_cache')
  //     .insert([payloadWithFilePath]);
  //   if (error) {
  //     console.error(error);
  //     throw error;
  //   }
  //   return true;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }

  // Mock: simulate a successful insert.
  return true;
};

// In production: inserts a file_keys row linking the encrypted symmetric key to a document.
export const insertDocumentKey = async (
  payload: TablesInsert<'file_keys'>,
  documentId: string
) => {
  // try {
  //   const payloadWithDocumentId = { ...payload, document_id: documentId };
  //   const { error } = await supabase
  //     .from('file_keys')
  //     .insert([payloadWithDocumentId]);
  //   if (error) {
  //     throw error;
  //   }
  //   return true;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }

  // Mock: simulate a successful insert.
  return true;
};

// In production: counts how many family photos a user has uploaded via a Supabase query.
export const getPictureCount = async (userId: string) => {
  // try {
  //   const { count, error } = await supabase.from('file_keys').select('*');
  //   // .eq('user_id', userId);
  //   // .eq('task_type', 'Family_Images');
  //   if (error) {
  //     throw error;
  //   }
  //   return count;
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }

  // Mock: return a sample count.
  return 3;
};
