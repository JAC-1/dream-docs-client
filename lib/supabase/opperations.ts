import supabase from './supabase_admin';
import { TablesInsert } from '@/database.types';

export const insertDocumentCache = async (
  payload: TablesInsert<'file_cache'>
) => {
  try {
    const payloadWithFilePath = { ...payload };
    const { data, error } = await supabase
      .from('file_cache')
      .insert([payloadWithFilePath])
      .select();
    if (error) {
      console.error(error);
      throw error;
    }
    console.log(data);
    return data;
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
    const { data, error } = await supabase
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
