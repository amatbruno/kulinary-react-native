import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecipeCard from '../../components/RecipeCard';

import ThemeContext from '../../context/ThemeContext';
import { useGlobalContext } from '../../context/GlobalProvider';

import { images } from '../../constants/images';
import { categories } from '../../data/categories';
import { getAllRecipes } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useNavigation } from '@react-navigation/native';
import WelcomeModal from '../../components/WelcomeModal';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { data: recipes, reFetch } = useAppwrite(getAllRecipes);
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const { user, isLoggedIn, isLoading } = useGlobalContext();

    const onRefresh = async () => { //Refreshing method for new recipes
        setRefreshing(true);
        await reFetch();
        setRefreshing(false);
    }

    useEffect(() => {
        if (!isLoggedIn) {
            setShowModal(true);
        }
    }, [isLoggedIn]);

    return (
        <SafeAreaView
            style={{ backgroundColor: theme.background }}
            className='h-full'>
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
                                <Text style={{ color: theme.text }} className='text-[15px] font-msemi'>Welcome back,</Text>
                                {isLoading ? (
                                    <Text style={{ color: theme.text }} className='text-[26px] font-mbold'>Loading...</Text>
                                ) : user ? (
                                    <Text style={{ color: theme.text }} className='text-[26px] font-mbold'>{user?.username}! 👋</Text>
                                ) : (
                                    <Text style={{ color: theme.text }} className='text-[26px] font-mbold'>Loading...</Text>
                                )}
                            </View>
                            <View>
                                <Image
                                    source={images.logo}
                                    className='w-16 h-16'
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
                                    <Text
                                        style={{ color: theme.text, borderColor: theme.borderCategories }}
                                        className="border-gray-300 border-2 py-1.5 px-3.5 text-[20px] font-mmedium rounded-full">{item}</Text>
                                </TouchableOpacity>
                            )} />
                        <Text style={{ color: theme.text }} className='text-[23px] font-msemi mb-5'>Discover recipes</Text>
                    </View>
                )}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
            />
            <WelcomeModal pressStart={() => setShowModal(false)} username={user?.username} visible={showModal} />
        </SafeAreaView>
    )
}

export default Home