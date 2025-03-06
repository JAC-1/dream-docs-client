import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const HeadShot: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <SubmissionPage
      title="証明写真"
      task_label="Headshot"
      description={['顔写真をアップロードしてください。']}
      task_aproved={
        taskStatus(TASK_TYPES.HEADSHOT) === 'approved' ? true : false
      }
    />
  );
};

export default HeadShot;
