import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { LucideIcon, BadgeCheck, CircleAlert, Circle } from 'lucide-react';
import { TASK_TYPES } from '@/constants/taskTypes';

export interface TaskButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  delay?: number;
  taskStatus: 'new' | 'pending' | 'approved' | 'declined' | 'declined';
}

export default function TaskButton({
  href,
  icon: Icon,
  delay,
  text,
  taskStatus = 'new',
}: TaskButtonProps) {
  const statusConfig = {
    new: { color: 'text-blue-500', bgColor: 'bg-blue-100', icon: Circle },
    pending: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      icon: CircleAlert,
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

  return (
    <div
      className="relative md:w-full w-4/5 opacity-0 animate-fadeIn "
      style={{ animationDelay: `${delay}s` }}
    >
      <Link
        className="block w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-lg border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 ease-in-out"
        href={href}
      >
        <div className="flex items-center justify-between w-full">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
          <span className="text-md sm:text-lg md:text-xl font-medium text-gray-800">
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
