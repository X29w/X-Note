import { FC, PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
  type?: "danger" | "success" | "processing";
}

const Card: FC<CardProps> = ({ children, style = {}, type = "processing" }) => (
  <View style={[styles.card, styles[`${type}Background`], style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowRadius: 15,
    shadowOpacity: 0.1,
  },
  dangerBackground: {
    backgroundColor: "rgba(255, 0, 0, 0.1)", // 浅红色
  },
  successBackground: {
    backgroundColor: "rgba(0, 255, 0, 0.1)", // 浅绿色
  },
  processingBackground: {
    backgroundColor: "white", // 浅橙色
  },
});

export default Card;
