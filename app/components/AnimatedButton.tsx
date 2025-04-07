import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  href: string;
  icon?: LucideIcon;
  text: string;
  ariaLabel: string;
  delay?: number;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
  disabled?: boolean;
  font?: null | any;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  icon: Icon,
  text,
  ariaLabel,
  delay = 0,
  buttonVariant = 'default',
  onClick,
  disabled,
  font = null,
}) => {
  return (
    <div
      className={`relative animate-fadeInUp opacity-0 `}
      style={{ animationDelay: `${delay}s` }}
    >
      <Link
        className={`${buttonVariants({ variant: buttonVariant })} w-full py-6 ${
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        } `}
        href={href}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
      >
        {Icon ? <Icon className="w-5 h-5 mr-1" /> : null}
        <span className={`text-sm ${font && font.className}`}>{text}</span>
      </Link>
    </div>
  );
};
export default AnimatedButton;
