"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface EditorBodyProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export function EditorBody({ initialContent, onSave }: EditorBodyProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setContent(initialContent || "");
    }
  }, [initialContent, isEditing]);

  const debouncedSave = useCallback(
    debounce((value: string) => {
      onSave(value);
    }, 2000),
    [onSave]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    debouncedSave(value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    debouncedSave.cancel();
    
    if (content !== initialContent) {
      onSave(content);
    }
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="내용을 입력하세요..."
      className="flex-1 mx-6 my-2 resize-none border-none outline-none text-lg leading-relaxed bg-transparent"
    />
  );
}