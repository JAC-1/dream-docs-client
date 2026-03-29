// PREVIEW MODE: Real Supabase query is commented out.
// In production, this counts how many Family_Images a user has uploaded so the UI
// can show the current photo count on the family-images task page.
//
// import { auth } from '@clerk/nextjs/server';
// import supabase from '@/lib/supabase/supabase_annon';

const getPhotoCount = async () => {
  // PREVIEW MODE: return a mock count so the family-images page renders correctly.
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return 2; // sample count — below the 3-photo minimum, so the counter shows red
  }

  // const { userId } = auth();
  // if (!userId) throw 'Possibly Unauthorized';
  // try {
  //   const { data, error } = await supabase
  //     .from('file_cache')
  //     .select('task_type')
  //     .eq('user_id', userId)
  //     .eq('task_type', 'Family_Images');
  //   if (error) throw error;
  //   return data.length;
  // } catch (error) {
  //   console.error('Error fetching task from database: ', error);
  //   return error;
  // }

  return 0;
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
