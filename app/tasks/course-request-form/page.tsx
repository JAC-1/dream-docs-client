import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const CourseRequestForm: React.FC = () => {
  return (
    <SubmissionPage
      title="コース申込書"
      task_label="Course_Request_Form"
      description={[
        '以下の書類に受講したい科目を記入してください。',
        '選択したコースが受講できない可能性がありますのでご注意ください。',
      ]}
    />
  );
};

// TODO: Add to page and include red warning for dream builder program students
// WARNING: このフォームはDream Builder Programの学生には適用されません。
export default CourseRequestForm;
