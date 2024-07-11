'use client';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Checkbox, CheckboxField } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/fieldset';
import Link from 'next/link';

function PageLogin() {
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
                <h1 className="text-7xl font-bold text-white">Proxz</h1>
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
            <div className="rounded-lg bg-white shadow">
              <div className="space-y-4 px-16 py-8 xl:px-32 xl:py-16">
                <div className="flex flex-col text-left">
                  <div className="mb-1 text-4xl font-bold">Sign in</div>
                  <div className="text-large text-gray-500">
                    Enter your email and password to sign in!
                  </div>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-800 transition duration-150 hover:bg-gray-50 active:bg-gray-100">
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Sign in with Google</span>
                </button>

                <div className="flex items-center space-x-2">
                  <hr className="h-px flex-1 border-0 bg-gray-300" />
                  <div className="text-gray-400">or</div>
                  <hr className="h-px flex-1 border-0 bg-gray-300" />
                </div>

                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <CheckboxField>
                          <Checkbox className="text-flair-600" />
                          <Label>Remember me</Label>
                        </CheckboxField>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-flair-600 text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button className="w-full text-flair-600">
                    Login with Email
                  </Button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{' '}
                    <span className="text-flair-600 font-medium hover:underline">
                      <Link href={'#'}>Sign Up</Link>
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Top Nav */}
        <div className="flex items-center gap-5 p-10 font-medium text-white/70">
          <div className="flex-1" />
          <div>© 2024 Flair Labs. All Rights Reserved.</div>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
