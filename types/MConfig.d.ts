type OneOf<T extends any[]> = T[number];

type WithId<T> = {
  id: number;
} & T;
