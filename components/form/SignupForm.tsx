"use client";

import Link from "next/link";
import { useSignupForm } from "@/hooks/useSignupForm";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupForm() {
  const { 
    formData, validationErrors, isPending, error, success, 
    handleChange, handleBlur, handleSubmit 
  } = useSignupForm();

  return (
    <div className="flex flex-col min-h-screen max-w-96 md:min-w-96 justify-center justify-self-center items-center">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          회원가입을 통해<br />간단하게 메모를 관리해 보세요!
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            id="userid" label="아이디" value={formData.userid} error={validationErrors.userid}
            onChange={handleChange} onBlur={handleBlur} disabled={isPending} placeholder="아이디를 입력해 주세요." 
          />

          <Input 
            id="password" label="비밀번호" type="password" value={formData.password} error={validationErrors.password}
            onChange={handleChange} onBlur={handleBlur} disabled={isPending} placeholder="비밀번호를 입력해 주세요." 
          />

          <Input 
            id="confirmPassword" label="비밀번호 확인" type="password" value={formData.confirmPassword} error={validationErrors.confirmPassword}
            onChange={handleChange} onBlur={handleBlur} disabled={isPending} placeholder="비밀번호를 한 번 더 입력해 주세요." 
          />

          <div className="pt-4">
            <Input 
              id="username" label="닉네임" value={formData.username} error={validationErrors.username}
              onChange={handleChange} onBlur={handleBlur} disabled={isPending} placeholder="닉네임을 입력해 주세요." 
            />
          </div>

          {(error || success) && (
            <div className={`p-3 border text-sm rounded-md ${error ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-green-50 border-green-200 text-green-600"}`}>
              {error || `${success} 잠시 후 로그인 페이지로 이동합니다...`}
            </div>
          )}

          <hr className="border-gray-200 my-6" />

          <Button 
            type="submit"
            label="회원가입" 
            isPending={isPending} 
            loadingLabel="가입 처리 중..." 
          />

          <p className="text-center mt-4 text-sm text-gray-600">
            이미 계정이 있으신가요?
            <Link href="/login" className="ml-2 hover:underline text-blue-600 font-medium">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  );
}