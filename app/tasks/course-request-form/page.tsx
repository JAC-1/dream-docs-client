import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const CourseRequestForm: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];

  return (
    <CryptoClient
      title="コース申込書"
      task_label="Course_Request_Form"
      description={[
        '以下の書類に受講したい科目を記入してください。',
        '選択したコースが受講できない可能性がありますのでご注意ください。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.COURSE_REQUEST_FORM) === 'approved' ? true : false
      }
      count={null}
    />
  );
};

// TODO: Add to page and include red warning for dream builder program students
// WARNING: このフォームはDream Builder Programの学生には適用されません。
export default CourseRequestForm;
