import { Credentials } from './credentials';

export interface AccessService {
  getToken(username: string, password: string): Promise<Credentials>;

  logout(username: string, password: string): void;
}
