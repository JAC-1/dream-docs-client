import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/supabase_annon';
import { MOCK_TASK_STATUSES } from '@/lib/preview/mock-data';

const getTasks = async () => {
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return MOCK_TASK_STATUSES;
  }

  const { userId } = auth();
  if (!userId) throw 'Possibly Unauthorized';
  try {
    const { data: user_file_cache, error } = await supabase
      .from('file_cache')
      .select('task_type, status')
      .eq('user_id', userId);
    if (error) throw error;
    if (!user_file_cache || user_file_cache.length === 0) return {}; // Handle empty response
    const taskStatusMap = new Map(
      user_file_cache.map((task) => [task.task_type, task.status])
    );
    return Object.fromEntries(taskStatusMap);
  } catch (error) {
    console.error('Error fetching task from database: ', error);
    return error;
  }
};

const nullOrUserCache = async (): Promise<any> => {
  try {
    return await getTasks();
  } catch (error: any) {
    console.error('Error fetching task from database: ', error);
    throw new Error(error.toString());
  }
};

export default nullOrUserCache;
