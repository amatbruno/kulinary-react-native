import { View, Text, SafeAreaView, Switch, useColorScheme } from 'react-native'
import React, { useState } from 'react';
import ConfigElement from '../../components/ConfigElement';

import SwitchToggle from 'react-native-switch-toggle';

import { icons } from '../../constants/icons';

const Config = () => {
    // const [notification, setNotification] = useState(true);
    // const toggleNotification = () => setNotification(previousState => !previousState);
    const [darkTheme, setDarkTheme] = useState(true);
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const toggleTheme = () => setDarkTheme(previousState => !previousState);

    return (
        <SafeAreaView className="h-full bg-background dark:bg-neutral-50">
            <Text className="mt-24 text-white font-mbold text-2xl text-center mb-6">Configuration</Text>

            {/* <View className="mx-5 mb-9">
                <Text className="text-white font-mbold text-xl">Notifications</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.bell} title="Enable notifications" color="#D9D9D9" textColor="white" />
                    <SwitchToggle
                        switchOn={notification}
                        onPress={toggleNotification}
                        circleColorOff="#11151E"
                        circleColorOn="#11151E"
                        backgroundColorOn="#D6FC51"
                        backgroundColorOff="#767577"
                        containerStyle={{
                            width: 45,
                            height: 20,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                        }}
                    />
                </View>
            </View> */}

            <View className="mx-5 mb-9">
                <Text className="text-white font-mbold text-xl">Theme</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.moon} title="Dark mode" color="#D9D9D9" textColor="white" />
                    <SwitchToggle
                        value={colorScheme == 'dark'}
                        switchOn={darkTheme}
                        onPress={toggleTheme}
                        circleColorOff="#11151E"
                        circleColorOn="#11151E"
                        backgroundColorOn="#D6FC51"
                        backgroundColorOff="#767577"
                        containerStyle={{
                            width: 45,
                            height: 20,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 15,
                        }}
                    />
                </View>
            </View>

            <View className="mx-5 mb-9">
                <Text className="text-white font-mbold text-xl">Others</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.language} title="Change language" />
                    {/* HERE GOES SELECT LANGUAGE LIST */}
                </View>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.terms} title="Terms of use" />
                    {/* HERE GOES TERMS SECTION */}
                </View>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.key} title="Update password" />
                    {/* HERE GOES TERMS SECTION */}
                </View>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.userDelete} title="Delete account" textColor="#FF4141" color='#FF4141' />
                    {/* HERE GOES TERMS SECTION */}
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Config