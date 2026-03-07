import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * Tailwind 클래스 결합 및 충돌 방지 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 실무형 날짜 포맷터
 * 1분 미만: 방금 전
 * 3일 미만: 상대 시간 (3시간 전 등)
 * 3일 이상: 절대 시간 (2026년 3월 7일 토요일 오후 10:28)
 */
export function formatDate(date: Date | string | number) {
  const d = new Date(date);
  
  // 유효하지 않은 날짜 처리
  if (isNaN(d.getTime())) return "";

  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  if (diff < 60) {
    return "방금 전";
  }

  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }

  // 'PPP EEE p' -> 2026년 3월 7일 토요일 오후 10:28
  return format(d, 'PPP EEE p', { locale: ko });
}