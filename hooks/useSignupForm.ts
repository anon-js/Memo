"use client";

import { useState, useTransition } from "react";
import { register } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export function useSignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "userid" && value.length > 0 && value.length < 4) {
      errorMsg = "아이디는 4자 이상이어야 합니다.";
    }
    if (name === "password" && value.length > 0 && value.length < 6) {
      errorMsg = "비밀번호는 6자 이상이어야 합니다.";
    }
    if (name === "confirmPassword" && value && value !== formData.password) {
      errorMsg = "비밀번호가 일치하지 않습니다.";
    }
    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: errorMsg }));

    if (name === "password" && formData.confirmPassword) {
      const confirmErr = value !== formData.confirmPassword ? "비밀번호가 일치하지 않습니다." : "";
      setValidationErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
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

    startTransition(() => {
      register({
        userid: formData.userid,
        password: formData.password,
        username: formData.username,
      }).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) {
          setSuccess(data.success);
          setTimeout(() => router.push("/login"), 1000);
        }
      }).catch(() => setError("알 수 없는 오류가 발생했습니다."));
    });
  };

  return {
    formData,
    validationErrors,
    isPending,
    error,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}