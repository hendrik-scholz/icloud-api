import { List } from '../types';

export interface Service {
  isAlive(): Promise<void>;

  isHealthy(username: string, password: string): Promise<void>;

  getRemindersLists(username: string, password: string): Promise<Array<List>>;

  getRemindersListsList(username: string, password: string, listName: string): Promise<List>;

  postRemindersListsList(): Promise<void>;

  putRemindersListsListId(): Promise<void>;

  patchRemindersListsListId(): Promise<void>;

  deleteRemindersListsListId(): Promise<void>;
}
