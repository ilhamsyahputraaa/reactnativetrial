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

const DetailMovie = () => {
  const { params: item } = useRoute();

  const { width, height } = Dimensions.get("window");

  const ios = Platform.OS == "ios";

  const topMargin = ios ? "" : "mt-3";

  const [isFavourite, toggleFavourite] = useState(false);

  const [artDir, setArtDir] = useState([1, 2, 3,4]);
  const [related, relatedMovies] = useState([1, 2, 3,4]);

  useEffect(() => {}, [item]);

  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <StatusBar style="light" className={""} />

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
        <View>
          <Image
            source={require("../assets/images/moviePoster2.png")}
            // source={{ uri: image500(item.poster_path) }}
            style={{
              width: width,
              height: height * 0.55,
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
      </View>

      {/* Movie Details */}
      <View className="space-y-3" style={{ marginTop: -(height * 0.08) }}>
        {/* Title */}

        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          Ant-Man and the Wasp: Quantumania
        </Text>

        {/* Status,Release, runtime */}
        <View className="flex-row gap-4 w-full items-center justify-center">
          <View className="text-white  rounded-full ">
            <Text className="text-white  rounded-full ">
              Released In 2020
            </Text>
          </View>
          
          <View className="text-white  rounded-full ">
            <Text className="text-white  rounded-full ">
              179 Minutes
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
            <Text style={{ color: "#ECC94B" }}>3</Text>
          </View>
        </View>

        {/* Genres */}
        <View className="flex-row gap-2 w-full items-center justify-center">
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Action
            </Text>
          </View>
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Thrill
            </Text>
          </View>
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Commedy
            </Text>
          </View>
        </View>

        {/* Description */}

        <Text className="text-neutral-400 mx-4 tracking-wide mb-10">
          Super-Hero partners Scott Lang and Hope van Dyne, along with with
          Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter
          Cassie Lang, find themselves exploring the Quantum Realm, interacting
          with strange new creatures and embarking on an adventure that will
          push them beyond the limits of what they thought possible.
        </Text>

        <ActorList
          data={artDir}
          actorName={"Keanu Reeves"}
          dept={"Scott Lang"}
          title={"Cast and Director"}
          seeAll={false}
        />

        <MovieList
          title="Related Movies and Series"
          data={related}
          movieName="movieNamesdsdffdf"
          seeAll={false}
        />
      </View>
    </ScrollView>
  );
};

export default DetailMovie;
