import SubmissionPage from "@/app/components/submissionPage/SubmissionPage";

const HomeStayLetter: React.FC = () => {
  return (
    <SubmissionPage
      title="ホストファミリーの手紙"
      task_label="Homestay_Letter"
      description={[
        "アップロードしたい手紙を送ってください。",
        "この手紙があなたのホームステイ先のご家族への紹介状となります。",
      ]}
    />
  );
};

export default HomeStayLetter;
