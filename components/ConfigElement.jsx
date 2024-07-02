import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ConfigElement({ icon, title }) {
    return (
        <View className="flex-row justify-start items-center  gap-5">
            <Image
                source={icon}
                tintColor="#D9D9D9"
                className="w-7 h-7"
                resizeMethod='cover' />
            <Text className="text-white text-[18px] font-mregular">{title}</Text>
        </View>
    )
}