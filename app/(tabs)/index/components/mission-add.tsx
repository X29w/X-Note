import Card from "@/components/common/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState, type FC } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import AddButton from "./mission-add-add-button";
import ConditionalRender from "@/components/config/ConditionalRender";
import DataView from "@/components/config/DataView";
import dayjs from "dayjs";

interface AddMissionCardProps {
  onFinish: (missions: Omit<MMission.IMission, "id">) => Awaited<void>;
}

const AddMissionCard: FC<AddMissionCardProps> = ({ onFinish }) => {
  const [isAddingTransaction, setIsAddingTransaction] =
    useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0); //当前选中的tab，0：已有任务分类，1：新建任务分类
  const [categories, setCategories] = useState<MCategory.ICategory[]>([]); // 任务分类列表
  const [missionName, setMissionName] = useState<string>(""); // 任务名称
  const [description, setDescription] = useState<string>(""); // 任务描述
  const [categoryId, setCategoryId] = useState<number>(1); // 任务分类ID
  const db = useSQLiteContext();

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
      emoji: "1f600",
      date: dayjs().valueOf(),
    };

    onFinish(data);
    handleCancel();
  };

  //#region 获得任务分类列表
  const getCategories = async () => {
    const res = await db.getAllAsync<MCategory.ICategory>(
      `SELECT * FROM Categories;`
    );
    setCategories(res);
  };
  //#endregion

  useEffect(() => {
    getCategories();
  }, [currentTab]);

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
          <Text style={{ marginBottom: 6 }}>Select a Category</Text>
          <SegmentedControl
            values={["Exist", "Create"]}
            style={{ marginBottom: 15 }}
            selectedIndex={currentTab}
            onChange={(event) => {
              setCurrentTab(event.nativeEvent.selectedSegmentIndex);
            }}
          />
          <DataView
            data={categories}
            keyExtractor={(item) => item.id}
            itemRender={(item) => (
              <TouchableOpacity
                onPress={() => setCategoryId(item.id)}
                activeOpacity={0.6}
                style={{
                  height: 40,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    item.id === categoryId ? "#007BFF20" : "#00000020",
                  borderRadius: 15,
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: item.id === categoryId ? "#007BFF" : "#000000",
                    marginLeft: 5,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <Button
            title="Cancel"
            color="red"
            onPress={() => setIsAddingTransaction(false)}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      </ConditionalRender>
    </View>
  );
};

export default AddMissionCard;
