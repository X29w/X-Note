import { missionsFactory } from "@/database/factory";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import AddMissionCard from "./components/mission-add";
import MissionsList from "./components/mission-list";

const HomeScreen: FC<never> = () => {
  const [missions, setMissions] = useState<MMission.IMission[]>([]);
  const missionController = missionsFactory();

  //#region 删除任务
  const deleteMission = async (id: number) => {
    await missionController.delete(id);
    await getData();
  };
  //#endregion

  //#region 完成任务
  const completeMission = async (data: MMission.IMission) => {
    await missionController.update(data);
    await getData();
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
        missions={missions}
        onDeleteMission={deleteMission}
        onDoneMission={completeMission}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
