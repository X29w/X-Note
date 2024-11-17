import Card from "@/components/common/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState, type FC } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddButton from "./mission-add-button";
import ConditionalRender from "@/components/config/ConditionalRender";
import DataView from "@/components/config/DataView";
import dayjs from "dayjs";
import CustomButton from "@/components/common/CustomButton";
import CreateCategory from "./create-tab-view";
import ExitCategory from "./exist-tab-view";

interface AddMissionCardProps {
  onFinish: (missions: Omit<MMission.IMission, "id">) => Awaited<void>;
}

const AddMissionCard: FC<AddMissionCardProps> = ({ onFinish }) => {
  const [isAddingTransaction, setIsAddingTransaction] =
    useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0); //当前选中的tab，0：已有任务分类，1：新建任务分类
  const [missionName, setMissionName] = useState<string>(""); // 任务名称
  const [description, setDescription] = useState<string>(""); // 任务描述
  const [categoryId, setCategoryId] = useState<number>(1); // 任务分类ID
  const [dateLimit, setDateLimit] = useState<OneOf<[0, 1, 2]>>(0); // 任务日期限制
  const db = useSQLiteContext();

  const expiredTimeMap = new Map<OneOf<[0, 1, 2]>, number>([
    [0, dayjs().endOf("day").valueOf()],
    [1, dayjs().add(7, "day").endOf("day").valueOf()],
    [2, dayjs("9999-12-31").valueOf()],
  ]);

  const handleCancel = () => {
    setMissionName("");
    setDescription("");
    setCategoryId(1);
    setCurrentTab(0);
    setIsAddingTransaction(false);
  };

  const handleSave = async () => {
    const data: Omit<MMission.IMission, "id"> = {
      name: missionName,
      description,
      category_id: categoryId,
      status: "Processing",
      date: dayjs().valueOf(),
      expiredTime: expiredTimeMap.get(dateLimit)!,
    };

    onFinish(data);
    handleCancel();
  };

  //#region 创建任务分类
  const handleCreateCategory = async (name: string) => {
    await db.withTransactionAsync(async () => {
      await db.runAsync("INSERT INTO Categories (name) VALUES (?)", [name]);

      setCurrentTab(0);
    });
  };
  //#endregion

  return (
    <View style={{ marginBottom: 15 }}>
      <ConditionalRender
        condition={isAddingTransaction}
        fallback={<AddButton setIsAddingTransaction={setIsAddingTransaction} />}
      >
        <Card>
          <TextInput
            placeholder="Mission Name"
            style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
            onChangeText={setMissionName}
          />
          <TextInput
            placeholder="Description"
            style={{ marginBottom: 15 }}
            onChangeText={setDescription}
          />
          <SegmentedControl
            values={["Today", "A Week", "Indefinite"]}
            style={{ marginBottom: 15 }}
            selectedIndex={dateLimit}
            onChange={(event) => {
              setDateLimit(
                event.nativeEvent.selectedSegmentIndex as OneOf<[0, 1, 2]>
              );
            }}
          />
          <Text style={{ marginBottom: 6 }}>Select a Category</Text>
          <SegmentedControl
            values={["Exist", "Create"]}
            style={{ marginBottom: 15 }}
            selectedIndex={currentTab}
            onChange={(event) => {
              setCurrentTab(event.nativeEvent.selectedSegmentIndex);
            }}
          />
          <ConditionalRender
            condition={currentTab === 0}
            fallback={<CreateCategory onFinish={handleCreateCategory} />}
          >
            <ExitCategory onFinish={setCategoryId} />
          </ConditionalRender>
        </Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <CustomButton
            title="Cancel"
            type="danger"
            onPress={() => setIsAddingTransaction(false)}
          />
          <CustomButton
            title="Confirm"
            onPress={handleSave}
            disabled={!missionName}
          />
        </View>
      </ConditionalRender>
    </View>
  );
};

export default AddMissionCard;
