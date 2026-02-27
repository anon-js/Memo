"use client";

import { useState, useTransition } from "react";
import { login } from "@/app/actions/auth";

interface LoginFormData {
  userid: "";
  password: "";
}

export function useLoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    userid: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    let errorMsg = "";
    if (name === "userid" && value.trim() === "") errorMsg = "아이디를 입력해 주세요.";
    if (name === "password" && value.trim() === "") errorMsg = "비밀번호를 입력해 주세요.";
    
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
    
    if (errorMsg) {
      setValidationErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const useridError = validateField("userid", formData.userid);
    const passwordError = validateField("password", formData.password);

    if (useridError || passwordError) {
      setValidationErrors({
        userid: useridError,
        password: passwordError,
      });
      return;
    }

    startTransition(() => {
      login(formData).then((data) => {
        if (data?.error) setError(data.error);
      });
    });
  };

  return {
    formData,
    validationErrors,
    isPending,
    error,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}