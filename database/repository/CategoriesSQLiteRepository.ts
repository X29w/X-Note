import { DefaultSQLiteRepo } from "./DefaultSQLiteRepository";

export class CategoriesSQLiteRepository
  extends DefaultSQLiteRepo
  implements MController.IController<MCategory.Base>
{
  constructor() {
    super();
  }

  async create(value: MCategory.Base): Promise<MCategory.ICategory> {
    const query = `INSERT INTO categories (name) VALUES (?)`;
    const params = [value.name];
    const id = await this.executeInsertQuery(query, params);
    return { id, name: value.name };
  }

  async findAll(): Promise<MCategory.ICategory[]> {
    const query = `SELECT * FROM categories`;
    return await this.executeSelectQuery<MMission.IMission>(query);
  }

  async findById(id: number): Promise<MCategory.ICategory> {
    const query = `SELECT * FROM categories WHERE id = ?`;
    const params = [id];
    const data = await this.executeSelectQuery<MCategory.ICategory>(
      query,
      params
    );
    return data[0];
  }

  async update(value: MCategory.ICategory): Promise<MCategory.ICategory> {
    const query = `UPDATE categories SET name = ? WHERE id = ?`;
    const params = [value.name, value.id];
    await this.executeUpdateQuery(query, params);
    return value;
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM categories WHERE id = ?`;
    const params = [id];
    await this.executeDeleteQuery(query, params);
  }
}
