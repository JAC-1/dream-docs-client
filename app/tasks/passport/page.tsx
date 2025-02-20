import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";


const PassportCopy: React.FC = () => {
  return (

    <SubmissionPage
      title="パスポート"
      task_label="Passport"
      description={[
        "パスポートのコピーをアップロードしてください。",
        "これはビザ申請に必要です。コピーが鮮明で読みやすいことを確認してください。",
      ]}
    />

  );

};

export default PassportCopy;

