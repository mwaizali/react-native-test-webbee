/** @format */

import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, Text } from "react-native";
import Lottie from "lottie-react-native";
import {  Images } from "../../theme";
import styles from "./styles";
import SplashScreen from "react-native-splash-screen";

export default function CustomSplashScreen() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    SplashScreen.hide();

    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        style={styles.lottieStyle}
        source={Images.lottie.splash}
        progress={animationProgress.current}
      />

    </View>
  );
}
