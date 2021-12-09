import { expect } from 'chai';
import { AccessService } from '../../src/services/access';
import { Credentials } from '../../src/services/access/credentials';
import { ICloudAPIService } from '../../src/services/iCloudAPIService';
import { ReminderService } from '../../src/services/reminder';
import { List } from '../../src/types';

describe('iCloud API Service', () => {
  class AccessServiceMock implements AccessService {
    getToken(username: string, password: string): Promise<Credentials> {
      if (username === 'error') {
        return Promise.reject('An error occurred.');
      } else {
        return Promise.resolve({
          timestamp: 0,
          dsid: '42',
          token: 'token',
        });
      }
    };

    logout(username: string, password: string): void {};
  };

  class ReminderServiceMock implements ReminderService {
    getRemindersLists(token: Credentials): Promise<Array<List>> {
      return Promise.resolve([{
        'id': '00000000-0000-0000-0000-000000000001',
        'name': 'Reminders V1.0.0',
        'reminders': [{
          'title': 'Reminder #1',
          'description': 'Lorem ipsum dolor sit amet.',
          'priority': null,
          'locationName': null,
          'address': null,
          'latitude': null,
          'longitude': null,
          'radius': null,
          'proximity': null,
          'alarm': null,
          'completed': false
        }]
      }]);
    };
  };

  const iCloudApiService = new ICloudAPIService(new AccessServiceMock(), new ReminderServiceMock());

  describe('isAlive', () => {
    it('should test that method returns without error', (done) => {
      iCloudApiService.isAlive()
        .then(done)
        .catch(error => done(error));
    });
  });

  describe('isHealthy', () => {
    it('should test that method returns without error when retrieving token is successful', (done) => {
      iCloudApiService.isHealthy('', '')
        .then(done)
        .catch(error => done(error));
    });

    it('should test that method returns an error when retrieving token is not successful', (done) => {
      iCloudApiService.isHealthy('error', '')
        .then(() => done('An error was expected, but no error was raised.'))
        .catch((error) => {
          expect(error).to.equal('An error occurred.');
          done();
        });
    });
  });

  describe('getRemindersLists', () => {
    it('should test that a list of reminders is returned', (done) => {
      iCloudApiService.getRemindersLists('', '')
        .then((data) => {
          expect(data).to.be.an('array');
          expect(data.length).to.equal(1);

          const firstEntry = data[0];
          expect(firstEntry.id).to.equal('00000000-0000-0000-0000-000000000001');
          expect(firstEntry.name).to.equal('Reminders V1.0.0');
          expect(firstEntry.reminders.length).to.equal(1);

          const firstReminder = firstEntry.reminders[0];
          expect(firstReminder.title).to.equal('Reminder #1');
          expect(firstReminder.description).to.equal('Lorem ipsum dolor sit amet.');

          done();
        })
        .catch(error => done(error));
    });

    it('should test that an error is raised when retrieving token is not successful', (done) => {
      iCloudApiService.getRemindersLists('error', '')
        .then(() => done('An error was expected, but no error was raised.'))
        .catch((error) => {
          expect(error).to.equal('An error occurred.');
          done();
        });
    });
  });

  describe('getRemindersListsList', () => {
    it('should test that the method returns if not implemented', (done) => {
      iCloudApiService.getRemindersListsList()
        .then(done)
        .catch(error => done(error));
    });
  });

  describe('postRemindersListsList', () => {
    it('should test that the method returns if not implemented', (done) => {
      iCloudApiService.postRemindersListsList()
        .then(done)
        .catch(error => done(error));
    });
  });

  describe('putRemindersListsListId', () => {
    it('should test that the method returns if not implemented', (done) => {
      iCloudApiService.putRemindersListsListId()
        .then(done)
        .catch(error => done(error));
    });
  });

  describe('patchRemindersListsListId', () => {
    it('should test that the method returns if not implemented', (done) => {
      iCloudApiService.patchRemindersListsListId()
        .then(done)
        .catch(error => done(error));
    });
  });

  describe('deleteRemindersListsListId', () => {
    it('should test that the method returns if not implemented', (done) => {
      iCloudApiService.deleteRemindersListsListId()
        .then(done)
        .catch(error => done(error));
    });
  });
});
