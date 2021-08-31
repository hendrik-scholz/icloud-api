import { Reminder } from '.';

export interface List {
  id: string;
  name: string;
  reminders: Array<Reminder>;
}
