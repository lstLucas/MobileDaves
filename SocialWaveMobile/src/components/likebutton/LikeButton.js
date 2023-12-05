import React from "react";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, withSpring } from 'react-native-reanimated';
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default LikeButton = () => {
    const liked = useSharedValue(0);
  
    const outlineStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
          },
        ],
      };
    });
  
    const fillStyle = useAnimatedStyle(() => {
        return {
          transform: [{ scale: liked.value }],
          opacity: liked.value,
        };
      });
      
  
    return (
      <TouchableOpacity onPress={() => (liked.value = withSpring(liked.value ? 0 : 1))}>
        <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
          <MaterialCommunityIcons
            name={"heart-outline"}
            size={32}
            color={"black"}
          />
        </Animated.View>
  
        <Animated.View style={fillStyle}>
          <MaterialCommunityIcons name={"heart"} size={32} color={"red"} />
        </Animated.View>
      </TouchableOpacity>
    );
  };