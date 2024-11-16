import type { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  type?: "danger" | "primary";
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  type = "primary",
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.6}
      style={[
        styles.button,
        type === "danger" ? styles.dangerButton : styles.primaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f44336",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#cccccc", // 禁用时的背景颜色
  },
  primaryButton: {
    backgroundColor: "#2196F3", // primary 类型的背景颜色
  },
  dangerButton: {
    backgroundColor: "#f44336", // danger 类型的背景颜色
  },
  text: {
    color: "#ffffff",
  },
  disabledText: {
    color: "#888888", // 禁用时的文字颜色
  },
});

export default CustomButton;
