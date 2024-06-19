import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPswd, setShowPswd] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-[20px] text-gray-200 font-msemi">{title}</Text>

            <View className="w-full h-[65px] px-4 bg-[#181E2D] 
            rounded-[10px] items-center focus:border-secondary_green">
                <TextInput
                    className="flex-1 text-white font-mregular text-[20px]"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#ADADAD"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPswd}
                />
            </View>
        </View>
    )
}

export default FormField