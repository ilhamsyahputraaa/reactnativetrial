import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback, TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function MovieListWide({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Top Rated</Text>
        <TouchableOpacity
          style={{ backgroundColor: "#4A5568", borderRadius: 999, padding: 8 }}
        >
          <Text style={{ color: "#ECC94B" }}>See All</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={0}
        loop={true}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.3}
        zoomScale={true}
        sliderWidth={width}
        activeSlideOffset={1} // Sesuaikan offset yang diinginkan
        itemWidth={width * 0.78}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="relative ">
        <View
          style={{
            backgroundColor: "#4A5568",
            borderRadius: 999,
            padding: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          className="absolute top-2 right-2 z-20 items-center justify-center"
        >
          <Image
            source={require("../assets/images/fullStar.png")}
            // source={{ uri: image500(item.poster_path) }}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text style={{ color: "#ECC94B" }}>3</Text>
        </View>
        <View
          style={{
            borderRadius: 999,
            padding: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            gap: 10,
          }}
          className="absolute bottom-2 left-2 z-20 items-start justify-start bg-black/20 w-full"
        >
          <Text style={{ color: "white" }}>Dunkirk</Text>
          <Text style={{ color: "gray" }}>2017</Text>
        </View>
        <Image
          source={require("../assets/images/Dunkirk-landscape.png")}
          // source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.8,
            height: height * 0.2,
          }}
          className="rounded-3xl"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
