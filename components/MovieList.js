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
import { image342, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function MovieList({ data, title, seeAll, isMovie }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    if (isMovie) {
      // Navigasi ke halaman Movie jika isMovie adalah true
      navigation.push("Movie", item );
    } else {
      // Navigasi ke halaman TV jika isMovie adalah false
      navigation.push("TV", item);
    }
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

        {seeAll ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#4A5568",
              borderRadius: 999,
              padding: 8,
            }}
          >
            <Text style={{ color: "#ECC94B" }}>See All</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleClick(item)}
          >
            <View className="space-y-1 mr-4">
              <Image
                // source={require("../assets/images/moviePoster2.png")}
                source={{ uri: image342(item.poster_path) }}
                style={{
                  width: width * 0.33,
                  height: height * 0.22,
                }}
                className="rounded-xl"
              />
              {item?.title ? (
                <Text className="text-neutral-300 ml-1 text-center  line-clamp-1 w-fit">
                  {item?.title?.length > 14
                    ? item?.title?.slice(0, 14) + "..."
                    : item?.title}
                </Text>
              ) : (
                <Text className="text-neutral-300 ml-1 text-center  line-clamp-1 w-fit">
                  {item?.name?.length > 14
                    ? item?.name?.slice(0, 14) + "..."
                    : item?.name}
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
