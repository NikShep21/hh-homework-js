/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/
type SchemaType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "undefined"
  | "function"
  | "bigint"
  | "symbol";

type Schema = Record<string, SchemaType>;

interface TypeMap {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  undefined: undefined;
  function: Function;
  bigint: bigint;
  symbol: symbol;
}

type TypedObjectFromSchema<T extends Schema> = {
  [K in keyof T]: TypeMap[T[K]];
};
function typedObject<T extends Schema>(schema: T): TypedObjectFromSchema<T> {
  return new Proxy({} as TypedObjectFromSchema<T>, {
    set(target, prop, value, receiver) {
      if (typeof prop !== "string") {
        throw new Error("Property key must be a string");
      }
      if (!(prop in schema)) {
        throw new Error(`${prop} is not in schema`);
      }
      const expectedType = schema[prop];
      if (expectedType === "object") {
        if (typeof value !== "object" || value === null) {
          throw new Error(`Expected object for "${prop}"`);
        }
      } else if (typeof value !== expectedType) {
        throw new Error(`Expected ${expectedType} for "${prop}"`);
      }

      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const user = typedObject({
  name: "string",
  age: "number",
});
user.name = "Ivan"; // выполнится
user.age = 20; // выполнится
