import AnimatedText from '../AnimatedTextTailwind';
import TaskButton from './TaskButton';
import {
  Signature,
  FileUser,
  ContactRound,
  Cross,
  Mail,
  TicketsPlane,
  Camera,
} from 'lucide-react';
import { TASK_TYPES } from '@/constants/taskTypes';
import getFileCache from './getFileCache';

const LoggedInView = async () => {
  const tasksMap = await getFileCache();
  if (tasksMap.message) {
    throw new Error('Error fetching file_cache', tasksMap);
  }
  // console.log(tasksMap);

  const getTaskStatus = (taskType: string) => tasksMap[taskType] || 'new';
  // console.log(getTaskStatus(TASK_TYPES.PERSONAL_INFORMATION_WAIVER));

  return (
    <div className="text-center w-full container mt-24">
      <AnimatedText
        text="タスク・リスト"
        element="h1"
        delay={0.2}
        className="md:text-6xl text-3xl p-5"
      />
      <div className="space-y-4 flex flex-col items-center overflow-y-scroll">
        <TaskButton
          href="/tasks/study-abroad-waiver"
          icon={Signature}
          // text="Study Abroad Waiver"
          text="留学免責同意書"
          delay={0.0}
          taskStatus={
            tasksMap ? getTaskStatus(TASK_TYPES.STUDY_ABROAD_AGREEMENT) : 'new'
          }
        />
        <TaskButton
          href="/tasks/personal-information-waiver"
          icon={FileUser}
          // text="Personal jInformation Waiver"
          text="個人情報同意書"
          delay={0.4}
          taskStatus={
            tasksMap
              ? getTaskStatus(TASK_TYPES.PERSONAL_INFORMATION_WAIVER)
              : 'new'
          }
        />
        <TaskButton
          href="/tasks/why-study-canada"
          icon={Mail}
          text="カナダ留学の理由"
          delay={0.8}
          taskStatus={
            tasksMap ? getTaskStatus(TASK_TYPES.WHY_STUDY_IN_CANADA) : 'new'
          }
        />
        <TaskButton
          href="/tasks/homestay-letter"
          icon={Mail}
          text="ホストファミリーの手紙"
          delay={0.8}
          taskStatus={
            tasksMap ? getTaskStatus(TASK_TYPES.HOMESTAY_LETTER) : 'new'
          }
        />
        <TaskButton
          href="/tasks/passport"
          icon={TicketsPlane}
          text="パスワード"
          delay={0.8}
          taskStatus={tasksMap ? getTaskStatus(TASK_TYPES.PASSPORT) : 'new'}
        />
        <TaskButton
          href="/tasks/headshot"
          icon={ContactRound}
          text="証明写真"
          delay={0.8}
          taskStatus={tasksMap ? getTaskStatus(TASK_TYPES.HEADSHOT) : 'new'}
        />
        <TaskButton
          href="/tasks/study-abroad-application"
          icon={Signature}
          text="留学申請書"
          delay={0.8}
          taskStatus={
            tasksMap
              ? getTaskStatus(TASK_TYPES.STUDY_ABROAD_APPLICATION)
              : 'new'
          }
        />
        <TaskButton
          href="/tasks/immunization-record"
          icon={Cross}
          text="予防接種記録"
          delay={0.8}
          taskStatus={
            tasksMap ? getTaskStatus(TASK_TYPES.IMMUNIZATION_RECORD) : 'new'
          }
        />
        <TaskButton
          href="/tasks/family-images"
          icon={Camera}
          text="家族写真"
          delay={0.8}
          taskStatus={
            tasksMap ? getTaskStatus(TASK_TYPES.FAMILY_IMAGES) : 'new'
          }
        />
      </div>
    </div>
  );
};

export default LoggedInView;
