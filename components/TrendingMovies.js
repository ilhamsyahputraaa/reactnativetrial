import React from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard"; // Import MovieCard from the separate file
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function TrendingMovies({ data }) {

  const navigation = useNavigation()
  const handleClick = () => {
    navigation.navigate('Movie', item)
  }
  
  return (
    <View style={{ marginBottom: 8 }}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          marginLeft: 4,
          marginBottom: 5,
        }}>
        Trending Movies
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.6}
        sliderStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}