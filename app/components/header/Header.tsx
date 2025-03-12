'use client';

import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import AnimatedTitle from '@/app/components/header/AnimatedTitle';
import { ChangeThemeButton } from './ChangeThemeButton';

export default function Component() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
      <div className="bg-background/40 backdrop-blur-sm border border-border/50 rounded-xl px-6 py-2 shadow-sm">
        <div className="flex items-center justify-between">
          <AnimatedTitle />
          <nav className="flex items-center space-x-4">
            <SignedIn>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="flex item-center">
                    <User className="self-center" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>アカウント</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start p-0"
                    >
                      <Link href="/">提出リスト</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start p-0"
                    >
                      <Link href="/info">内容</Link>
                    </Button>
                  </DropdownMenuItem>
                  {/*Add when contact page is ready*/}
                  <DropdownMenuItem>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start p-0"
                    >
                      <Link
                        href=""
                        className="text-gray-300 hover:text-gray-300 pointer-events-none"
                      >
                        コンタクト
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton>サインアウト</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
            <SignedOut>
              <Button asChild variant="ghost">
                <Link href="/sign-in">サインイン</Link>
              </Button>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
}

// <ChangeThemeButton />
