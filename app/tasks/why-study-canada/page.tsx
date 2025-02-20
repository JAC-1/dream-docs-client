import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";


const WhyStudyInCanada: React.FC = () => {
  return (

    <SubmissionPage
      title="カナダ留学理由"
      task_label="Why_Study_In_Canada"
      description={[
        "カナダで勉強したい理由について説明する手紙を作成させていただきます。",
        "テンプレートまたは授業で話し合った配布資料を使用してください。",
      ]}
    />
  );

};

export default WhyStudyInCanada;

