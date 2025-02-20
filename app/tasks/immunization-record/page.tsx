import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";


const ImmunizationRecord: React.FC = () => {
  return (

    <SubmissionPage
      title="予防接種記録"
      task_label="Immunization_Record"
      description={[
        "予防接種記録のコピーをアップロードしてください。",
      ]}
    />

  );

};

export default ImmunizationRecord;

