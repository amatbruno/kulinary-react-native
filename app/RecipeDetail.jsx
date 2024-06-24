import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet from '@gorhom/bottom-sheet';

import { icons } from "../constants/icons";

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['20%', '19%', '94%'], []);

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

                {/*COMPROBAR SI SE PUEDE HACER SCROLLABLE PARA MOSTRAR TODO EL CONTENIDO*/}
                <View className="flex-1 p-24 mx-2">
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={styles.bottomSheetBackground}
                        handleIndicatorStyle={styles.handlerColor}
                    >
                        <View className="flex-1 items-center bg-[#181E2D]">
                            <Text className="text-center font-msemi text-[17px] text-white py-2">Steps & Ingredients</Text>
                            <Text className="text-justify mx-5 font-mregular text-[14px] text-white py-2">{recipe.steps}</Text>
                        </View>
                    </BottomSheet>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#181E2D',
    },
    handlerColor: {
        backgroundColor: 'gray',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    }
});