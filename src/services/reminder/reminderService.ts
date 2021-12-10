import { List } from '../../types';
import { Credentials } from '../access/credentials';

export interface ReminderService {
  getRemindersLists(credentials: Credentials): Promise<Array<List>>;

  getRemindersListsList(credentials: Credentials, listName: string): Promise<List>;
}
