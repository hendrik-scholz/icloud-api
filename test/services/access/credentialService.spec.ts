import { expect } from 'chai';
import { CredentialService } from '../../../src/services/access/credentialService';

describe('Credential Service', () => {
  describe('getCredentialsForLoginData', function() {
    let credentialService: CredentialService;

    const johnDoeTestCredentials = {
      timestamp: 0,
      token: 'johnDoeToken',
      dsid: 'johnDoeDsId'
    };

    const janeDoeTestCredentials = {
      timestamp: 0,
      token: 'janeDoeToken',
      dsid: 'janeDoeDsId'
    };

    beforeEach('create new CredentialService', () => {
      credentialService = new CredentialService();
    });

    it('should test that one entry can be saved and retrieved', () => {
      credentialService.saveCredentials('johnDoe', 'password', johnDoeTestCredentials);

      const johnDoeCredentials = credentialService.getCredentialsForLoginData('johnDoe', 'password');
      expect(johnDoeCredentials).to.deep.equal(johnDoeTestCredentials);
    });

    it('should test that two entries can be saved and retrieved', () => {
      credentialService.saveCredentials('johnDoe', 'password', johnDoeTestCredentials);
      credentialService.saveCredentials('janeDoe', 'password', janeDoeTestCredentials);

      const johnDoeCredentials = credentialService.getCredentialsForLoginData('johnDoe', 'password');
      const janeDoeCredentials = credentialService.getCredentialsForLoginData('janeDoe', 'password');

      expect(johnDoeCredentials).to.deep.equal(johnDoeTestCredentials);
      expect(janeDoeCredentials).to.deep.equal(janeDoeTestCredentials);
    });

    it('should test that trying to retrieve credentials for unknown login data returns undefined', () => {
      const johnDoeCredentials = credentialService.getCredentialsForLoginData('johnDoe', 'password');
      expect(johnDoeCredentials).to.be.undefined;
    });
  });
});
