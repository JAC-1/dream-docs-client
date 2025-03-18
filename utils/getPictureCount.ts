import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/supabase_annon';

const getPhotoCount = async () => {
  const { userId } = auth();
  if (!userId) throw 'Possibly Unauthorized';
  try {
    const { data, error } = await supabase
      .from('file_cache')
      .select('task_type')
      .eq('user_id', userId)
      .eq('task_type', 'Family_Images');
    if (error) throw error;
    // if (!user_file_cache || user_file_cache.length === 0) return {}; // Handle empty response
    return data.length;
  } catch (error) {
    console.error('Error fetching task from database: ', error);
    return error;
  }
};

const nullOrPhotoCount = async (): Promise<any> => {
  try {
    return await getPhotoCount();
  } catch (error: any) {
    console.error('Error fetching task from database: ', error);
    throw new Error(error.toString());
  }
};

export default nullOrPhotoCount;
