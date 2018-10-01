export const readFromSyncStorage = (key: any = null): Promise<{ [k: string]: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await browser.storage.sync.get(key);
      resolve(items);
    } catch (err) {
      reject(err);
    }
  });
};

export const writeToSyncStorage = (items: { [k: string]: any }): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await browser.storage.sync.set(items);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
