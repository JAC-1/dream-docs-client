import CryptoClient from '@/app/components/submissionPage/CryptoClient';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const HeadShot: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="証明写真"
      task_label="Headshot"
      description={['顔写真をアップロードしてください。']}
      task_aproved={
        taskStatus(TASK_TYPES.HEADSHOT) === 'approved' ? true : false
      }
      count={null}
      downloadUrl="/downloads/ホストファミリーへの手紙（記入例）.pdf"
    />
  );
};

export default HeadShot;
