declare module MMission {
  export interface IMission {
    id: number;
    name: string;
    category_id: number;
    date: number;
    description: string;
    status: OneOf<["Processing", "Done"]>;
    emoji: string;
  }
}
