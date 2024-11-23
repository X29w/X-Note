import CustomButton from "@/components/common/CustomButton";
import { categoriesFactory } from "@/database/factory";
import { catchError } from "@/utils/common";
import { useState, type FC } from "react";
import { TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

interface CreateCategoryProps {
  onFinish: (name: string) => void;
}

const CreateCategory: FC<CreateCategoryProps> = ({ onFinish }) => {
  const [name, setName] = useState<string>("");
  const categoryController = categoriesFactory();

  //#region 新增分类前查询是否已存在同名分类
  const handlePress = async () => {
    const [error, data] = await catchError(categoryController.findAll());
    error ? console.log(error) : console.log(data);

    if (name.trim().length === 0)
      return Toast.show({
        type: "error",
        text1: "Please enter a name",
      });

    data?.some((item) => item.name === name.trim())
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
