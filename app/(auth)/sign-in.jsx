import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants/images';
import FormField from '../../components/FormField';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full h-full justify-center px-6 my-6">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                        />
                        <Text className="font-mbextraold text-[52px] text-white">Kulinary</Text>
                    </View>
                    <Text className="font-mbold text-[30px] text-white mt-10">Sign in</Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e
                        })}
                        otherStyles='mt-10'
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles='mt-7'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn