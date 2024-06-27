import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { icons } from '../constants/icons'

export default function RecipeLiked({ recipeInfo: { title, thumbnail, calories, grams } }) {
    return (
        <TouchableOpacity
            className="items-center justify-start pt-3 w-[180px]
            rounded-[20px] bg-[#181E2D] h-[215px]">
            <View className="items-start flex-row justify-start w-full">
                <Image
                    source={icons.heartFilled}
                    className="w-5 h-5 ml-3"
                    tintColor="red" />
            </View>
            <Image
                source={{ uri: thumbnail }}
                className="w-[115px] h-[115px] rounded-full"
                resizeMode='cover' />
            <View className="flex-col mt-3 items-center justify-center">
                <Text className="text-[18px] font-msemi text-white w-[100px] text-center mb-1">{title}</Text>
                <View className="flex-row justify-center gap-3">
                    <Text className="text-[12px] text-secondary_beix font-mmedium">{grams}g</Text>
                    <Text className="text-[12px] text-secondary_beix font-mmedium">{calories}cal</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}