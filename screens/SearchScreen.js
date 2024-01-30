import React, { useCallback, useEffect, useState } from "react";
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
import { fetchSearch, image185, image342, image500, searchMovies } from "../api/moviedb.js";
import { debounce } from "lodash";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [resultsMovie, setResultsMovie] = useState([]);
  const [resultsSeries, setResultsSeries] = useState([]);
  const [resultsPerson, setResultsPerson] = useState([]);
  const [loading, setLoading] = useState(false);

  var { width, height } = Dimensions.get("window");

  const movieName = "Ant-man and the Wasp: Quantumania";
  const movieYear = "2023";

  const handleClick = (item) => {
    navigation.push("Movie", item);
  };

  const handleSearch = (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) {
          // Filter resultsMovie to include only items with media_type === "movie"
          const filteredResultsMovie = data.results.filter(
            (item) => item.media_type === "movie"
          );
          setResultsMovie(filteredResultsMovie);
          // Filter resultsMovie to include only items with media_type === "movie"
          const filteredResultsSeries = data.results.filter(
            (item) => item.media_type === "tv"
          );
          setResultsSeries(filteredResultsSeries);
          // Filter resultsMovie to include only items with media_type === "movie"
          const filteredResultsPerson = data.results.filter(
            (item) => item.media_type === "person"
          );
          setResultsPerson(filteredResultsPerson);
        }

      });
    } else {
      setLoading(false);
      setResultsMovie([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [
    handleSearch,
  ]);

 

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full bg-neutral-300/10"
        }
      >
        <TextInput
          placeholder="Search Movie"
          onChangeText={(text) => handleTextDebounce(text)}
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
      {loading ? (
        <Loading />
      ) : resultsMovie.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({resultsMovie.length + resultsPerson.length + resultsSeries.length})
          </Text>


          {/* Tab Movie */}
          <View className="flex-row justify-between flex-wrap">
            {resultsMovie.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => handleClick(item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      // source={require("../assets/images/moviePoster2.png")}
                      source={
                        item.poster_path
                          ? { uri: image342(item.poster_path) }
                          : require("../assets/images/movieTime.png")
                      }
                      style={{
                        width: width * 0.44,
                        height: height * 0.33,
                      }}
                      className={`rounded-xl bg-gray-700 `}
                    />
                    <Text className="text-neutral-300 ml-1 text-center  w-fit">
                      {item?.title?.length > 14
                        ? item?.title?.slice(0, 20) + "..."
                        : item?.title}
                    </Text>

                    <Text className="text-neutral-500 ml-1 text-center  w-fit">
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
