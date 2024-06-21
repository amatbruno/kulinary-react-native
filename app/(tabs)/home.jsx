import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants/images';
import { categories } from '../../data/categories';


const Home = () => {
    return (
        <SafeAreaView className='bg-background'>
            <FlatList
                data={[{ id: 1 }]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className='text-xl text-white'>{item.id}</Text>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-6 space-y-6'>
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
                    </View>
                )}
            />
            <FlatList
                className="flex-row mt-4 px-6"
                horizontal={true}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity className="mr-3 pb-5">
                        <Text className="text-white border-white border py-1.5 px-3.5 text-[20px] font-mmedium rounded-full">{item}</Text>
                    </TouchableOpacity>
                )} />

        </SafeAreaView>
    )
}

export default Home