import { readFromSyncStorage, writeToSyncStorage } from '.';

describe('sync storage', () => {
  test('it should work', async done => {
    // 1st, fetch 'fruits' item
    let items = await readFromSyncStorage('fruits');
    expect(items).toEqual({
      fruits: undefined,
    });

    // 2nd, store 'fruits' and 'vegetables'
    await writeToSyncStorage({ fruits: ['apple', 'banana'], vegetables: ['carrot'] });

    // 3rd, then we refetch 'fruits'
    items = await readFromSyncStorage('fruits');
    expect(items).toEqual({
      fruits: ['apple', 'banana'],
    });

    // 4th, read everything from storage
    items = await readFromSyncStorage();
    expect(items).toEqual({
      fruits: ['apple', 'banana'],
      vegetables: ['carrot'],
    });

    done();
  });

  test('errors', async done => {
    const items = await writeToSyncStorage(1 as any);
    expect(items).toBeUndefined();

    try {
      await readFromSyncStorage(1 as any);
    } catch (err) {
      expect(err).toEqual(new Error('Wrong key given'));
    }

    done();
  });
});
