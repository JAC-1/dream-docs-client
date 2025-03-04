import { auth } from '@clerk/nextjs/server';
import supabase from '@/lib/supabase/supabase_annon';

const getTasks = async () => {
  const { userId } = auth();
  if (!userId) throw 'Possibly Unauthorized';
  try {
    const { data: user_file_cache, error } = await supabase
      .from('file_cache')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    const taskStatusMap = user_file_cache.reduce(
      (acc, task) => ({
        ...acc,
        [task.task_type]: task.status,
      }),
      {} as Record<string, string>
    );
    return taskStatusMap;
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
