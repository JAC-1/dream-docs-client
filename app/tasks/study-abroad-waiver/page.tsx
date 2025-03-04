import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const StudyAbroadAgreementContentPage: React.FC = () => {
  return (
    <SubmissionPage
      title="留学同意書"
      task_label="Study_Abroad_Agreement"
      description={[
        'このドキュメントはパリサー学区のものです。',
        '留学中に従うべき情報とルールが書類に記載されています。',
        '保護者の署名が必要な点に注意ください。',
      ]}
    />
  );
};

export default StudyAbroadAgreementContentPage;
