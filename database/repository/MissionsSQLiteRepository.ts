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
      "INSERT INTO Missions (name, category_id, date, description, status, expiredTime) VALUES (?,?,?,?,?,?)",
      [
        value.name,
        value.category_id,
        value.date,
        value.description,
        value.status,
        value.expiredTime
      ]
    );

    return { ...value, id: result };
  }

  async findAll(): Promise<MMission.IMission[]> {
    return this.executeSelectQuery<MMission.IMission>(
      "SELECT Missions.*, Categories.name AS category_name FROM Missions JOIN Categories ON Missions.category_id = Categories.id ORDER BY CASE WHEN Missions.status = 'Processing' THEN 0 WHEN Missions.status = 'Done' THEN 1 END"
    );
  }

  async findById(id: number): Promise<MMission.IMission> {
    const data = await this.executeSelectQuery<MMission.IMission>(
      "SELECT * FROM Missions WHERE id =?",
      [id]
    );
    return data[0];
  }

  async update(value: MMission.IMission): Promise<MMission.IMission> {
    await this.executeUpdateQuery(
      "UPDATE Missions SET status = 'Done' WHERE id = ?",
      [value.id]
    );
    return value;
  }

  async delete(id: number): Promise<void> {
    await this.executeDeleteQuery("DELETE FROM Missions WHERE id = ?", [id]);
  }
}
