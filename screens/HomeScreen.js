import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import TrendingMovies from "../components/TrendingMovies.js";
import MovieList from "../components/MovieList.js";
import ActorList from "../components/ActorList.js";
import MovieListWide from "../components/MovieListWide.js";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [artDir, setArtDir] = useState([1, 2, 3,4]);

  return (
    <View className="flex-1 bg-neutral-900">
      {/* Search Bar and Logo */}
      <StatusBar style="light" className={""} />
      <SafeAreaView className={`bg-whites ${ios ? "-mb-2" : "mb-3"}`}>
        <View className="flex-row justify-between items-center mx-4 ">
          <Bars3Icon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-yellow-500">M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* TrendingMovies */}
        <TrendingMovies data={trending} />

        {/* Upcoming Movies */}
        <MovieList title="Upcoming Movies" data={upcoming} movieName="movieNamesdsdffdf"/>

        {/* TV Show */}
        <MovieList title="TV Shows" data={upcoming} movieName="movieNamesdsdffdf" seeAll={true}/>

        {/* topRated Movies */}
        <MovieListWide title="Top Rated Movies" data={topRated} />

        {/* Upcoming Movies */}
        <ActorList title="Artis and Director" data={artDir} actorName={"Keanu Reeves"} dept={"Actor"} seeAll={true}/>
      </ScrollView>
    </View>
  );
}
