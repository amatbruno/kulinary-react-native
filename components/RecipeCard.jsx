import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

export default function RecipeCard({ recipeInfo: { title, thumbnail, description, calories, grams } }) {



    return (
        <TouchableOpacity onPress={() => {
            Alert.alert(title)
        }}
            className="flex-row mb-4 items-center justify-center 
            rounded-[20px] mx-6 bg-[#181E2D] h-[140px]">
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