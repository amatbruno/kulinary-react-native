import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants/icons'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPswd, setShowPswd] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-[20px] text-gray-200 font-msemi">{title}</Text>

            <View className="border-2 border-transparent transition-all w-full h-[65px] px-4 bg-[#181E2D] 
            rounded-[10px] items-center focus:border-secondary_green flex-row">
                <TextInput
                    className="flex-1 text-white font-mregular text-[20px] w-full"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#ADADAD"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPswd}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPswd(!showPswd)} >
                        <Image source={!showPswd ? icons.eye : icons.eyeClosed}
                            className="w-6 h-6"
                            resizeMode="contain" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField