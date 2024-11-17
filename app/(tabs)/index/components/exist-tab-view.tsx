import SwipeableRow from "@/components/common/SwipeableRow";
import DataView from "@/components/config/DataView";
import { catchError } from "@/utils/common";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState, type FC } from "react";
import { Text, TouchableOpacity } from "react-native";
// import SkeletonContent from "react-native-skeleton-content";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

interface ExitCategoryProps {
  onFinish: (id: number) => void;
}

const ExitCategory: FC<ExitCategoryProps> = ({ onFinish }) => {
  const [categories, setCategories] = useState<MCategory.ICategory[]>([]); // 任务分类列表
  const [categoryId, setCategoryId] = useState<number>(0);
  const db = useSQLiteContext();

  //#region 获得任务分类列表
  const getCategories = async () => {
    const res = await db.getAllAsync<MCategory.ICategory>(
      `SELECT * FROM Categories;`
    );
    setCategories(res);
    setCategoryId(res[0].id);
  };
  //#endregion

  //#region 删除任务分类
  const handleDeleteCategory = async (id: number) => {
    const [error] = await catchError(
      db.withTransactionAsync(async () => {
        await db.runAsync("DELETE FROM Categories WHERE id = ?", [id]);
        await getCategories();
      })
    );
    error && console.log(error);
  };
  //#endregion

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <DataView
      data={categories}
      keyExtractor={(item) => item.id}
      itemRender={(item, index) => (
        <SwipeableRow
          customRenderRightActions={() => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
              onPress={() => handleDeleteCategory(item.id)}
            >
              <MaterialIcons name="delete-outline" size={24} color="#ff7961" />
            </TouchableOpacity>
          )}
        >
          <Animated.View
            style={{
              flex: 1,
            }}
            entering={FadeInUp.delay(index * 50)}
            exiting={FadeOutUp}
          >
            <TouchableOpacity
              onPress={() => {
                setCategoryId(item.id);
                onFinish(item.id);
              }}
              onLongPress={() => {}}
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
          </Animated.View>
        </SwipeableRow>
      )}
    />
  );
};

export default ExitCategory;
