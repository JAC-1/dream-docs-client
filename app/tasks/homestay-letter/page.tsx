import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const HomeStayLetter: React.FC = () => {
  // TODO: Check if y
  return (
    <SubmissionPage
      title="ホストファミリーへの手紙"
      task_label="Homestay_Letter"
      description={[
        'ホストファミリーへの手紙をアップロードしてください。',
        'この手紙があなたのホームステイ先のご家族への紹介状となります。',
      ]}
    />
  );
};

export default HomeStayLetter;
