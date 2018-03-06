const resolvePromisesInValues = require('../../lib/utils/resolvePromisesInValues');

describe('resolvePromisesInValues', () => {
  test('should use values they are not promises', async () => {
    const obj = {
      k1: 1,
      k2: Promise.resolve(2),
      k3: 3,
    };

    const mapped = await resolvePromisesInValues(obj);

    expect(mapped).toEqual({
      k1: 1,
      k2: 2,
      k3: 3,
    });
  });
});
