import { List } from '../../types';
import { Credentials } from '../access/credentials';

export interface ReminderService {
  getRemindersLists(token: Credentials): Promise<Array<List>>;
}
