export interface AuthResponse {
  statusCode: number;
  message: string;
  data: User;
  access_token: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
}
