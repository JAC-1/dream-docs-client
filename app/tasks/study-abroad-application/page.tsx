import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const StudyAbroadApplication: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <SubmissionPage
      title="留学申請書"
      task_label="Study_Abroad_Application"
      description={['ご自身で留学申請書をアップロードしてください。']}
      task_aproved={
        taskStatus(TASK_TYPES.STUDY_ABROAD_APPLICATION) === 'approved'
          ? true
          : false
      }
    />
  );
};

export default StudyAbroadApplication;
