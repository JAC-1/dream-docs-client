import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const PassportCopy: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="パスポートのカラーコピー"
      task_label="Passport"
      description={[
        'パスポートのカラーコピーをアップロードしてください。',
        'これはビザ申請に必要です。コピーが鮮明で読みやすいことを確認してください。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.PASSPORT) === 'approved' ? true : false
      }
      count={null}
    />
  );
};

export default PassportCopy;
