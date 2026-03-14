/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/
type MemoFn<This, Args extends unknown[], R> = (this: This, ...args: Args) => R;

function memoize<This, Args extends unknown[], R>(
  fn: MemoFn<This, Args, R>,
): MemoFn<This, Args, R> {
  const cache = new Map<string, R>();

  return function (this: This, ...args: Args): R {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn.apply(this, args);

    cache.set(key, result);
    return result;
  };
}

const slowAdd = (a: number, b: number) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);

const res1 = memoAdd(1, 2); // возвращает 3
const res2 = memoAdd(1, 2); // из кэша, возвращает 3
console.log(res1);
console.log(res2);
