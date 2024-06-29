import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { useGlobalContext } from '../../context/GlobalProvider';

import { icons } from '../../constants/icons';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    return (
        <SafeAreaView className="bg-background h-full">
            <View className="items-end mt-16 mx-auto">
                <Image
                    className="w-40 h-40 rounded-full"
                    source={{ uri: user?.avatar }} />
                <TouchableOpacity
                    className="bg-secondary_green rounded-full p-2 mt-[-45px]">
                    <Image
                        className="w-8 h-8"
                        source={icons.camera}
                        resizeMode='cover' />
                </TouchableOpacity>
            </View>
            <View>
                <View className="mx-7 border-b border-gray-400">
                    <Text className="font-msemi text-[15px] text-gray-400 mt-4">Username</Text>
                    <Text className="font-msemi text-[15px] text-gray-400 mt-4">{user.username}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile