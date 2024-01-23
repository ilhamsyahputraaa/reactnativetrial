import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading.js";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [results, setResult] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  var { width, height } = Dimensions.get("window");

  const movieName = "Ant-man and the Wasp: Quantumania";
  const movieYear = "2023";

  const handleClick = (item) => {
    navigation.push("Movie", item);
  };
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full bg-neutral-300/10"
        }
      >
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider "
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      {loading? (<Loading />) : 
      results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleClick(item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={require("../assets/images/moviePoster2.png")}
                      // source={{ uri: image500(item.poster_path) }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.33,
                      }}
                      className="rounded-xl"
                    />
                    <Text className="text-neutral-300 ml-1 text-center  line-clamp-1 w-fit">
                      {movieName.length > 14
                        ? movieName.slice(0, 14) + "..."
                        : movieName}
                    </Text>

                    <Text className="text-neutral-500 ml-1 text-center  line-clamp-1 w-fit">
                      {movieYear.length > 10
                        ? movieYear.slice(0, 10) + "..."
                        : movieYear}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            // source={{ uri: image500(item.poster_path) }}
            style={{
              width: width * 0.66,
              height: height * 0.44,
            }}
            className="rounded-xl"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
