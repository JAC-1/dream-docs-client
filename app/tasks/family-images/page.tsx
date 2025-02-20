import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";


const FamilyImages: React.FC = () => {
  return (

    <SubmissionPage
      title="家族写真"
      task_label="Family_Images"
      description={[
        "写真を最低3枚、ご自身の家族の写真をアップロードしてください。",
        "これらの写真はホームステイ先のご家族とのマッチングに使用され、ご自身がどのような人物であるかを紹介するためのものです。",
      ]}
    />

  );

};

export default FamilyImages;

