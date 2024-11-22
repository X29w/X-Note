declare module MController {
  export interface IController<T> {
    create: (value: T) => Promise<T>;
    findAll: () => Promise<WithId<T>[]>;
    findById: (tId: number) => Promise<WithId<T>>;
    update: (value: WithId<T>) => Promise<WithId<T>>;
    delete: (tId: number) => Promise<void>;
  }
}
