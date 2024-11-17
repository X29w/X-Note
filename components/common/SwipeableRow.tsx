import React, { PropsWithChildren, useRef, useCallback } from "react";
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

interface SwipeableRowProps {
  customRenderRightActions?: (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
    close: () => void
  ) => React.JSX.Element;
}

const SwipeableRow: React.FC<PropsWithChildren<SwipeableRowProps>> = ({
  children,
  customRenderRightActions,
}) => {
  const swipeableRow = useRef<Swipeable>(null);

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      window.alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderRightAction("More", "#C8C7CD", 192, progress)}
      {renderRightAction("Flag", "#ffab00", 128, progress)}
      {renderRightAction("More", "#dd2c00", 64, progress)}
    </View>
  );

  const close = useCallback(() => {
    swipeableRow.current?.close();
  }, []);

  const handleCustom = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => customRenderRightActions?.(progress, _dragAnimatedValue, close);

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={
        customRenderRightActions ? handleCustom : renderRightActions
      }
      children={children}
    />
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#497AFC",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SwipeableRow;
