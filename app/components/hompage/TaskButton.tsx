import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import {
  Check,
  LucideIcon,
  BadgeCheck,
  CircleAlert,
  LoaderPinwheel,
  Circle,
} from 'lucide-react';
import { TASK_TYPES } from '@/constants/taskTypes';

export interface TaskButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  delay?: number;
  taskStatus: 'new' | 'pending' | 'approved' | 'declined';
  disabled?: boolean;
}

export default function TaskButton({
  href,
  icon: Icon,
  delay,
  text,
  taskStatus = 'new',
  disabled = false,
}: TaskButtonProps) {
  const statusConfig = {
    new: { color: 'text-grey-500', bgColor: 'bg-grey-100', icon: Circle },
    pending: {
      color: 'text-grey-500',
      bgColor: 'bg-grey-100',
      icon: LoaderPinwheel,
    },
    approved: {
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      icon: BadgeCheck,
    },
    declined: {
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      icon: CircleAlert,
    },
  };

  const { color, bgColor, icon: StatusIcon } = statusConfig[taskStatus];

  const defaultStyle =
    'block w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-lg border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 ease-in-out';
  const disabledStyle =
    'block w-full bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-lg text-gray-400 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-not-allowed';

  return (
    <div
      className="relative md:w-full w-4/5 opacity-0 animate-fadeIn "
      style={{ animationDelay: `${delay}s` }}
    >
      <Link
        className={disabled ? disabledStyle : defaultStyle}
        href={disabled ? '#' : href}
      >
        <div className="flex items-center justify-between w-full">
          <Icon
            className={`w-6 h-6 sm:w-8 sm:h-8 ${disabled ? 'text-gray-400' : 'text-gray-600'}`}
          />
          <span
            className={`text-md sm:text-lg md:text-xl font-medium ${disabled ? 'text-gray-400' : 'text-gray-800'}`}
          >
            {text}
          </span>
          <div className={`p-2 rounded-full ${bgColor}`}>
            <StatusIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
          </div>
        </div>
      </Link>
    </div>
  );
}
