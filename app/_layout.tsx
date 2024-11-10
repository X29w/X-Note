import Loading from "@/components/common/Loading";
import ConditionalRender from "@/components/config/ConditionalRender";
import {
  DATABASE_FILE_PATH,
  DATABASE_NAME,
  DATABASE_URI,
} from "@/constant/config";
import { catchError } from "@/utils/common";
import * as FileSystem from "expo-file-system";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { FC, Suspense, useEffect, useState } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const RootLayout: FC<never> = () => {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  //#region 加载数据库
  const loadDataBase = async () => {
    const fileInfo = await FileSystem.getInfoAsync(DATABASE_FILE_PATH);
    if (fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        {
          intermediates: true,
        }
      );
      await FileSystem.downloadAsync(DATABASE_URI, DATABASE_FILE_PATH);
    }
  };
  //#endregion

  //#region 初始化数据库
  const initDataBase = async () => {
    const [error] = await catchError(loadDataBase());
    error ? console.log(error) : setDbLoaded(true);
  };
  //#endregion

  useEffect(() => {
    loaded && SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    initDataBase();
  }, []);

  return (
    <ConditionalRender condition={dbLoaded || loaded} fallback={<Loading />}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </ConditionalRender>
  );
};

export default RootLayout;
