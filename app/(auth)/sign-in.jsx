import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import { images } from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { signIn } from '../../lib/appwrite';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'You need to fill all the fields');
        }

        setIsSubmitting(true)

        try {
            const result = await signIn(
                form.email,
                form.password);

            router.replace('/home');

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView>
                <View className="w-full min-h-[90vh] justify-center px-6 my-6">
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
                        placeholder="Enter your email"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles='mt-7'
                        placeholder="Enter your password"
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        containerStyles='mt-14'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center items-center pt-7 flex-row gap-1.5">
                        <Text className="text-gray-200 text-[16px] font-mmedium">Don't have an account?</Text>
                        <Link className="text-secondary_green text-[16px] font-mbold" href="/sign-up">Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn