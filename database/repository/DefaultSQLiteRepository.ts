import { DATABASE_FILE_PATH, DATABASE_NAME, DATABASE_URI } from "@/constant/config";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export class DefaultSQLiteRepo {
  constructor() {}

  private async openDatabase(dbPath: any): Promise<SQLite.SQLiteDatabase> {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        {
          intermediates: true,
        }
      );
      await FileSystem.downloadAsync(DATABASE_URI, dbPath);
    }

    return SQLite.openDatabaseSync(DATABASE_NAME);
  }

  private async getDbInstance(): Promise<SQLite.SQLiteDatabase> {
    return await this.openDatabase(DATABASE_FILE_PATH);
  }

  async executeSelectQuery<T>(
    query: string,
    params: number[] = []
  ): Promise<T[]> {
    const db = await this.getDbInstance();
    return await db.getAllAsync<T>(query, ...params);
  }

  async executeInsertQuery(
    query: string,
    params: Array<string | number> = []
  ): Promise<number> {
    const db = await this.getDbInstance();
    const result = await db.runAsync(query, ...params);
    return result.lastInsertRowId;
  }

  async executeUpdateQuery(
    query: string,
    params: Array<string | number> = []
  ): Promise<void> {
    const db = await this.getDbInstance();
    await db.runAsync(query, ...params);
  }

  async executeDeleteQuery(
    query: string,
    params: number[] = []
  ): Promise<void> {
    const db = await this.getDbInstance();
    await db.runAsync(query, ...params);
  }
}
