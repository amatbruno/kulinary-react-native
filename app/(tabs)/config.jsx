import { View, Text, SafeAreaView, Switch } from 'react-native'
import React, { useState } from 'react';
import ConfigElement from '../../components/ConfigElement';

import SwitchToggle from 'react-native-switch-toggle';

import { icons } from '../../constants/icons';

const Config = () => {
    const [notification, setNotification] = useState(true);
    const [darkTheme, setDarkTheme] = useState(true);
    const toggleNotification = () => setNotification(previousState => !previousState);
    const toggleTheme = () => setDarkTheme(previousState => !previousState);

    return (
        <SafeAreaView className="h-full bg-background">
            <Text className="mt-24 text-white font-mbold text-2xl text-center mb-6">Configuration</Text>

            <View className="mx-5 mb-9">
                <Text className="text-white font-mbold text-xl">Notifications</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.bell} title="Enable notifications" />
                    <SwitchToggle
                        switchOn={notification}
                        onPress={toggleNotification}
                        circleColorOff="#11151E"
                        circleColorOn="#11151E"
                        backgroundColorOn="#D6FC51"
                        backgroundColorOff="#767577"
                        containerStyle={{
                            width: 55,
                            height: 25,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 15,
                        }}
                    />
                </View>
            </View>

            <View className="mx-5 mb-9">
                <Text className="text-white font-mbold text-xl">Theme</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.moon} title="Dark mode" />
                    <SwitchToggle
                        switchOn={darkTheme}
                        onPress={toggleTheme}
                        circleColorOff="#11151E"
                        circleColorOn="#11151E"
                        backgroundColorOn="#D6FC51"
                        backgroundColorOff="#767577"
                        containerStyle={{
                            width: 55,
                            height: 25,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 20,
                            height: 20,
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
            </View>

        </SafeAreaView>
    )
}

export default Config