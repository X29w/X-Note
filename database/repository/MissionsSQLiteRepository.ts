import { catchError } from "@/utils/common";
import { DefaultSQLiteRepo } from "./DefaultSQLiteRepository";

export class MissionsSQLiteRepository
  extends DefaultSQLiteRepo
  implements MController.IController<MMission.Base>
{
  constructor() {
    super();
  }

  async create(value: MMission.Base): Promise<MMission.IMission> {
    const result = await this.executeInsertQuery(
      "INSERT INTO Missions (name, category_id, date, description, status, category_id) VALUES (?,?,?,?,?,?)",
      [
        value.name,
        value.category_id,
        value.date,
        value.description,
        value.status,
        value.category_id,
      ]
    );

    return { ...value, id: result };
  }

  async findAll(): Promise<MMission.IMission[]> {
    const [error, data] = await catchError(
      this.executeSelectQuery<MMission.IMission>("SELECT * FROM Missions")
    );
    if (data) return data;
    else throw error;
  }

  async findById(id: number): Promise<MMission.IMission> {
    const [error, data] = await catchError(
      this.executeSelectQuery<MMission.IMission>(
        "SELECT * FROM Missions WHERE id =?",
        [id]
      )
    );
    if (data) return data[0];
    else throw error;
  }

  async update(value: MMission.IMission): Promise<MMission.IMission> {
    const [error, data] = await catchError(
      this.executeUpdateQuery(
        "UPDATE Missions SET name =?, age =?, specie = ? WHERE id = ?",
        [
          value.name,
          value.category_id,
          value.date,
          value.description,
          value.status,
          value.category_id,
        ]
      )
    );
    return value;
  }

  async delete(id: number): Promise<void> {
    await catchError(
      this.executeDeleteQuery("DELETE FROM Missions WHERE id = ?", [id])
    );
  }
}
