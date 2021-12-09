import { ErrorSource } from '.';

export interface Error {
  status: string;
  source: ErrorSource;
  title: string;
  detail: string;
}
