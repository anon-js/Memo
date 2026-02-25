"use client";

import { register } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (name === "userid") {
      if (value.length > 0 && value.length < 4) {
        errorMsg = "아이디는 4자 이상이어야 합니다.";
      }
    }
    
    if (name === "password") {
      if (value.length > 0 && value.length < 6) {
        errorMsg = "비밀번호는 6자 이상이어야 합니다.";
      }
    }

    if (name === "confirmPassword") {
      if (value && value !== formData.password) {
        errorMsg = "비밀번호가 일치하지 않습니다.";
      }
    }

    if (name === "password" && formData.confirmPassword) {
       if (value !== formData.confirmPassword) {
         setValidationErrors(prev => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
       } else {
         setValidationErrors(prev => ({ ...prev, confirmPassword: "" }));
       }
    }

    if (errorMsg) {
      setValidationErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    if (Object.values(validationErrors).some(err => err !== "")) {
      setError("입력 정보를 다시 확인해 주세요.");
      return;
    }

    startTransition(() => {
      register({ 
        userid: formData.userid, 
        password: formData.password, 
        username: formData.username 
      })
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }

          if (data.success) {
            setSuccess(data.success);
            setTimeout(() => {
              router.push("/login"); 
            }, 1000);
          }
        })
        .catch(() => {
            setError("알 수 없는 오류가 발생했습니다.");
        });
    });
  };

  return (
    <div className="flex flex-col min-h-screen max-w-96 md:min-w-96 justify-center justify-self-center items-center">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          회원가입을 통해<br />
          간단하게 메모를 관리해 보세요!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1">
            <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="userid"
              name="userid"
              type="text"
              value={formData.userid}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
              placeholder="아이디를 입력해 주세요."
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${validationErrors.userid ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {validationErrors.userid && <p className="text-xs text-red-500 px-1">{validationErrors.userid}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isPending}
                placeholder="비밀번호를 입력해 주세요."
                className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${validationErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.password && <p className="text-xs text-red-500 px-1">{validationErrors.password}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isPending}
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.confirmPassword && <p className="text-xs text-red-500 px-1">{validationErrors.confirmPassword}</p>}
          </div>

          <div className="pt-4 space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isPending}
              placeholder="닉네임을 입력해 주세요."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md animate-pulse">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md">
              {success} 잠시 후 로그인 페이지로 이동합니다...
            </div>
          )}

          <hr className="border-gray-200 my-6" />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "가입 처리 중..." : "회원가입"}
          </button>

          <span className="block text-center mt-4 text-sm text-gray-600">
            이미 계정이 있으신가요?
            <Link href="/login" className="ml-2 hover:underline text-blue-600">
              로그인
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}