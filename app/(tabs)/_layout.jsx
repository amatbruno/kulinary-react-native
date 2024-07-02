import { View, Text, Image } from 'react-native';
import React, { useContext } from 'react';
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants/icons';

import ThemeContext from '../../context/ThemeContext';

const TabIcon = ({ icon, color, name, focused }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View className='items-center justify-center gap-1'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-msemi text-secondary_green' : 'font-mregular text-[#CDCDE0]'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: theme.activeColor,
                    tabBarInactiveTintColor: theme.inactiveColor,
                    tabBarStyle: {
                        backgroundColor: theme.background,
                        borderTopWidth: 1,
                        borderTopColor: theme.borderColor,
                        height: 66
                    }
                }}
            >
                <Tabs.Screen name='home' options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name='Home'
                            focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name='profile' options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name='Profile'
                            focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name='saved' options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.saved}
                            color={color}
                            name='Saved'
                            focused={focused}
                        />
                    )
                }} />
                <Tabs.Screen name='config' options={{
                    title: 'Options',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.config}
                            color={color}
                            name='Options'
                            focused={focused}
                        />
                    )
                }} />
            </Tabs>
        </>
    )
}

export default TabsLayout