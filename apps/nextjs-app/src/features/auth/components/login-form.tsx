'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const login = useLogin({
    onSuccess,
  });

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Modern Glass Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Đăng nhập
              </h1>
              <p className="text-gray-600 mt-2">Chào mừng bạn quay trở lại!</p>
            </div>
          </div>

          {/* Form */}
          <Form
            onSubmit={(values) => {
              login.mutate(values);
            }}
            schema={loginInputSchema}
          >
            {({ register, formState }) => (
              <div className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Tên đăng nhập
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      error={formState.errors['username']}
                      registration={register('username')}
                      className="pl-12 h-14 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-300 hover:bg-white/70"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mật khẩu
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      error={formState.errors['password']}
                      registration={register('password')}
                      className="pl-12 pr-12 h-14 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-300 hover:bg-white/70"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center group/eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  isLoading={login.isPending}
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {login.isPending ? (
                    <div className="flex items-center space-x-2">
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </div>
            )}
          </Form>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <NextLink
                href={paths.auth.register.getHref(redirectTo)}
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Đăng ký ngay
              </NextLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
