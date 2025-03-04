import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const PassportCopy: React.FC = () => {
  return (
    <SubmissionPage
      title="パスポートのカラーコピー"
      task_label="Passport"
      description={[
        'パスポートのカラーコピーをアップロードしてください。',
        'これはビザ申請に必要です。コピーが鮮明で読みやすいことを確認してください。',
      ]}
    />
  );
};

export default PassportCopy;
