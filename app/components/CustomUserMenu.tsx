'use client';
import { useClerk, useUser } from '@clerk/nextjs';
import { useState } from 'react';

export function CustomUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center"
        >
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
             サインアウト
            </button>
          </div>
        )}
      </div>
  );
}
