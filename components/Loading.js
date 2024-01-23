import React from 'react'
import { Dimensions, View } from 'react-native'
import * as Progress from 'react-native-progress'

export default function Loading() {



  const { width, height } = Dimensions.get("window");


  return (
    <View style={{height, width}} className=" flex-row justify-center items-center">
      <Progress.CircleSnail thickness={12} size={100} color={"yellow"} />
    </View>
  )
}
