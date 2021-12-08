import { config } from 'dotenv';
import { expect } from 'chai';
import { CredentialService } from '../../../src/services/access/credentialService';
import { ICloudAccessService } from '../../../src/services/access';

/*
 * Create .env file with username and password and remove skip for testing.
 *
 * example .env entry:
 *
 * username=user@example.com
 * password=p422w0Rd
 */
describe.skip('ICloud Access Service', () => {
  const testTimeout = 10000;

  let username: string;
  let password: string;
  let loginEndpoint: string;
  let logoutEndpoint: string;

  before('Set up endpoints and credentials', (done) => {
    config();
    loginEndpoint = process.env.loginEndpoint ? process.env.loginEndpoint : '';
    logoutEndpoint = process.env.logoutEndpoint ? process.env.logoutEndpoint : '';
    username = process.env.username ? process.env.username: '';
    password = process.env.password ? process.env.password: '';
    done();
  });

  describe('login', function() {
    this.timeout(testTimeout);

    it('should test that login with valid credentials is possible', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.getToken(username, password)
      .then((token) => {
        expect(token.token).to.include('X-APPLE-UNIQUE-CLIENT-ID');
        expect(token.token).to.include('X-APPLE-WEBAUTH-LOGIN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-VALIDATE');
        expect(token.token).to.include('X-APPLE-WEBAUTH-TOKEN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-USER');
        expect(token.token).to.include('X-APPLE-DS-WEB-SESSION-TOKEN');
        done();
      })
      .catch(error => done(error));
    });

    it('should test that login with existing credentials returns cached credentials', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.getToken(username, password)
      .then(() => accessService.getToken(username, password))
      .then((token) => {
        expect(token.token).to.include('X-APPLE-UNIQUE-CLIENT-ID');
        expect(token.token).to.include('X-APPLE-WEBAUTH-LOGIN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-VALIDATE');
        expect(token.token).to.include('X-APPLE-WEBAUTH-TOKEN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-USER');
        expect(token.token).to.include('X-APPLE-DS-WEB-SESSION-TOKEN');
        done();
      })
      .catch(error => done(error));
    });

    it('should test that login with valid credentials and default endpoints is possible', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), '', '');
      accessService.getToken(username, password)
      .then((token) => {
        expect(token.token).to.include('X-APPLE-UNIQUE-CLIENT-ID');
        expect(token.token).to.include('X-APPLE-WEBAUTH-LOGIN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-VALIDATE');
        expect(token.token).to.include('X-APPLE-WEBAUTH-TOKEN');
        expect(token.token).to.include('X-APPLE-WEBAUTH-USER');
        expect(token.token).to.include('X-APPLE-DS-WEB-SESSION-TOKEN');
        done();
      })
      .catch(error => done(error));
    });

    it('should test that login with valid credentials and invalid login endpoint raises an error', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), 'n/a', logoutEndpoint);
      accessService.getToken(username, password)
      .then(() => done('An error was expected, but no error was raised.'))
      .catch(error => {
        expect(error).to.equal('Request failed with status code 400');
        done();
      });
    });

    it('should test that login with invalid credentials is not possible', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.getToken('invalidUsername', 'invalidPassword')
      .then(() => done('An error was expected, but no error was raised.'))
      .catch(error => {
        expect(error).to.equal('Request failed with status code 421');
        done();
      });
    });
  });

  describe('logout', function() {
    this.timeout(testTimeout);

    it('should test that logout is possible', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.getToken(username, password)
      .then(() => accessService.logout(username, password))
      .then((logoutSuccess) => {
        expect(logoutSuccess).to.be.true;
        done();
      })
      .catch(error => done(error));
    });

    it('should test that logout with invalid logout endpoint raises an error', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, 'n/a');
      accessService.getToken(username, password)
      .then(() => accessService.logout(username, password))
      .then(() => done('An error was expected, but no error was raised.'))
      .catch(error => {
        expect(error).to.equal('Request failed with status code 400');
        done();
      });
    });

    it('should test that logout with missing credentials raises an error', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.logout(username, password)
      .then(() => done('An error was expected, but no error was raised.'))
      .catch(error => {
        expect(error).to.equal('Missing credentials. Unable to logout.');
        done();
      });
    });

    it('should test that logging out twice raises an error', (done) => {
      const accessService = new ICloudAccessService(new CredentialService(), loginEndpoint, logoutEndpoint);
      accessService.getToken(username, password)
      .then(() => accessService.logout(username, password))
      .then(() => accessService.logout(username, password))
      .then(() => done('An error was expected, but no error was raised.'))
      .catch(error => {
        expect(error).to.equal('Missing credentials. Unable to logout.');
        done();
      });
    });
  });
});
