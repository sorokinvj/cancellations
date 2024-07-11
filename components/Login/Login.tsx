'use client';
import { FaCheckCircle } from 'react-icons/fa';
import LoginForm from '@/components/Login/LoginForm';
import Link from 'next/link';
import { FC } from 'react';
import ResetForm from './ResetForm';

type Props = {
  type?: 'reset-password' | 'sign-up';
};

const Login: FC<Props> = ({ type }) => {
  const renderLoginComponent = () => {
    if (type === 'reset-password') {
      return <ResetForm />;
    }
    return <LoginForm />;
  };
  return (
    <div className="bg-flair-900 relative h-screen w-screen">
      <div className="absolute z-20 flex h-screen w-screen flex-col justify-center overflow-y-auto">
        {/* Top Nav */}
        <div className="flex items-center gap-5 p-10 font-medium text-white/90">
          <div className="flex-1" />
          <div className="hover:text-white/80">
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
          <div className="hover:text-white/80">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        {/* Middle Content */}
        <div className="flex flex-1 justify-center px-14">
          {/* Left Explanatory */}
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="mb-6 flex max-w-[640px] flex-1 flex-col justify-center gap-6">
              <div>
                <h1 className="text-7xl font-bold text-white mb-2">
                  Intermediary
                </h1>
                <div className="text-3xl font-medium text-white/85">
                  Empower your decisions with AI-driven insights
                </div>
              </div>
              <div className="flex">
                <div className="mr-2 mt-1">
                  <FaCheckCircle className="text-flair-200 text-xl" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-white/85">
                    Filter, browse, and export analysis results
                  </div>
                  <div className="text-lg text-white/60">
                    Easily navigate through your data, apply filters, and export
                    detailed analysis results for in-depth review and reporting.
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2 mt-1">
                  <FaCheckCircle className="text-flair-200 text-xl" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-white/85">
                    Visualize trends and summaries
                  </div>
                  <div className="text-lg text-white/60">
                    Access comprehensive dashboards to see data summaries,
                    trends, and charts, helping you grasp insights at a glance.
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2 mt-1">
                  <FaCheckCircle className="text-flair-200 text-xl" />
                </div>
                <div>
                  <div className="text-xl font-semibold text-white/85">
                    Make informed decisions with AI insights
                  </div>
                  <div className="text-lg text-white/60">
                    Leverage AI-driven analysis to make strategic decisions,
                    enhance your operations, and stay ahead of the competition.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Explanatory */}
          <div className="mx-auto flex flex-1 flex-col items-center justify-center p-4">
            {renderLoginComponent()}
          </div>
        </div>
        {/* Top Nav */}
        <div className="flex items-center gap-5 p-10 font-medium text-white/70">
          <div className="flex-1" />
          <div>© 2024 Intermediary.cc. All Rights Reserved.</div>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default Login;
