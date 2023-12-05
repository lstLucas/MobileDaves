import React, { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, withSpring } from 'react-native-reanimated';
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { checkIfUserLikedPost, likePost } from "../../service/ServiceUtil";


async function isLiked(userId, postId) {
  const result = await checkIfUserLikedPost(userId, postId);
  if (result == false) return false;
  return true;
}


export default LikeButton = ({status, handleLike}) => {
  const liked = useSharedValue(0);
  const { userId, postId } = status;

  useEffect(() => {
    async function checkLikeStatus() {
      const likedStatus = await isLiked(userId, postId);
      liked.value = likedStatus ? 1 : 0;
    }
    checkLikeStatus();
  },[]);
  

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
    
    <TouchableOpacity onPress={() => handleLike(postId, userId)}>
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons
          name={"heart-outline"}
          size={24}
          color={"black"}
        />
      </Animated.View>

      <Animated.View style={fillStyle}>
        <MaterialCommunityIcons name={"heart"} size={24} color={"red"} />
      </Animated.View>
    </TouchableOpacity>
  );
};