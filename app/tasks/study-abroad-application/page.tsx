import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";


const StudyAbroadApplication: React.FC = () => {
  return (

    <SubmissionPage
      title="留学申請書"
      task_label="Study_Abroad_Application"
      description={[
        "ご自身で留学申請書をアップロードしてください。",
      ]}
    />

  );

};

export default StudyAbroadApplication;

