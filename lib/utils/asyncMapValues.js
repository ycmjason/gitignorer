module.exports = async (o, asyncFn) => {
  const mappedObject = {};
  const keys = Object.keys(o);
  const values = await Promise.all(keys.map(k => o[k]).map(asyncFn));
  keys.forEach((k, i) => mappedObject[k] = values[i]);
  return mappedObject;
};
