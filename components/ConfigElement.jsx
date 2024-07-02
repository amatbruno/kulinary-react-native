import { View, Text, Image } from 'react-native'
import React from 'react';

const ConfigElement = ({ icon, title, color = '#D9D9D9', textColor = 'white' }) => {
    return (
        <View className="flex-row justify-start items-center gap-5">
            <Image
                source={icon}
                style={{ tintColor: color }}
                className="w-7 h-7"
                resizeMethod="cover"
            />
            <Text style={{ color: textColor }} className="text-[18px] font-mregular">
                {title}
            </Text>
        </View>
    );
};

export default ConfigElement;