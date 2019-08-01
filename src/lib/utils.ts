export const mapObject = <T extends object, K extends keyof T, R>(
  obj: T,
  fn: (value: T[K], key: K) => R,
) => {
  return (Object.keys(obj) as K[]).map<R>(key => fn(obj[key], key))
}
