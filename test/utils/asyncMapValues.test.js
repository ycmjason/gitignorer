const asyncMapValues = require('../../lib/utils/asyncMapValues');

describe('asyncMapValues', () => {
  test('should unpack values from promises', async () => {
    const obj = {
      k1: 1,
      k2: 2,
      k3: 3,
    };

    const mapped = await asyncMapValues(obj, (v) => Promise.resolve(v + 1));

    expect(mapped).toEqual({
      k1: 2,
      k2: 3,
      k3: 4,
    });
  });

  test('should unpack values from actual values', async () => {
    const obj = {
      k1: 1,
      k2: 2,
      k3: 3,
    };

    const mapped = await asyncMapValues(obj, (v) => v + 1);

    expect(mapped).toEqual({
      k1: 2,
      k2: 3,
      k3: 4,
    });
  });

  test('should unpack values from mixed values', async () => {
    const obj = {
      k1: 1,
      k2: Promise.resolve(2),
      k3: 3,
    };

    const mapped = await asyncMapValues(obj, (v) => v);

    expect(mapped).toEqual({
      k1: 1,
      k2: 2,
      k3: 3,
    });
  });
});
