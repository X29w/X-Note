import { Stack } from "expo-router";
import type { FC } from "react";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
