import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");

export default function MovieList({ data, title, movieName }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View style={{ marginBottom: 20, paddingVertical: 4 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
        <TouchableOpacity
          style={{ backgroundColor: "#4A5568", borderRadius: 999, padding: 8 }}
        >
          <Text style={{ color: "#ECC94B" }}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleClick(item)}
          >
            <View className="space-y-1 mr-4">
                
            <Image
              source={require("../assets/images/moviePoster2.png")}
              // source={{ uri: image500(item.poster_path) }}
              style={{
                width: width * 0.33,
                height: height * 0.22,
              }}
              className="rounded-xl"
            />
            <Text className="text-neutral-300 ml-1 text-center  line-clamp-1 w-fit">{movieName.length>14? movieName.slice(0,14)+"...":movieName}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
