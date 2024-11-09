import type { FC } from "react";
import { Text } from "react-native";

interface ListItemProps {
  transaction: MTransaction.ITransaction;
  categoryInfo: MCategory.ICategory | undefined;
}

const ListItem: FC<ListItemProps> = () => {
  return <Text>ListItem</Text>;
};

export default ListItem;
