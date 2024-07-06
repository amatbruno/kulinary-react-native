import { View, Text, SafeAreaView, Switch, Modal, TouchableOpacity, TextInput, Alert, Image } from 'react-native'
import React, { useContext, useState } from 'react';
import ConfigElement from '../../components/ConfigElement';

import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';

import { icons } from '../../constants/icons';
import ThemeContext from '../../context/ThemeContext';
import { useGlobalContext } from '../../context/GlobalProvider';

import { darkTheme } from '../../themes/themes';
import { updateUserPsswd } from '../../lib/appwrite';

const Config = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, fetchUser, handleLogout } = useGlobalContext();

    const [isVisible, setIsVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const handleUpdatePassword = async () => {
        try {
            await updateUserPsswd(currentPassword, newPassword);
            await fetchUser();
            Alert.alert('Warning!', 'Your session will be restarted after password changes', [
                {
                    text: 'Accept', onPress: () => {
                        handleLogout();
                        Updates.reloadAsync();
                    }
                }
            ]);
        } catch (error) {
            Alert.alert('Warning!', error.message);
            console.error('Error in handleUpdatePassword:', error.message);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }} className="h-full px-5">
            <Text style={{ color: theme.text }} className="mt-24 text-white font-mbold text-2xl text-center mb-6">Configuration</Text>

            <View className="mb-9 mt-5">
                <Text style={{ color: theme.text }} className="font-mbold text-xl">Theme</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.moon} title="Dark mode" color="#D9D9D9" textColor={theme.text} />
                    <Switch
                        value={theme === darkTheme}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: '#D6FC51' }}
                        thumbColor={'#D6FC51'}
                        style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                    />
                </View>
            </View>

            <View className="mb-9">
                <Text style={{ color: theme.text }} className="text-white font-mbold text-xl">Account</Text>

                {/* UPDATE PASSWORD SECTION */}
                <TouchableOpacity
                    className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2"
                    onPress={() => setIsVisible(true)}
                >
                    <ConfigElement
                        icon={icons.key}
                        title="Update password"
                        textColor={theme.text}
                    />
                    <Image
                        source={icons.arrowLeft}
                        tintColor={theme.tintColor}
                        className="w-5 h-5 rotate-180"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                        <ConfigElement icon={icons.terms} title="Terms of use" textColor={theme.text} />
                        <Image
                            source={icons.arrowLeft}
                            tintColor={theme.tintColor}
                            className="w-5 h-5 rotate-180"
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View className="mb-9">
                <Text style={{ color: theme.text }} className="text-white font-mbold text-xl">Danger zone</Text>
                <View className="flex-row justify-between items-center mt-2 rounded-lg py-3 px-2">
                    <ConfigElement icon={icons.userDelete} title="Delete account" textColor="#FF4141" color='#FF4141' />
                    {/* HERE GOES TERMS SECTION */}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-gray-900 px-6">
                    <View className="bg-white p-4 rounded-lg w-full">
                        <Text className="text-xl font-mbold mb-3">Change password</Text>
                        <View className="border-2 rounded-lg border-secondary_green mb-4">
                            <TextInput
                                placeholder="Current Password"
                                style={{ color: theme.placeholder }}
                                className="px-1 text-[16px] font-semibold"
                                onChangeText={(passwd) => setCurrentPassword(passwd)}
                                cursorColor="#D6FC51"
                                secureTextEntry={true}
                            />
                        </View>
                        <View className="border-2 rounded-lg border-secondary_green mb-4">
                            <TextInput
                                placeholder="New Password"
                                style={{ color: theme.placeholder }}
                                className="px-1 text-[16px] font-semibold"
                                onChangeText={(passwd) => setNewPassword(passwd)}
                                cursorColor="#D6FC51"
                                secureTextEntry={true}
                            />
                        </View>
                        <View className="flex-row justify-between mt-1">
                            <TouchableOpacity
                                className="bg-gray-300 px-6 py-2.5 justify-center rounded-md"
                                onPress={() => setIsVisible(false)}
                            >
                                <Text className="font-msemi text-[16px]">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-secondary_green px-6 font-mregular py-2.5 justify-center rounded-md"
                                onPress={handleUpdatePassword}
                            >
                                <Text className="text-[16px] font-msemi">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Config