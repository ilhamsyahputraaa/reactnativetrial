import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  ScrollViewBase,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import ActorList from "../components/ActorList";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading.js";
import {
  fetchMovieCredits,
  fetchMovieDetail,
  fetchMovieSimilar,
  fetchTVCredits,
  fetchTVDetail,
  fetchTVSimilar,
  image500,
} from "../api/moviedb";

const DetailTV = () => {
  const { params: item } = useRoute();

  const { width, height } = Dimensions.get("window");

  const [loading, setLoading] = useState(true);

  const ios = Platform.OS == "ios";

  const topMargin = ios ? "" : "mt-3";

  const [isFavourite, toggleFavourite] = useState(false);

  const [artDir, setArtDir] = useState([1, 2, 3, 4]);
  const [related, setRelatedTVs] = useState([1, 2, 3, 4]);
  const [detail, setDetail] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getTVDetail(item.id);
    getCreditsTV(item.id);
    getSimilarTVs(item.id);
  }, [item]);

  const getTVDetail = async (id) => {
    try {
      const data = await fetchTVDetail(id);
      console.log(data);
      if (data) {
        setDetail(data); // Set directly without wrapping in an object
      }
    } finally {
      setLoading(false);
    }
  };

  const getCreditsTV = async (id) => {
    const data = await fetchTVCredits(id);
    if (data && data.cast) setArtDir(data.cast);
    setLoading(false);
  };
  const getSimilarTVs = async (id) => {
    const data = await fetchTVSimilar(id);
    if (data) setRelatedTVs(data.results);
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <StatusBar style="light" />

      {/* Backbutton and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4"
          }
        >
          <TouchableOpacity
            className="rounded-xl p-2 bg-white/20"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartIcon
              size={35}
              color={!isFavourite ? "white" : "red"}
              onPress={() => toggleFavourite(!isFavourite)}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              // source={require("../assets/images/moviePoster2.png")}
              source={{ uri: image500(detail?.poster_path) }}
              style={{
                width: width,
                height: 600,
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.3 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {loading ? null : (
        <View className="space-y-3" style={{ marginTop: -(height * 0.08) }}>
          {/* Title */}

          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {detail?.name}
          </Text>

          {/* Status,Release, runtime */}
          <View className="flex-row gap-4 w-full items-center justify-center">
            <View className="text-white  rounded-full ">
              <Text className="text-white  rounded-full ">
                {detail?.release_date}
              </Text>
            </View>

            <View className="text-white  rounded-full ">
              <Text className="text-white  rounded-full ">
                {detail?.runtime} Minutes
              </Text>
            </View>
            <View
              style={{
                borderRadius: 999,
                padding: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
              className=" items-center justify-center bg-neutral-800"
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
                {detail?.vote_average?.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Genres */}
          <View className="flex-row gap-2 w-full items-center justify-center">
            {detail?.genres?.map((item, index) => {
              return (
                <View
                  className="text-white p-1 bg-neutral-800 rounded-full px-2"
                  key={index}
                >
                  <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Description */}

          <Text className="text-neutral-400 mx-4 tracking-wide mb-10">
            {detail?.overview}
          </Text>

          <ActorList data={artDir} title={"Cast and Director"} seeAll={false} />

          <MovieList title="Similar Series" data={related} seeAll={false} />
        </View>
      )}
    </ScrollView>
  );
};

export default DetailTV;
