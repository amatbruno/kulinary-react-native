import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';

import { icons } from '../constants/icons'

import ThemeContext from '../context/ThemeContext';

export default function RecipeLiked({ recipeInfo: { title, thumbnail, calories, grams } }) {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            style={{ backgroundColor: theme.recipeCard, flex: 1 }}
            className="items-center justify-start pt-3 w-[180px]
            rounded-[20px] h-[225px]">
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
                <Text style={{ color: theme.recipeText }} className="text-[18px] font-msemi w-[100px] text-center mb-1">{title}</Text>
                <View className="flex-row justify-center gap-3">
                    <Text className="text-[12px] text-secondary_beix font-mmedium">{grams}g</Text>
                    <Text className="text-[12px] text-secondary_beix font-mmedium">{calories}cal</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}