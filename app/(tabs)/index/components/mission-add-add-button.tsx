import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

interface AddButtonProps {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddButton: FC<AddButtonProps> = ({ setIsAddingTransaction }) => {
  return (
    <TouchableOpacity
      onPress={() => setIsAddingTransaction(true)}
      activeOpacity={0.6}
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center",
        backgroundColor: "#007BFF20",
        borderRadius: 15,
      }}
    >
      <MaterialIcons name="add-circle-outline" size={24} color="#007BFF" />
      <Text style={{ fontWeight: "700", color: "#007BFF", marginLeft: 5 }}>
        New Entry
      </Text>
    </TouchableOpacity>
  );
};

export default AddButton;
