import { catchError } from "@/utils/common";
import { useSQLiteContext } from "expo-sqlite";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AddMissionCard from "./components/mission-add";
import MissionsList from "./components/mission-list";

const HomeScreen: FC<never> = () => {
  const [categories, setCategories] = useState<MCategory.ICategory[]>([]);
  const [missions, setMissions] = useState<MMission.IMission[]>([]);
  const db = useSQLiteContext();

  //#region 删除任务
  const deleteMission = async (id: number) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Missions WHERE id = ?;`, [id]);
      await getData();
    });
  };
  //#endregion

  //#region 增加任务
  const insertMission = async (mission: Omit<MMission.IMission, "id">) => {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `
      INSERT INTO Missions (category_id, name, date, description, status, emoji) VALUES (?, ?, ?, ?, ?, ?);
    `,
          [
            mission.category_id,
            mission.name,
            mission.date,
            mission.description,
            mission.status,
            mission.emoji,
          ]
        );
        await getData();
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  //#endregion

  //#region 获取列表
  const getData = async () => {
    const [error, data] = await catchError(
      db.getAllAsync<MMission.IMission>(
        `SELECT * FROM Missions ORDER BY date DESC LIMIT 30;`
      )
    );
    error ? console.log(error) : setMissions(data);

    const [error2, data2] = await catchError(
      db.getAllAsync<MCategory.ICategory>(`SELECT * FROM Categories;`)
    );
    error2 ? console.log(error2) : setCategories(data2);
  };
  //#endregion

  //#region 开启异步事务
  const withTransAction = async () => {
    await db.withTransactionAsync(async () => await getData());
  };
  //#endregion

  //#region 初始化数据加载
  useEffect(() => {
    withTransAction();
  }, []);
  //#endregion

  return (
    <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <AddMissionCard onFinish={(data) => insertMission(data)} />
      <MissionsList categories={categories} missions={missions} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
