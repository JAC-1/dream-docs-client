import SubmissionPage from '@/app/components/submissionPage/SubmissionPage';

const ImmunizationRecord: React.FC = () => {
  return (
    <SubmissionPage
      title="予防接種記録"
      task_label="Immunization_Record"
      description={[
        '予防接種記録のカラーコピーをアップロードしてください。',
        '予防接種記録は母子手帳の過去の予防接種記録が対象です。',
      ]}
    />
  );
};

export default ImmunizationRecord;
