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
import {
  fetchSearch,
  image185,
  image342,
  image500,
  searchMovies,
} from "../api/moviedb.js";
import { debounce } from "lodash";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [resultsMovie, setResultsMovie] = useState([]);
  const [resultsSeries, setResultsSeries] = useState([]);
  const [resultsPerson, setResultsPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("movies");

  var { width, height } = Dimensions.get("window");

  const handleClickMovie = (item) => {
    navigation.push("Movie", item);
  };
  const handleClickPerson = (item) => {
    navigation.push("Person", item);
  };
  const handleClickSeries = (item) => {
    navigation.push("TV", item);
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
          console.log(data.results);
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
      setResultsPerson([]);
      setResultsSeries([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [
    handleSearch,
  ]);

  const renderResults = () => {
    switch (selectedTab) {
      case "movies":
        return resultsMovie?.length < 1 ? (
          <View className="flex-row justify-center items-center w-full">
            <Image
              source={require("../assets/images/movieTime.png")}
              style={{
                width: width * 0.66,
                height: height * 0.44,
              }}
              className="rounded-xl"
            />
          </View>
        ) : (
          resultsMovie.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClickMovie(item)}
            >
              <View className="space-y-2 mb-4">
                <View className={"relative"}>
                  <View
                    style={{
                      borderRadius: 999,
                      padding: 8,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                    className="absolute z-50 right-2 top-2 items-center justify-center bg-neutral-800"
                  >
                    <Image
                      source={require("../assets/images/fullStar.png")}
                      // source={{ uri: image500(item.poster_path) }}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    <Text style={{ color: "#ECC94B" }}>
                      {item?.vote_average?.toFixed(1)}
                    </Text>
                  </View>
                  <Image
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
                </View>
                <Text className="text-neutral-300 ml-1 text-center w-fit">
                  {item?.title?.length > 14
                    ? item?.title?.slice(0, 20) + "..."
                    : item?.title}
                </Text>
                <Text className="text-neutral-500 ml-1 text-center w-fit">
                  {item?.release_date?.length > 4
                    ? item?.release_date?.slice(0, 4)
                    : item?.release_date}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        );
      case "tv":
        return resultsSeries?.length < 1 ? (
          <View className="flex-row justify-center items-center w-full">
            <Image
              source={require("../assets/images/movieTime.png")}
              style={{
                width: width * 0.66,
                height: height * 0.44,
              }}
              className="rounded-xl"
            />
          </View>
        ) : (
          resultsSeries.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleClickSeries(item)}
            >
              <View className="space-y-2 mb-4">
                <View className={"relative"}>
                  <View
                    style={{
                      borderRadius: 999,
                      padding: 8,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                    className="absolute z-50 right-2 top-2 items-center justify-center bg-neutral-800"
                  >
                    <Image
                      source={require("../assets/images/fullStar.png")}
                      // source={{ uri: image500(item.poster_path) }}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    <Text style={{ color: "#ECC94B" }}>
                      {item?.vote_average?.toFixed(1)}
                    </Text>
                  </View>
                  <Image
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
                </View>
                <Text className="text-neutral-300 ml-1 text-center w-fit">
                  {item?.name?.length > 14
                    ? item?.name?.slice(0, 20) + "..."
                    : item?.name}
                </Text>
                <Text className="text-neutral-500 ml-1 text-center w-fit">
                  {item?.first_air_date?.length > 4
                    ? item?.first_air_date?.slice(0, 4)
                    : item?.first_air_date}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        );
      case "person":
        return resultsPerson?.length < 1 ? (
          <View className="flex-row justify-center items-center w-full">
            <Image
              source={require("../assets/images/movieTime.png")}
              style={{
                width: width * 0.66,
                height: height * 0.44,
              }}
              className="rounded-xl"
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            {resultsPerson?.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => handleClickPerson(item)}
              >
                <View
                  className="space-y-2 mb-4 items-center"
                  style={{ width: "30%" }}
                >
                  <Image
                    source={
                      item.profile_path
                        ? { uri: image342(item.profile_path) }
                        : require("../assets/images/movieTime.png")
                    }
                    style={{
                      width: width * 0.1,
                      height: height * 0.1,
                    }}
                    className={`rounded-full bg-gray-700 aspect-square`}
                  />
                  <Text className="text-neutral-300 ml-1 text-center w-fit">
                    {item?.name?.length > 14
                      ? item?.name?.slice(0, 14) + "..."
                      : item?.name}
                  </Text>
                  <Text className="text-neutral-500 ml-1 text-center w-fit">
                    {item?.known_for_department?.length > 10
                      ? item?.known_for_department?.slice(0, 10)
                      : item?.known_for_department}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        );

      default:
        return null;
    }
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
            Results (
            {resultsMovie.length + resultsPerson.length + resultsSeries.length})
          </Text>

          {/* Tab Movie */}
          <View className="flex-row justify-start  flex-wrap text-white">
            <TouchableOpacity
              onPress={() => setSelectedTab("movies")}
              className={`py-2 px-4 rounded-full ${
                selectedTab === "movies"
                  ? "bg-yellow-500 text-white "
                  : "bg-transparent text-white"
              }`}
            >
              <Text className={`text-base font-semibold ${
                  selectedTab === "movies"
                    ? " "
                    : " text-white"
                }`}>Movie</Text>
            </TouchableOpacity>
            {/* Tab TV */}
            <TouchableOpacity
              onPress={() => setSelectedTab("tv")}
              className={`py-2 px-4 rounded-full ${
                selectedTab === "tv"
                  ? "bg-yellow-500 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  selectedTab === "tv"
                    ? " "
                    : " text-white"
                }`}
              >
                TV
              </Text>
            </TouchableOpacity>
            {/* Tab Person */}
            <TouchableOpacity
              onPress={() => setSelectedTab("person")}
              className={`py-2 px-4 rounded-full ${
                selectedTab === "person"
                  ? "bg-yellow-500 text-white"
                  : "bg-transparent text-white"
              }`}
            >
              <Text className={`text-base font-semibold ${
                  selectedTab === "person"
                    ? " "
                    : " text-white"
                }`}>Person</Text>
            </TouchableOpacity>
          </View>
          {/* Tab Movie */}
          <View className="flex-row justify-between flex-wrap">
            {renderResults()}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
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
