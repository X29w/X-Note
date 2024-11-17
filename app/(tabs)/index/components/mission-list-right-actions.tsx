import ConditionalRender from "@/components/config/ConditionalRender";
import { MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface RightActionsProps {
  status: MMission.IMission["status"];
  progress: Animated.AnimatedInterpolation<number>;
  onDeleteMission: () => void;
  onDoneMission: () => void;
  close: () => void;
}

const RightActions: FC<RightActionsProps> = ({
  progress,
  onDeleteMission,
  onDoneMission,
  status,
  close,
}) => {
  const handleClose = (type: "delete" | "done") => {
    close();
    type === "delete" ? onDeleteMission() : onDoneMission();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [48, 0],
            }),
          },
        ],
        alignSelf: "center",
        flexDirection: "row",
      }}
    >
      <RectButton onPress={() => handleClose("delete")}>
        <MaterialIcons name="delete-outline" size={48} color="#ff7961" />
      </RectButton>
      <ConditionalRender condition={status !== "Done"}>
        <RectButton onPress={() => handleClose("done")}>
          <MaterialIcons name="done-all" size={48} color="#00e676" />
        </RectButton>
      </ConditionalRender>
    </Animated.View>
  );
};

export default RightActions;
