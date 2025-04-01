import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const StudyAbroadAgreementContentPage: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="留学同意書"
      task_label="Study_Abroad_Agreement"
      description={[
        'このドキュメントはパリサー学区のものです。',
        '留学中に従うべき情報とルールが書類に記載されています。',
        '保護者の署名が必要な点に注意ください。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.STUDY_ABROAD_AGREEMENT) == 'approved'
          ? true
          : false
      }
      count={null}
      downloadUrl="/downloads/留学同意書.pdf"
    />
  );
};

export default StudyAbroadAgreementContentPage;
