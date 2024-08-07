import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useRef, useMemo, useState, useEffect, useContext } from 'react'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { icons } from "../constants/icons";

import InfoTarget from '../components/InfoTarget';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { getLikedRecipes, userLikedRecipes } from '../lib/appwrite';
import { useGlobalContext } from '../context/GlobalProvider';
import ThemeContext from '../context/ThemeContext';

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;
    
    const navigation = useNavigation();
    const { user } = useGlobalContext();
    const { theme } = useContext(ThemeContext);

    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    //Steps arr slicing
    const steps = [];
    for (let i = 1; i <= 7; i++) {
        const step = recipe[`step${i}`];
        if (step) {
            steps.push(step);
        }
    }

    useEffect(() => {
        // Check if the recipe is already liked by the user
        const fetchLikedStatus = async () => {
            try {
                if (user && recipe) {
                    const likedRecipes = await getLikedRecipes(user.$id);
                    const isLiked = likedRecipes.some(likedRecipe => likedRecipe.$id === recipe.$id);
                    setLiked(isLiked);
                }
            } catch (error) {
                console.error('Error fetching liked status:', error.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchLikedStatus();
    }, [user, recipe]);

    const handleLikeToggle = async () => {
        try {
            if (user && recipe) {
                setLiked((isLiked) => !isLiked);
                await userLikedRecipes({ recipeId: recipe.$id, userId: user.$id });
            }
        } catch (error) {
            console.error('Error toggling like:', error.message);
            // Revert the UI update in case of error
            setLiked((isLiked) => !isLiked);
        }
    };

    if (!user || !recipe) {
        return null;
    }

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '23%', '94%'], []);

    return (
        <GestureHandlerRootView style={{ backgroundColor: theme.background, flex: 1 }}>
            <SafeAreaView className='h-full w-full'>
                <View className="mt-8 flex-row justify-between mx-8">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('home')}
                    >
                        <Image
                            source={icons.arrowLeft}
                            className="w-[25px] h-[25px]"
                            tintColor={theme.tintColor}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <Pressable onPress={handleLikeToggle}>
                        <MaterialCommunityIcons
                            name={liked ? "heart" : "heart-outline"}
                            size={25}
                            color={liked ? "red" : "#c5ccd9"}
                        />
                    </Pressable>
                </View>
                <View className="items-center">
                    <Text style={{ color: theme.text }} className="text-center text-[23px] w-[200px] font-mbold mb-7">{recipe.title}</Text>
                    <Image
                        source={{ uri: recipe.thumbnail }}
                        className="w-[190px] h-[190px] rounded-full"
                        resizeMode="contain" />
                </View>
                <View className="flex-row justify-center mt-7 border-2 border-gray-400 mx-8 rounded-xl py-4">
                    <InfoTarget value1={recipe.calories} value2="calories" />
                    <InfoTarget value1={recipe.grams} value2="grams" />
                    <InfoTarget value1={recipe.minutes} value2="minutes" />
                    <InfoTarget value1="1" value2="serve" />
                </View>
                <View className="flex-1 mx-2">
                    <BottomSheet
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={{ backgroundColor: theme.bottomSheet }}
                        handleIndicatorStyle={{ backgroundColor: theme.handler }}
                    >
                        <Text
                            style={{ color: theme.text }}
                            className="text-center font-msemi text-[24px] pt-2 pb-5">How to make it?</Text>
                        <BottomSheetScrollView>
                        <View className="items-start mb-5 mx-8">
                            <Text style={{ color: theme.steps }} className="text-[16px] font-mmedium">{recipe.ingredients}</Text>
                        </View>
                            {steps.length > 0 ? (
                                steps.map((step, index) => (
                                    <View key={index} className="flex-row items-start justify-start mt-4 ml-7 mr-14">
                                        <Image
                                            source={icons.state}
                                            className="w-[25px] h-[25px]"
                                            resizeMode='contain'
                                        />
                                        <View className="flex-col pl-3">
                                            <Text style={{ color: theme.text }} className="text-justify font-mbold text-[20px]">Step {index + 1}</Text>
                                            <Text style={{ color: theme.steps }} className="text-justify font-mregular text-[15px] py-2">{step}</Text>
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