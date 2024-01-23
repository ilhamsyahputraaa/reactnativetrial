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

export default function ActorList({ data, title, seeAll }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.push("Person", item);
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
        {/* {seeAll ?
        <TouchableOpacity
          style={{ backgroundColor: "#4A5568", borderRadius: 999, padding: 8 }}
        >
          <Text style={{ color: "#ECC94B" }}>See All</Text>
        </TouchableOpacity> : null} */}
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
                // source={require("../assets/images/castImage1.png")}
                source={{ uri: image342(item.profile_path) }}
                style={{
                  width: 100,
                  height: 100,
                }}
                className="rounded-full object-cover"
              />
              <Text className="text-neutral-300 ml-1 text-center  line-clamp-1 w-fit">
                {item?.name?.length > 10
                  ? item?.name?.slice(0, 10) + "..."
                  : item?.name}
              </Text>
              <Text className="text-neutral-500 ml-1 text-center  line-clamp-1 w-fit">
                {item?.known_for_departement?.length > 10
                  ? item?.known_for_departement?.slice(0, 10) + "..."
                  : item?.known_for_departement}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
