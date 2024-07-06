import { View, Text, SafeAreaView, FlatList, RefreshControl, Image } from 'react-native'
import React, { useState, useContext } from 'react'

import { getLikedRecipes } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';

import { useGlobalContext } from '../../context/GlobalProvider';
import ThemeContext from '../../context/ThemeContext';

import RecipeLiked from '../../components/RecipeLiked';

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

    const { theme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }} className="h-full">
            <FlatList
                data={recipes}
                keyExtractor={item => `${item.$id}`}
                renderItem={({ item }) => <View className="mx-2 mt-4"><RecipeLiked recipeInfo={item} /></View>}
                ListHeaderComponent={() => (
                    <View className="mt-24">
                        <Text
                            style={{ color: theme.text }}
                            className="text-2xl font-mbold text-center mt-2 mb-2">My saved recipes
                        </Text>
                    </View>
                )}
                numColumns={2}
                ListEmptyComponent={() => (
                    <View className="items-center mt-24 w-1/2 mx-auto">
                        <Image
                            source={icons.desert}
                            tintColor="#FFE598"
                            resizeMode='cover'
                            className="w-[110px] h-[110px] mb-7" />
                        <Text
                            className="font-mmedium text-[18px] w-[200px] text-center"
                            style={{ color: theme.noSavedColor }}>You don't have saved recipes yet
                        </Text>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Saved