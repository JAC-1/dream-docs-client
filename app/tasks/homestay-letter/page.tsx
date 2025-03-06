import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';
import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';

const HomeStayLetter: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <SubmissionPage
      title="ホストファミリーへの手紙"
      task_label="Homestay_Letter"
      description={[
        'ホストファミリーへの手紙をアップロードしてください。',
        'この手紙があなたのホームステイ先のご家族への紹介状となります。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.HOMESTAY_LETTER) === 'approved' ? true : false
      }
    />
  );
};

export default HomeStayLetter;
