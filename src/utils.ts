import { AxiosError } from 'axios';

export function isAxiosError(error: Error | AxiosError): error is AxiosError {
  return 'response' in error;
}
