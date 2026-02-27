"use client";

import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm"; 
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginForm() {
  const {
    formData,
    validationErrors,
    isPending,
    error,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex flex-col min-h-screen max-w-96 md:min-w-96 justify-center justify-self-center items-center">
      <div className="w-full max-w-sm">
        <h2 className="w-full text-2xl font-bold mb-6 text-gray-800">
          간단하고 편리한 메모를<br />
          사용하기 전에 로그인해 주세요
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <Input
            id="userid"
            label="아이디"
            value={formData.userid}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            error={validationErrors.userid}
            placeholder="아이디를 입력해 주세요."
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isPending}
            error={validationErrors.password}
            placeholder="비밀번호를 입력해 주세요."
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md animate-pulse">
              {error}
            </div>
          )}

          <hr className="border-gray-200 my-6" />

          <Button
            type="submit"
            label="로그인"
            isPending={isPending}
            loadingLabel="로그인 중..."
          />

          <p className="text-center mt-4 text-sm text-gray-600">
            메모가 처음이신가요?
            <Link href="/signup" className="ml-2 hover:underline text-blue-600 font-medium">
              회원가입
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}