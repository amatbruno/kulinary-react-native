import { View, Text, Image } from 'react-native'
import React from 'react'

export default function RecipeCard({ recipeInfo: { title, thumbnail, description, calories, grams } }) {
    return (
        <View className="flex-row mb-3 items-center justify-center mx-6 border border-gray-300 h-[140px]">
            <Image
                source={{ uri: thumbnail }}
                className="w-[100px] h-[100px] rounded-full"
                resizeMode='contain' />
            <View className="flex-col items-center">
                <Text className="text-[20px] font-msemi text-white">{title}</Text>
                <Text className="text-[14px] w-[176px] text-white">{description}</Text>
            </View>
        </View>
    )
}