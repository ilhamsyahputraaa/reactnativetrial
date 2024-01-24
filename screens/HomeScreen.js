import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Bars3Icon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import TrendingMovies from "../components/TrendingMovies.js";
import MovieList from "../components/MovieList.js";
import ActorList from "../components/ActorList.js";
import MovieListWide from "../components/MovieListWide.js";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading.js";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchTrendingPerson,
  fetchTrendingTV,
  fetchUpcomingMovies,
} from "../api/moviedb.js";

const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [trendingTV, setTrendingTV] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [person, setPerson] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Search");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getTrendingMovies(),
          getUpcomingMovie(),
          getTopRated(),
          getTrendingTV(),
          getTrendingPerson(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovie = async () =>{
    const data = await fetchUpcomingMovies();
    if(data&& data.results) setUpcoming(data.results);
    setLoading(false)
  }
  const getTopRated = async () =>{
    const data = await fetchTopRatedMovies();
    if(data&& data.results) setTopRated(data.results);
    setLoading(false)
  }
  const getTrendingTV = async () =>{
    const data = await fetchTrendingTV();
    if(data&& data.results) setTrendingTV(data.results);
    setLoading(false)
  }
  const getTrendingPerson = async () =>{
    const data = await fetchTrendingPerson();
    if(data&& data.results) setPerson(data.results);
    setLoading(false)
  }


  return (
    <View className="flex-1 bg-neutral-900">
      {/* Search Bar and Logo */}
      <StatusBar style="light" />
      <SafeAreaView className={`bg-whites ${ios ? "-mb-2" : "mb-3"}`}>
        <View className="flex-row justify-between items-center mx-4 ">
          <Bars3Icon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-yellow-500">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => handleClick()}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* TrendingMovies */}

          {trending && <TrendingMovies data={trending} />}

          {/* Upcoming Movies */}

          <MovieList
            title="Upcoming Movies"
            data={upcoming}
          />

          {/* TV Show */}
          <MovieList
            title="TV Shows"
            data={trendingTV}
            seeAll={false}
          />

          {/* topRated Movies */}
          <MovieListWide title="Top Rated Movies" data={topRated} />

          {/* Upcoming Movies */}
          <ActorList
            title="Artists and Director"
            data={person}
            seeAll={false}
          />
        </ScrollView>
      )}
    </View>
  );
}
