import { FC, PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
}

const Card: FC<CardProps> = ({ children, style = {} }) => (
  <View
    style={{
      padding: 15,
      backgroundColor: "white",
      borderRadius: 15,
      shadowColor: "#000",
      shadowRadius: 15,
      shadowOpacity: 0.1,
      elevation: 15,
      ...style,
    }}
  >
    {children}
  </View>
);

export default Card;
