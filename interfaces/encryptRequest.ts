import { TablesInsert } from '@/database.types';

export interface EncryptRequest {
  userId: string;
  encryptedFile: string;
  documentKey: string;
  documentCache: TablesInsert<'file_cache'>;
}
