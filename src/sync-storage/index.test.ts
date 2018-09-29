import { readFromSyncStorage, writeToSyncStorage } from '.';

describe('sync storage', () => {
  test('it should work', done => {
    // 1st, fetch 'fruits' item
    readFromSyncStorage('fruits').then(items => {
      expect(items).toEqual({
        fruits: undefined,
      });

      // 2nd, store 'fruits' and 'vegetables'
      writeToSyncStorage({ fruits: ['apple', 'banana'], vegetables: ['carrot'] }).then(() => {
        // 3rd, then we refetch 'fruits'
        readFromSyncStorage('fruits').then(items => {
          expect(items).toEqual({
            fruits: ['apple', 'banana'],
          });

          // 4th, read everything from storage
          readFromSyncStorage().then(items => {
            expect(items).toEqual({
              fruits: ['apple', 'banana'],
              vegetables: ['carrot'],
            });

            done();
          });
        });
      });
    });
  });

  test('errors', done => {
    writeToSyncStorage(1 as any).then(items => {
      expect(items).toBeUndefined();

      readFromSyncStorage(1 as any).catch(err => {
        expect(err).toEqual(new Error('Wrong key given'));
        done();
      });
    });
  });
});
