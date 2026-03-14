/*
Задание 1: Реализуйте свой Promise.all

Требования:
- Принимает список промисов
- Резолвится массивом результатов в том же порядке
- Немедленно реджектится при первой ошибке
*/

function promiseAll<T>(promises: (Promise<T> | T)[]): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    let completedCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((elem) => {
          completedCount++;
          results[index] = elem;
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

promiseAll<number>([p1, p2]).then(console.log); // [1, 2]
