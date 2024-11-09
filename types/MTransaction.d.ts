declare module MTransaction {
  export interface ITransaction {
    id: number;
    category_id: number;
    amount: number;
    date: Date;
    description: string;
    type: OneOf<"Expense" | "Income">;
  }
}
