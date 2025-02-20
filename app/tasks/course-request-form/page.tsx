import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";

const CourseRequestForm: React.FC = () => {
  return (
    <SubmissionPage
      title="コース申込書"
      task_label="Course_Request_Form"
      description={[
        "以下の書類に受講したい科目を記入してください。",
        "選択したコースが利用できない可能性がありますのでご注意ください。",
      ]}
    />
  );
};

export default CourseRequestForm;
