import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const HomeStayLetter: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="ホストファミリーへの手紙"
      task_label="Homestay_Letter"
      description={[
        'ホストファミリーへの手紙をアップロードしてください。',
        'この手紙があなたのホームステイ先のご家族への紹介状となります。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.HOMESTAY_LETTER) === 'approved' ? true : false
      }
      count={null}
    />
  );
};

export default HomeStayLetter;
