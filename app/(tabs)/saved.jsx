import { View, Text, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { getLikedRecipes } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import useAppwrite from '../../lib/useAppwrite';
import RecipeLiked from '../../components/RecipeLiked';

import { useNavigation } from '@react-navigation/native';

import { icons } from '../../constants/icons';

const Saved = () => {
    const { user } = useGlobalContext();
    const { data: recipes, reFetch } = useAppwrite(() => getLikedRecipes(user.$id));
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await reFetch();
        setRefreshing(false);
    };

    const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-background h-full">
            <FlatList
                data={recipes}
                keyExtractor={item => `${item.$id}`}
                renderItem={({ item }) => <View className="mx-2 mt-4"><RecipeLiked recipeInfo={item} /></View>}
                ListHeaderComponent={() => (
                    <>
                        <View className="mt-16 flex-row justify-between mx-8">
                            <TouchableOpacity
                                onPress={() => navigation.navigate('home')}
                            >
                                <Image
                                    source={icons.arrowLeft}
                                    className="w-[25px] h-[25px]"
                                    tintColor="white"
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-2xl font-mbold text-center text-white mt-2 mb-2">My saved recipes</Text>
                    </>
                )}
                numColumns={2}
                ListEmptyComponent={() => (
                    <Text className="text-white">Actually you don't have saved recipes</Text>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Saved