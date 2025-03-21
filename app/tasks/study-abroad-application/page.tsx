import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const StudyAbroadApplication: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="留学申請書"
      task_label="Study_Abroad_Application"
      description={['ご自身で留学申請書をアップロードしてください。']}
      task_aproved={
        taskStatus(TASK_TYPES.STUDY_ABROAD_APPLICATION) === 'approved'
          ? true
          : false
      }
      count={null}
    />
  );
};

export default StudyAbroadApplication;
