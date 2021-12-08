import { createHash } from 'crypto';
import { Credentials } from './credentials';

export class CredentialService {
  private readonly credentials: Map<string, Credentials>;

  constructor() {
    this.credentials = new Map<string, Credentials>();
  }

  saveCredentials(username: string, password: string, token: Credentials): void {
    this.credentials.set(this.getHashForUserLoginData(username, password), token);
  }

  getCredentialsForLoginData(username: string, password: string): Credentials | undefined {
    return this.credentials.get(this.getHashForUserLoginData(username, password));
  }

  removeCredentialsFromLoginData(username: string, password: string): void {
    this.credentials.delete(this.getHashForUserLoginData(username, password));
  }

  private getHashForUserLoginData(username: string, password: string) {
    return createHash('sha512')
      .update(username + password)
      .digest('hex');
  }
}
