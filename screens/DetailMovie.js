import {
  Dimensions,
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

const DetailMovie = () => {
  const { params: item } = useRoute();

  const { width, height } = Dimensions.get("window");

  const ios = Platform.OS == "ios";

  const topMargin = ios ? "" : "mt-3";

  const [isFavourite, toggleFavourite] = useState(false)

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
            
          </View>
      </View>
    </ScrollView>
  );
};

export default DetailMovie;
