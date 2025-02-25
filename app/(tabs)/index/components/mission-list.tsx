import Card, { CardProps } from "@/components/common/Card";
import SwipeableRow from "@/components/common/SwipeableRow";
import DataView from "@/components/config/DataView";
import { EMOJIS } from "@/constant/Emojis";
import dayjs from "dayjs";
import LottieView from "lottie-react-native";
import type { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import RightActions from "./mission-list-right-actions";

interface MissionsListProps {
  missions: MMission.IMission[];
  onDeleteMission: (id: number) => Awaited<void>;
  onDoneMission: (data: MMission.IMission) => Awaited<void>;
}

interface MissionMap {
  cardType: CardProps["type"];
  emoji: (typeof EMOJIS)[number]["key"];
}

const MissionsList: FC<MissionsListProps> = ({
  missions = [],
  onDeleteMission,
  onDoneMission,
}) => {
  const cardTypeMap = new Map<
    MMission.IMission["status"],
    (item: MMission.IMission) => MissionMap
  >([
    [
      "Processing",
      (item) =>
        dayjs(item.expiredTime).isAfter(dayjs())
          ? {
              cardType: "processing",
              emoji: "1fae1",
            }
          : {
              cardType: "danger",
              emoji: "1f97a",
            },
    ],
    [
      "Done",
      () => ({
        cardType: "success",
        emoji: "1f973",
      }),
    ],
  ]);

  return (
    <View style={{ gap: 15 }}>
      <DataView
        data={missions}
        keyExtractor={(item) => item.id}
        itemRender={(item, index) => (
          <SwipeableRow
            customRenderRightActions={(progress, _dragAnimatedValue, close) => (
              <RightActions
                close={close}
                status={item.status}
                progress={progress}
                onDeleteMission={() => onDeleteMission(item.id)}
                onDoneMission={() => onDoneMission(item)}
              />
            )}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Card type={cardTypeMap.get(item.status)!(item).cardType}>
                <AutoSizeText
                  fontSize={32}
                  mode={ResizeTextMode.max_lines}
                  numberOfLines={1}
                  style={[styles.amount, { maxWidth: "80%" }]}
                >
                  {item.name}
                </AutoSizeText>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.description}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      {item.category_name}
                    </Text>
                    <LottieView
                      source={{
                        uri: `https://fonts.gstatic.com/s/e/notoemoji/latest/${
                          cardTypeMap.get(item.status)!(item).emoji
                        }/lottie.json`,
                      }}
                      autoPlay
                      loop
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {dayjs(item.date).format("DD/MM/YYYY HH:mm")}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          </SwipeableRow>
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
