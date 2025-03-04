import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const PersonalInformationWaiver: React.FC = () => {
  return (
    <SubmissionPage
      title="個人情報同意書"
      task_label="Personal_Information_Waiver"
      description={[
        'この同意書は海外渡航時にあなたの個人情報の一部をPaliserが利用することを許可するものです。',
        '保護者の署名が必要な点に注意ください。',
      ]}
      downloadUrl="/api/documents/personal-information-waiver"
    />
  );
};

export default PersonalInformationWaiver;
