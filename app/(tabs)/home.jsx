import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecipeCard from '../../components/RecipeCard';

import { images } from '../../constants/images';
import { categories } from '../../data/categories';
import { getAllRecipes } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data: recipes, reFetch } = useAppwrite(getAllRecipes);
    const navigation = useNavigation();

    const onRefresh = async () => { //Refreshing action for new recipes
        setRefreshing(true);
        await reFetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-background h-full'>
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <RecipeCard
                        recipeInfo={item}
                        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} />
                )}
                ListHeaderComponent={() => (
                    <View className='mt-12 px-6 space-y-3'>
                        <View className='justify-between items-center flex-row mb-6'>
                            <View>
                                <Text className='text-[15px] font-msemi text-gray-200'>Welcome back,</Text>
                                <Text className='text-[26px] font-mbold text-white'>Bruno! 👋</Text>
                            </View>
                            <View>
                                <Image
                                    source={images.logo}
                                    className='w-10 h-10'
                                    resizeMode='contain' />
                            </View>
                        </View>
                        <FlatList
                            className="flex-row mt-4"
                            horizontal={true}
                            data={categories}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity className="mr-3 pb-5">
                                    <Text className="text-gray-300 border-gray-300 border py-1.5 px-3.5 text-[20px] font-mmedium rounded-full">{item}</Text>
                                </TouchableOpacity>
                            )} />
                        <Text className='text-[23px] font-msemi text-white mb-5'>Discover recipes</Text>
                    </View>
                )}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Home