import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";

const PersonalInformationWaiver: React.FC = () => {
  return (
    <SubmissionPage
      title="公人情報同意書"
      task_label="Personal_Information_Waiver"
      description={[
        "このドキュメントは、海外渡航時にあなたの個人情報の一部をPaliserが使用することを許可するためのものです。",
        "ご質問やご不明な点、翻訳が必要な場合はお気軽にお申し付けください。",
      ]}
      downloadUrl="/api/documents/personal-information-waiver"
    />
  );
};

export default PersonalInformationWaiver;
