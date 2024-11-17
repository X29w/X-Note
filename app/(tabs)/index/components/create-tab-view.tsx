import CustomButton from "@/components/common/CustomButton";
import { catchError } from "@/utils/common";
import { useSQLiteContext } from "expo-sqlite";
import { useState, type FC } from "react";
import { TextInput, ToastAndroid, View } from "react-native";
import Toast from "react-native-toast-message";

interface CreateCategoryProps {
  onFinish: (name: string) => void;
}

const CreateCategory: FC<CreateCategoryProps> = ({ onFinish }) => {
  const [name, setName] = useState<string>("");
  const db = useSQLiteContext();

  //#region 新增分类前查询是否已存在同名分类
  const handlePress = async () => {
    const [error, data] = await catchError(
      db.getAllAsync<MMission.IMission>(
        `SELECT * FROM Categories WHERE name =?`,
        [name]
      )
    );
    if (error) return console.log(error);

    if (name.trim().length === 0)
      return Toast.show({
        type: "error",
        text1: "Please enter a name",
      });

    data && data.length > 0
      ? Toast.show({
          type: "error",
          text1: "Category already exists",
        })
      : onFinish(name);
  };
  //#endregion

  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        placeholder="New Category Name"
        style={{ marginBottom: 15 }}
        onChangeText={setName}
      />
      <CustomButton title="Create" ghost onPress={() => handlePress()} />
    </View>
  );
};

export default CreateCategory;
