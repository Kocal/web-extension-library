export const readFromSyncStorage = (key: any = null): Promise<{ [k: string]: any }> => {
  return new Promise((resolve, reject) => {
    return browser.storage.sync
      .get(key)
      .then(items => resolve(items))
      .catch(err => reject(err));
  });
};

export const writeToSyncStorage = (items: { [k: string]: any }): Promise<void> => {
  return new Promise((resolve, reject) => {
    return browser.storage.sync
      .set(items)
      .then(() => resolve())
      .catch(err => reject(err));
  });
};
