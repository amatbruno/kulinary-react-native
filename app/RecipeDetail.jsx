import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { icons } from "../constants/icons";

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;

    const steps = [];
    for (let i = 1; i <= 7; i++) {
        const step = recipe[`step${i}`];
        if (step) {
            steps.push(step);
        }
    }

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '20%', '94%'], []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                        className="w-[190px] h-[190px] rounded-full"
                        resizeMode="contain" />
                </View>
                <View className="flex-row justify-center mt-7 border-2 border-gray-400 mx-8 rounded-xl py-4">
                    <View className="flex-col items-center gap-2.5 mr-9">
                        <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.calories}</Text>
                        <Text className="text-[13px] text-gray-200 font-mregular">calories</Text>
                    </View>
                    <View className="flex-col items-center gap-2.5 mr-9">
                        <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.grams}</Text>
                        <Text className="text-[13px] text-gray-200 font-mregular">grams</Text>
                    </View>
                    <View className="flex-col items-center gap-2.5 mr-9">
                        <Text className="text-[18px] font-mmedium text-secondary_beix">{recipe.minutes}</Text>
                        <Text className="text-[13px] text-gray-200 font-mregular">minutes</Text>
                    </View>
                    <View className="flex-col items-center gap-2.5">
                        <Text className="text-[18px] font-mmedium text-secondary_beix">1</Text>
                        <Text className="text-[13px] text-gray-200 font-mregular">serve</Text>
                    </View>
                </View>

                <View className="flex-1 mx-2">
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={styles.bottomSheetBackground}
                        handleIndicatorStyle={styles.handlerColor}
                    >
                        <Text className="text-center font-msemi text-[24px] text-white py-2">Steps & Ingredients</Text>
                        <BottomSheetScrollView>
                            {steps.length > 0 ? (
                                steps.map((step, index) => (
                                    <View key={index} className="flex-row items-start justify-start mt-4 ml-7 mr-14">
                                        <Image
                                            source={icons.state}
                                            className="w-[25px] h-[25px]"
                                            resizeMode='contain'
                                        />
                                        <View className="flex-col pl-3">
                                            <Text className="text-justify font-mbold text-[20px] text-white">Step {index + 1}</Text>
                                            <Text className="text-justify font-mregular text-[15px] text-gray-300 py-2">{step}</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text className="text-center">No steps available for this recipe.</Text>
                            )}
                        </BottomSheetScrollView>
                    </BottomSheet>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#181E2D'
    },
    handlerColor: {
        backgroundColor: 'gray',
    }
});