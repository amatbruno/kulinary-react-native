import { View, Text, SafeAreaView, Switch } from 'react-native'
import React, { useContext } from 'react';
import ConfigElement from '../../components/ConfigElement';

import { icons } from '../../constants/icons';
import ThemeContext from '../../context/ThemeContext';

import { darkTheme } from '../../themes/themes';

const Config = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }} className="h-full px-5">
            <Text style={{ color: theme.text }} className="mt-24 text-white font-mbold text-2xl text-center mb-6">Configuration</Text>

            <View className="mb-9">
                <Text style={{ color: theme.text }} className="text-white font-mbold text-xl">Notifications</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement textColor={theme.text} icon={icons.bell} title="Enable notifications" color="#D9D9D9" />
                    <Switch />
                </View>
            </View>

            <View className="mb-9">
                <Text style={{ color: theme.text }} className="font-mbold text-xl">Theme</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.moon} title="Dark mode" color="#D9D9D9" textColor={theme.text} />
                    <Switch
                        value={theme === darkTheme}
                        onValueChange={toggleTheme}
                        trackColor={{false: '#767577', true: '#D6FC51'}}
                        thumbColor={'#D6FC51'}
                        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                </View>
            </View>

            <View className="mb-9">
                <Text style={{ color: theme.text }} className="text-white font-mbold text-xl">Others</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.language} title="Change language" textColor={theme.text} />
                    {/* HERE GOES SELECT LANGUAGE LIST */}
                </View>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.terms} title="Terms of use" textColor={theme.text} />
                    {/* HERE GOES TERMS SECTION */}
                </View>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.key} title="Update password" textColor={theme.text} />
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