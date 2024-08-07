import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';

import ThemeContext from '../context/ThemeContext';

export default function RecipeCard({ recipeInfo: { title, thumbnail, description, calories, grams }, onPress }) {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ backgroundColor: theme.recipeCard, flex: 1 }}
            className="flex-row mb-4 items-center justify-center 
            rounded-[20px] mx-6 h-[140px]">
            <Image
                source={{ uri: thumbnail }}
                className="w-[100px] h-[100px] rounded-full"
                resizeMode='contain' />
            <View className="flex-col items-start ml-6">
                <View className="flex-row gap-4 mb-1">
                    <Text className="text-[13px] text-secondary_beix font-mmedium">{grams}g</Text>
                    <Text className="text-[13px] text-secondary_beix font-mmedium">{calories}cal</Text>
                </View>
                <Text className="text-[20px] font-msemi text-white">{title}</Text>
                <Text className="text-[14px] font-mregular w-[176px] text-gray-200">{description}</Text>
            </View>
        </TouchableOpacity>
    )
}