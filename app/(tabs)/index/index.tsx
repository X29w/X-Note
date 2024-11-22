import { catchError } from "@/utils/common";
import { useSQLiteContext } from "expo-sqlite";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AddMissionCard from "./components/mission-add";
import MissionsList from "./components/mission-list";
import { missionsFactory } from "@/database/factory";

const HomeScreen: FC<never> = () => {
  const [categories, setCategories] = useState<MCategory.ICategory[]>([]);
  const [missions, setMissions] = useState<MMission.IMission[]>([]);
  const db = useSQLiteContext();
  const missionController = missionsFactory();

  //#region 删除任务
  const deleteMission = async (id: number) => {
    await missionController.delete(id);
    await getData();
  };
  //#endregion

  //#region 完成任务
  const completeMission = async (id: number) => {
    const [error] = await catchError(
      db.withTransactionAsync(async () => {
        await db.runAsync(`UPDATE Missions SET status = 'Done' WHERE id = ?;`, [
          id,
        ]);
        await getData();
      })
    );
    error && console.log(error);
  };
  //#endregion

  //#region 增加任务
  const insertMission = async (mission: MMission.Base) => {
    await missionController.create(mission);
    await getData();
  };
  //#endregion

  //#region 获取列表
  const getData = async () => {
    const data = await missionController.findAll();
    setMissions(data);
    console.log("data", data);

    const [error2, data2] = await catchError(
      db.getAllAsync<MCategory.ICategory>(`SELECT * FROM Categories;`)
    );
    error2 ? console.log(error2) : setCategories(data2);
  };
  //#endregion

  //#region 初始化数据加载
  useEffect(() => {
    getData();
  }, []);
  //#endregion

  return (
    <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <AddMissionCard onFinish={(data) => insertMission(data)} />
      <MissionsList
        categories={categories}
        missions={missions}
        onDeleteMission={deleteMission}
        onDoneMission={completeMission}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
