import { AccessService } from './access';
import { Service } from './service';
import { ReminderService } from './reminder';
import { List } from '../types';

export class ICloudAPIService implements Service {
  private readonly accessService: AccessService;
  private readonly reminderService: ReminderService;

  constructor(accessService: AccessService, reminderService: ReminderService) {
    this.accessService = accessService;
    this.reminderService = reminderService;
  }

  isAlive(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  isHealthy(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.accessService.getToken(username, password)
        .then(() => {
          this.accessService.logout(username, password);
          resolve();
        })
        .catch(reject);
    });
  }

  getRemindersLists(username: string, password: string): Promise<Array<List>> {
    return new Promise((resolve, reject) =>
      this.accessService
      .getToken(username, password)
        .then(token => resolve(this.reminderService.getRemindersLists(token)))
        .catch(error => reject(error)));
  }

  getRemindersListsList(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  postRemindersListsList(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  putRemindersListsListId(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  patchRemindersListsListId(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }

  deleteRemindersListsListId(): Promise<void> {
    return new Promise((resolve, reject) => resolve());
  }
}
