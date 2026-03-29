'use client';

import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import {
  ClerkAPIError,
  EmailCodeFactor,
  SignInFirstFactor,
} from '@clerk/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import AnimatedText from '@/app/components/AnimatedTextTailwind';
import clerk_japanese_errors from '@/utils/clerk_japanese_errors';
import { IBM_Plex_Mono } from 'next/font/google';

const plex = IBM_Plex_Mono({ subsets: ['latin-ext'], weight: '400' });

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

// Rendered in preview mode — no Clerk hooks, just the static UI
function SignInPreview() {
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');

  if (verifying) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-full bg-transparent max-w-sm backdrop-blur-sm">
          <CardHeader>
            <AnimatedText
              text="メールコードご確認"
              className="font-serif md:text-4xl  text-3xl font-bold text-center"
              delay={0.3}
            />
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <AnimatedText
                  text="メールに送信したコードを入力してください"
                  className="text-sm font-bold"
                  delay={0.6}
                />
                <Input
                  value={code}
                  id="code"
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                  className={`${plex.className} backdrop-blur-md`}
                />
              </div>
              <Button type="submit" className="w-full">
                確認
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full bg-transparent backdrop-blur-sm max-w-sm ">
        <CardHeader>
          <AnimatedText
            text="サインイン"
            className="text-3xl md:text-4xl font-bold text-center font-serif"
            delay={0.5}
          />
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setVerifying(true);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <AnimatedText
                text="メールアドレスを入力してください。"
                className=" text-sm font-bold"
                delay={0.7}
              />
              <Input
                value={email}
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`${plex.className} animate-fadeIn opacity-0 backdrop-blur-md border-gray-300`}
              />
            </div>
            <Button
              type="submit"
              className="w-full animate-fadeIn opacity-0 delay-700 duration-700"
            >
              続ける
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Rendered in production — full Clerk sign-in flow
function SignInReal() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [verifying, setVerifying] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [errors, setErrors] = React.useState<ClerkAPIError[]>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    if (!isLoaded || !signIn) return null;

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      });

      const isEmailCodeFactor = (
        factor: SignInFirstFactor
      ): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code';
      };
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor);

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor;
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        });
        setVerifying(true);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    if (!isLoaded || !signIn) return null;

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/');
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (verifying) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-full bg-transparent max-w-sm backdrop-blur-sm">
          <CardHeader>
            <AnimatedText
              text="メールコードご確認"
              className="font-serif md:text-4xl  text-3xl font-bold text-center"
              delay={0.3}
            />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <AnimatedText
                  text="メールに送信したコードを入力してください"
                  className="text-sm font-bold"
                  delay={0.6}
                />
                <Input
                  value={code}
                  id="code"
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isSubmitting}
                  className={`${plex.className} backdrop-blur-md`}
                />
              </div>
              {errors && errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {errors.map((error, i) => (
                      <p key={i}>{clerk_japanese_errors(error.code)}</p>
                    ))}
                  </AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                確認
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full bg-transparent backdrop-blur-sm max-w-sm ">
        <CardHeader>
          <AnimatedText
            text="サインイン"
            className="text-3xl md:text-4xl font-bold text-center font-serif"
            delay={0.5}
          />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <AnimatedText
                text="メールアドレスを入力してください。"
                className=" text-sm font-bold"
                delay={0.7}
              />
              <Input
                value={email}
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className={`${plex.className} animate-fadeIn opacity-0 backdrop-blur-md border-gray-300`}
              />
            </div>
            {errors && errors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.map((error, i) => (
                    <p key={i}>{clerk_japanese_errors(error.code)}</p>
                  ))}
                </AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full animate-fadeIn opacity-0 delay-700 duration-700"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              続ける
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignIn() {
  if (isPreview) return <SignInPreview />;
  return <SignInReal />;
}
