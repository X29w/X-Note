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
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  type?: "danger" | "primary";
  ghost?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  type = "primary",
  ghost = false,
}) => {
  const buttonStyle = [
    styles.button,
    ghost
      ? styles.ghostButton
      : type === "danger"
      ? styles.dangerButton
      : styles.primaryButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.text,
    ghost ? (type === "danger" ? styles.dangerText : styles.primaryText) : {},
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      activeOpacity={0.6}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
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
  ghostButton: {
    backgroundColor: "transparent", // 背景透明
    borderWidth: 1,
    borderColor: "#2196F3", // 默认为 primary 的颜色，若要做分类则稍后修改
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
  primaryText: {
    color: "#2196F3", // primary 类型文字颜色
  },
  dangerText: {
    color: "#f44336", // danger 类型文字颜色
  },
  disabledText: {
    color: "#888888", // 禁用时的文字颜色
  },
});

export default CustomButton;
