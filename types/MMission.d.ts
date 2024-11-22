declare module MMission {
  export interface Base {
    name: string;
    category_id: number;
    date: number;
    expiredTime: number;
    description: string;
    status: OneOf<["Processing", "Done"]>;
  }

  export type IMission = WithId<Base>;

}
