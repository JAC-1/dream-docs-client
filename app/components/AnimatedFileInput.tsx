import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';

interface AnimatedInputProps {
  icon: LucideIcon;
  placeholder: string;
  ariaLabel: string;
  delay?: number;
  type?: string;
  value: string;
  onChange: handleChange;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

type handleChange = () => void;

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  icon: Icon,
  placeholder,
  ariaLabel,
  delay = 0,
  type = 'file',
  value,
  onChange: handleChange,
  disabled,
  required = false,
  name,
}) => {
  return (
    <div
      className="relative animate-fadeInUp opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative flex items-center">
        <Icon className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <Input
          type={type}
          className="pl-10 py-6"
          placeholder="Upload"
          aria-label={ariaLabel}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          name={name}
        />
      </div>
    </div>
  );
};

export default AnimatedInput;
