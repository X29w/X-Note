import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { catchError } from "@/utils/common";
import { useSQLiteContext } from "expo-sqlite";
import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { IndexCollection } from "./components";

const HomeScreen: FC<never> = () => {
  const [categories, setCategories] = useState<MCategory.ICategory[]>([]);
  const [transactions, setTransactions] = useState<MTransaction.ITransaction[]>(
    []
  );
  const db = useSQLiteContext();

  const getData = async () => {
    const [error, data] = await catchError(
      db.getAllAsync<MTransaction.ITransaction>(
        `SELECT * FROM Transactions ORDER BY date DESC LIMIT 30;`
      )
    );
    error ? console.log(error) : setTransactions(data);
  };

  const deleteTransaction = (id: number) => {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
      await getData();
    });
  };

  const withTransAction = () => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  };

  useEffect(() => {
    withTransAction();
  }, []);

  return (
    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          onLongPress={() => deleteTransaction(item.id)}
        >
          <IndexCollection.ListItem
            transaction={item}
            categoryInfo={categories.find(
              (category) => category.id === item.category_id
            )}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
