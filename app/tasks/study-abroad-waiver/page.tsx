import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const StudyAbroadAgreementContentPage: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  console.log(tasksMap['Study_Abroad_Agreement']);
  console.log(tasksMap[TASK_TYPES.STUDY_ABROAD_AGREEMENT]);
  return (
    <SubmissionPage
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
    />
  );
};

export default StudyAbroadAgreementContentPage;
