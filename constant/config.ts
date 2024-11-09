import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export const DATABASE_NAME = "mySQLiteDB.db";

export const DATABASE_ASSET = require("@/assets/database/mySQLiteDB.db");

export const DATABASE_URI = Asset.fromModule(DATABASE_ASSET).uri;

export const DATABASE_FILE_PATH = `${FileSystem.documentDirectory}SQLite/${DATABASE_NAME}`;
