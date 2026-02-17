export class Auth {
  id: string;
  username: string;
  email: string;
  name?: string;
}

export class AuthResponse {
  accessToken: string;
  user: Auth;
}
