import { Address } from '.';

export interface Reminder {
  title: string;
  description: string | null;
  priority: string | null;
  locationName: string | null;
  address: Address | null;
  latitude: number | null;
  longitude: number | null;
  radius: number | null;
  proximity: string | null;
  alarm: string | null;
  completed: boolean;
}
