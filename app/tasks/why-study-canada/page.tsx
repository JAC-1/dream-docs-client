import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const WhyStudyInCanada: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="志願理由書"
      task_label="Why_Study_In_Canada"
      description={[
        'カナダで勉強したい理由について説明してください。',
        '授業でテンプレートを配布するので参考にして書いてください',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.WHY_STUDY_IN_CANADA) === 'approved' ? true : false
      }
      count={null}
    />
  );
};

export default WhyStudyInCanada;
