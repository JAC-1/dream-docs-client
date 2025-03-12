import { SignedIn, SignedOut } from '@clerk/nextjs';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';

export default function WelcomeScreen() {
  return (
    <div className="space-y-6 w-full flex flex-col items-center">
      <SignedIn>
        <LoggedInView />
      </SignedIn>
      <SignedOut>
        <LoggedOutView />
      </SignedOut>
    </div>
  );
}
