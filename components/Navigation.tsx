import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { WalletIcon } from '@/components/icons/WalletIcon';

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="flex items-center space-x-2">
        <WalletIcon />
        <span className="font-bold text-xl" style={{ color: 'green' }}>
          ContriMoney
        </span>
      </Link>

      <div className="flex items-center space-x-12">
        {/* Added new link for 'Your Groups' */}
        <Link
          href="/groups"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Your Groups
        </Link>
        <Link
          href="/group"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Create Group
        </Link>
        <Link
          href="/expense"
          className="text-gray-700 hover:text-gray-900 hover:underline"
        >
          Add Expense
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}