import type { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => (
  <View style={{ flex: 1 }}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text>loading....</Text>
  </View>
);

export default Loading;
