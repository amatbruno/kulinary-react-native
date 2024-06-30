import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary_beix rounded-[20px] min-h-[57px] 
            justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}>
            <Text className={`text-[20px] font-msemi ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton