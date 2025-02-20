import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import AnimatedText from '../AnimatedTextTailwind';

const LoggedOutView = () => (
  <div className="h-screen flex justify-center items-center flex-col text-center">
    <AnimatedText
      text="Dream Docksへようこそ"
      className="text-4xl md:text-6xl py-8 font-serif mt-5"
      delay={0.2}
    />
    <AnimatedText
      text="サインインして始めましょう"
      className="text-2xl font-bold text-center"
      delay={0.5}
    />
    <Link
      className={`${buttonVariants({ variant: 'default' })} w-1/2 animate-fadeInUp opacity-0 mt-7 h-12`}
      href="/sign-in"
    >
      サインイン
    </Link>
  </div>
);

export default LoggedOutView;
