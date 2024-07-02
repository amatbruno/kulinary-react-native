import { View, Text } from 'react-native';
import React, { useContext } from 'react';

import ThemeContext from '../context/ThemeContext';

export default function InfoTarget({ value1, value2 }) {
    const { theme } = useContext(ThemeContext);

    return (
        <View className="flex-col items-center gap-2.5 px-5">
            <Text style={{ color: theme.recipeInfoText }} className="text-[18px] font-mmedium">{value1}</Text>
            <Text style={{ color: theme.text }} className="text-[13px] font-mregular">{value2}</Text>
        </View>
    )
}