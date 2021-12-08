import axios from 'axios';
import { Credentials } from './credentials';
import { AccessService } from './accessService';
import { CredentialService } from './credentialService';
import { Constants } from '../../constants';

export class ICloudAccessService implements AccessService {
  private readonly credentialService: CredentialService;
  private readonly loginEndpoint: string;
  private readonly logoutEndpoint: string;

  constructor(credentialService: CredentialService, loginEndpoint: string, logoutEndpoint: string) {
    this.loginEndpoint = loginEndpoint.trim().length > 0 ? loginEndpoint :
      Constants.LOGIN_ENDPOINT;
    this.logoutEndpoint = logoutEndpoint.trim().length > 0 ? logoutEndpoint :
      Constants.LOGOUT_ENDPOINT;
    this.credentialService = credentialService;
  }

  getToken(username: string, password: string): Promise<Credentials> {
    const credentials = this.credentialService.getCredentialsForLoginData(username, password);

    if (credentials) {
      return Promise.resolve(credentials);
    }

    const payload = {
      apple_id: username,
      password,
      extended_login: false,
    };

    const config = {
      headers: {
        Origin: Constants.HTTP_HEADER_ORIGIN,
      },
    };

    return new Promise((resolve, reject) => {
      axios.post(this.loginEndpoint, payload, config)
      .then((response) => {
        const cookie = response.headers[Constants.HTTP_HEADER_SET_COOKIE]
          .filter((header: string) => header.indexOf(Constants.HTTP_HEADER_X_APPLE) > -1).join(';');
        const token: Credentials =
          {
            timestamp: Date.now(),
            token: cookie, dsid: response.data.dsInfo.dsid,
          };
        this.credentialService.saveCredentials(username, password, token);
        resolve(token);
      })
      .catch(error => reject(`${error.message}`));
    });
  }

  logout(username: string, password: string): Promise<boolean> {
    const credentials = this.credentialService.getCredentialsForLoginData(username, password);

    if (credentials) {
      const config = {
        headers: {
          Origin: Constants.HTTP_HEADER_ORIGIN,
          Referer: Constants.HTTP_HEADER_REFERER,
          Cookie: credentials.token,
        },
        params: { dsid: credentials.dsid },
      };

      this.credentialService.removeCredentialsFromLoginData(username, password);

      return new Promise((resolve, reject) => {
        axios.post(this.logoutEndpoint, {}, config)
        .then((response) => {
          if (response && response.data && response.data.success === true) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(error => reject(`${error.message}`));
      });
    }

    return Promise.reject('Missing credentials. Unable to logout.');
  }
}
