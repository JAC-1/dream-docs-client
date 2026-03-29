'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';

export default function PreviewShell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="flex item-center">
          <User className="self-center" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>アカウント（プレビュー）</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button asChild variant="ghost" className="w-full justify-start p-0">
            <Link href="/">提出リスト</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button asChild variant="ghost" className="w-full justify-start p-0">
            <Link href="/info">内容</Link>
          </Button>
        </DropdownMenuItem>
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
          <span className="text-gray-400 text-sm px-2">プレビューモード</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
