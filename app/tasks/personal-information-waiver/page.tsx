import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const PersonalInformationWaiver: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="個人情報同意書"
      task_label="Personal_Information_Waiver"
      description={[
        'この同意書は海外渡航時にあなたの個人情報の一部をPaliserが利用することを許可するものです。',
        '保護者の署名が必要な点に注意ください。',
      ]}
      // downloadUrl="/api/documents/personal-information-waiver"
      task_aproved={
        taskStatus(TASK_TYPES.PERSONAL_INFORMATION_WAIVER) === 'approved'
          ? true
          : false
      }
      count={null}
    />
  );
};

export default PersonalInformationWaiver;
