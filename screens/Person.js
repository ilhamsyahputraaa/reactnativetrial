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

const Person = () => {
  const { params: item } = useRoute();

  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);

  const ios = Platform.OS == "ios";

  const topMargin = ios ? "" : "mt-3";

  const [isFavourite, toggleFavourite] = useState(false);

  const [artDir, setArtDir] = useState([1, 2, 3, 4]);
  const [related, relatedMovies] = useState([1, 2, 3, 4]);

  useEffect(() => {}, [item]);

  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >

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
        {loading? null :
        <View className="flex-row items-center justify-center">
          <Image
            source={require("../assets/images/castImage1.png")}
            // source={{ uri: image500(item.poster_path) }}
            style={{
              width: 200,
              height: 200,
              marginTop:height*0.15
            }}
            className="rounded-full shadow mt"
          />

        </View>}
      </View>

      {/* Person Details */}
      {loading? <Loading /> :
      <View className="space-y-3" style={{ marginTop: (height * 0.03) }}>
        {/* Title */}

        <View className={"space-y-1"}>
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          Keanu Reeves
        </Text>
        <Text className="text-neutral-500 text-center text-lg tracking-wider">
          London, United Kingdom
        </Text>

        </View>


        {/* Genres */}
        <View className="flex-row gap-2 w-full items-center justify-center">
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Actor
            </Text>
          </View>
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Director
            </Text>
          </View>
          <View className="text-white p-1 bg-neutral-800 rounded-full px-2">
            <Text className="text-white p-1 bg-neutral-800 rounded-full px-2">
              Producer
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



        <MovieList
          title="Related Movies and Series"
          data={related}
          movieName="movieNamesdsdffdf"
          seeAll={false}
        />
      </View>}
    </ScrollView>
  );
};

export default Person;
