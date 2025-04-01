import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import getPictureCount from '@/utils/getPictureCount';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const FamilyImages: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  const imageCount = await getPictureCount();

  return (
    <CryptoClient
      title="家族写真"
      task_label="Family_Images"
      description={[
        '最低3枚、ご自身の家族写真をアップロードしてください。',
        'これらの写真はホームステイ先のご家族とのマッチングに使用され、ご自身がどのような人物であるかを紹介するためのものです。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.FAMILY_IMAGES) === 'approved' ? true : false
      }
      count={imageCount == 0 ? null : imageCount}
    />
  );
};

export default FamilyImages;
