import React, { FC, Fragment, ReactNode } from "react";
import { View } from "react-native";

interface DataViewProps<T> {
  data: T[];
  itemRender: (item: T) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
}

const DataView = <T,>({
  data,
  itemRender,
  keyExtractor,
}: DataViewProps<T>): ReactNode =>
  data.map((item, index) => (
    <Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
      {itemRender(item)}
    </Fragment>
  ));

export default DataView;