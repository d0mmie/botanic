export default async (obj) => {
  const promiseArray = await Promise.all(Object.values(obj))
  return Object.keys(obj).map((key, index) => ({ key, index })).reduce((total, { key, index }) => ({ ...total, [key]: promiseArray[index] }), {})
}
