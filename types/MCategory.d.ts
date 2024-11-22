declare module MCategory {
  export interface Base {
    name: string;
  }

  export type ICategory = WithId<Base>;
}
