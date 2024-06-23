import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { icons } from "../constants/icons";

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;

    return (
        <SafeAreaView className='bg-background h-full w-full'>
            <View className="mt-8 flex-row justify-between mx-8">
                <Image
                    source={icons.arrowLeft}
                    className="w-[25px] h-[25px]"
                    tintColor="white"
                    resizeMode="cover" />
                <Image source={icons.saved}
                    className="w-[25px] h-[25px]"
                    tintColor="#FF0000"
                    resizeMode="cover" />
            </View>
            <View className="items-center">
                <Text className="text-white text-center text-[23px] w-[200px] font-mbold mb-7">{recipe.title}</Text>
                <Image
                    source={{ uri: recipe.thumbnail }}
                    className="w-[225px] h-[225px] rounded-full"
                    resizeMode="contain" />
            </View>
            <View className="flex-row justify-center mt-10 border-2 border-gray-400 mx-8 rounded-xl py-5">
                <View className="flex-col items-center gap-2.5 mr-12">
                    <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.calories}</Text>
                    <Text className="text-[13px] text-gray-200 font-mregular">calories</Text>
                </View>
                <View className="flex-col items-center gap-2.5 mr-12">
                    <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.grams}</Text>
                    <Text className="text-[13px] text-gray-200 font-mregular">grams</Text>
                </View>
                <View className="flex-col items-center gap-2.5">
                    <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.minutes}</Text>
                    <Text className="text-[13px] text-gray-200 font-mregular">minutes</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}