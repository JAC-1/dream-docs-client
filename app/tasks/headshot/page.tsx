import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const HeadShot: React.FC = () => {
  return (
    <SubmissionPage
      title="証明写真"
      task_label="Headshot"
      description={['顔写真をアップロードしてください。']}
    />
  );
};

export default HeadShot;
