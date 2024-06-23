import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;

    return (
        <SafeAreaView className='bg-background h-full'>
            <Text className="text-white">{recipe.title}</Text>
        </SafeAreaView>
    )
}