import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants/icons';


const TabIcon = ({ icon, color, name, focused }) => {
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
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#D6FC51',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#11151E',
                        borderTopWidth: 1,
                        borderTopColor: '#11151E',
                        height: 65
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