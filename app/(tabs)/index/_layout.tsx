import { Stack } from "expo-router";
import type { FC } from "react";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "X-Note",
          headerLargeTitle: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
};

export default Layout;
