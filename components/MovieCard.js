import React from "react";
import { TouchableWithoutFeedback, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={item ? item : require("../assets/images/moviePoster1.png")}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
