export interface Memo {
  id: string;
  title: string | null;
  content: string | null;
  userId: string;
  parentId: string | null;
  isArchived: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoWithChildren extends Memo {
  children?: MemoWithChildren[];
}

export interface MemoActionResponse {
  success: boolean;
  memoId?: string;
  error?: string;
}