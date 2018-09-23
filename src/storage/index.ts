interface Payload {
  data: any;
  timestamp?: number;
}

const timestamp = () => Math.floor(Date.now() / 1000);

export const writeToStorage = (key: string, data: any, ttlInSeconds = 0) => {
  const payload: Payload = { data };

  if (ttlInSeconds > 0) {
    payload.timestamp = timestamp() + ttlInSeconds;
  }

  localStorage.setItem(key, JSON.stringify(payload));
};

export const readFromStorage = (key: string): any | null => {
  const payload: Payload = JSON.parse(localStorage.getItem(key) || 'null');
  const isExpired = payload && payload.hasOwnProperty('timestamp') && payload.timestamp < timestamp();

  return payload === null || payload.data === null || isExpired ? null : payload.data;
};
