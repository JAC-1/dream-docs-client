import getFileCache from '@/app/components/hompage/getFileCache';
import { TASK_TYPES } from '@/constants/taskTypes';
import CryptoClient from '@/app/components/submissionPage/CryptoClient';

const ImmunizationRecord: React.FC = async () => {
  const tasksMap = await getFileCache();
  const taskStatus = (taskType: string) => tasksMap[taskType];
  return (
    <CryptoClient
      title="予防接種記録"
      task_label="Immunization_Record"
      description={[
        '予防接種記録のカラーコピーをアップロードしてください。',
        '予防接種記録は母子手帳の過去の予防接種記録が対象です。',
      ]}
      task_aproved={
        taskStatus(TASK_TYPES.IMMUNIZATION_RECORD) === 'approved' ? true : false
      }
      count={null}
    />
  );
};

export default ImmunizationRecord;
