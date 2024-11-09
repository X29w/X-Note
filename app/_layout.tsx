import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { FC, Suspense, useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { catchError } from "@/utils/common";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { ActivityIndicator, Text, View } from "react-native";
import {
  DATABASE_FILE_PATH,
  DATABASE_NAME,
  DATABASE_URI,
} from "@/constant/config";

SplashScreen.preventAutoHideAsync();

const RootLayout: FC<never> = () => {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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

  const initDataBase = async () => {
    const [error, result] = await catchError(loadDataBase());
    error ? console.log(error) : setDbLoaded(true);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initDataBase();
  }, []);

  if (!loaded) {
    return null;
  }

  if (!dbLoaded)
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>loading....</Text>
      </View>
    );

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>loading....</Text>
        </View>
      }
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SQLiteProvider databaseName={DATABASE_NAME} useSuspense>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SQLiteProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default RootLayout;
