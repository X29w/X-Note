declare module MCategory {
  export interface ICategory {
    id: number;
    name: string;
    type: OneOf<"Expense" | "Income">;
  }
}
