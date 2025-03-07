import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400" />
      <div className="relative flex flex-col items-center justify-center py-32 px-6 sm:py-40 sm:px-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 p-4">
          Contribute your shares with your group
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-gray-900 p-4">
          A group roommate trip or dinner, contri makes it simpler to track
          shared bills and settle up.
        </p>
        <Link href="/group">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl p-8"
          >
            Let&apos;s Begin
          </Button>
        </Link>
      </div>
    </div>
  );
}