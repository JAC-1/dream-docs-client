import { SignedIn, SignedOut } from '@clerk/nextjs';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

export default function WelcomeScreen() {
  if (isPreview) {
    return (
      <div className="space-y-6 w-full flex flex-col items-center">
        <LoggedInView />
      </div>
    );
  }

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
