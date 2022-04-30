export const incrementor = function* (
  begin = 0
): Generator<number, never, never> {
  let id = begin;

  while (true) {
    yield id++ % Number.MAX_SAFE_INTEGER;
  }
};
