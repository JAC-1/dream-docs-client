import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const PassportCopy: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <SubmissionPage
      title="パスポートのカラーコピー"
      task_label="Passport"
      description={[
        'パスポートのカラーコピーをアップロードしてください。',
        'これはビザ申請に必要です。コピーが鮮明で読みやすいことを確認してください。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.PASSPORT) === 'approved' ? true : false
      }
    />
  );
};

export default PassportCopy;
