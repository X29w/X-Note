import Card from "@/components/common/Card";
import DataView from "@/components/config/DataView";
import dayjs from "dayjs";
import LottieView from "lottie-react-native";
import type { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface MissionsListProps {
  categories: MCategory.ICategory[];
  missions: MMission.IMission[];
}

const MissionsList: FC<MissionsListProps> = ({ missions = [], categories }) => {
  return (
    <View style={{ gap: 15 }}>
      <DataView
        data={missions}
        keyExtractor={(item) => item.id}
        itemRender={(item) => (
          <TouchableOpacity activeOpacity={0.7}>
            <Card>
              <View style={styles.row}>
                <View style={{ width: "40%", gap: 3 }}>
                  <View style={styles.row}>
                    <AutoSizeText
                      fontSize={32}
                      mode={ResizeTextMode.max_lines}
                      numberOfLines={1}
                      style={[styles.amount, { maxWidth: "80%" }]}
                    >
                      {item.name}
                    </AutoSizeText>
                  </View>
                  <View style={[styles.categoryContainer]}>
                    <LottieView
                      source={{
                        uri: `https://fonts.gstatic.com/s/e/notoemoji/latest/${item.emoji}/lottie.json`,
                      }}
                      autoPlay
                      loop
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {categories.find((c) => c.id === item.category_id)?.name}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.description}
                  </Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {dayjs(item.date).format("DD/MM/YYYY HH:mm")}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});

export default MissionsList;
