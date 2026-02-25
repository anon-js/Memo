"use client";

import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userid: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    userid: "",
    password: ""
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

    if (name === "userid" && value.trim() === "") {
      errorMsg = "아이디를 입력해 주세요.";
    }

    if (name === "password" && value.trim() === "") {
      errorMsg = "비밀번호를 입력해 주세요.";
    }

    if (errorMsg) {
      setValidationErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let hasError = false;
    const newErrors = { userid: "", password: "" };

    if (!formData.userid) {
      newErrors.userid = "아이디를 입력해 주세요.";
      hasError = true;
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
      hasError = true;
    }

    if (hasError) {
      setValidationErrors(newErrors);
      return;
    }

    startTransition(() => {
      login({ userid: formData.userid, password: formData.password }).then((data) => {
        if (data?.error) setError(data.error);
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen max-w-96 md:min-w-96 justify-center justify-self-center items-center">
      <div className="w-full max-w-sm">
        <h2 className="w-full text-2xl font-bold mb-6 text-gray-800">
          간단하고 편리한 메모를<br />
          사용하기 전에 로그인해 주세요
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          
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
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">
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

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md animate-pulse">
              {error}
            </div>
          )}

          <hr className="border-gray-200 my-6" />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "로그인 중..." : "로그인"}
          </button>

          <span className="block text-center mt-4 text-sm text-gray-600">
            메모가 처음이신가요?
            <Link href="/signup" className="ml-2 hover:underline text-blue-600">
              회원가입
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}