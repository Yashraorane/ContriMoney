'use client';

import React from 'react';
import { Users, UserPlus, LineChart } from 'lucide-react';
import Banner from '@/components/Banner';
import FeatureCard from '@/components/FeatureCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* Hero Section */}
      <Banner />
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Why Choose ContriMoney?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            Icon={Users}
            title="Share Expenses Together"
            description="Split bills effortlessly with your group. Add members and let Split automatically calculate everyone's fair share."
          />
          <FeatureCard
            Icon={UserPlus}
            title="Quick Expense Entry"
            description="Record your expenses on the go. Every transaction you add is instantly shared with your group and factored into the calculations."
          />
          <FeatureCard
            Icon={LineChart}
            title="Smart Expense Dashboard"
            description="Track your financial picture at a glance. See your spending patterns, outstanding balances, and who owes who in real-time."
          />
        </div>
      </div>
      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
        By using ContriMoney, you agree to our Terms of Service and Privacy Policy
      </footer>
    </div>
  );
}