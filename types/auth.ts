export interface User {
  id: string;
  userid: string;
  username: string;
  email?: string | null;
  image?: string | null;
  createdAt: Date;
}

export interface AuthActionResponse {
  success?: string;
  error?: string;
  user?: User;
}