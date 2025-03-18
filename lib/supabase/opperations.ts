import supabase from './supabase_admin';
import { TablesInsert } from '@/database.types';

export const insertDocumentCache = async (
  payload: TablesInsert<'file_cache'>
) => {
  try {
    const payloadWithFilePath = { ...payload };
    const { error } = await supabase
      .from('file_cache')
      .insert([payloadWithFilePath]);
    if (error) {
      console.error(error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const insertDocumentKey = async (
  payload: TablesInsert<'file_keys'>,
  documentId: string
) => {
  try {
    const payloadWithDocumentId = { ...payload, document_id: documentId };
    const { error } = await supabase
      .from('file_keys')
      .insert([payloadWithDocumentId]);
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPictureCount = async (userId: string) => {
  // Uses the postgres function count_pictures to count how many family pictures a client has uploaded
  try {
    const { count, error } = await supabase.from('file_keys').select('*');
    // .eq('user_id', userId);
    // .eq('task_type', 'Family_Images');
    if (error) {
      throw error;
    }
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
