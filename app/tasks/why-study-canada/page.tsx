import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const WhyStudyInCanada: React.FC = () => {
  return (
    <SubmissionPage
      title="志願理由書"
      task_label="Why_Study_In_Canada"
      description={[
        'カナダで勉強したい理由について説明してください。',
        '授業でテンプレートを配布するので参考にして書いてください',
      ]}
    />
  );
};

export default WhyStudyInCanada;
