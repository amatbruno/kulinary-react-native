import { View, Text } from 'react-native'
import React from 'react'

export default function InfoTarget({ value1, value2 }) {
    return (
        <View className="flex-col items-center gap-2.5 px-5">
            <Text className="text-[18px] font-mmedium text-secondary_beix">{value1}</Text>
            <Text className="text-[13px] text-gray-200 font-mregular">{value2}</Text>
        </View>
    )
}