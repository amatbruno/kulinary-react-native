import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';

import { images } from '../../constants/images';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite';

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'You need to fill all the fields');
        }

        setIsSubmitting(true)

        try {
            const result = await createUser(
                form.email,
                form.password,
                form.username,);

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
                <View className="w-full min-h-[92vh] justify-center px-6 my-6">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                        />
                        <Text className="font-mbextraold text-[52px] text-white">Kulinary</Text>
                    </View>
                    <Text className="font-mbold text-[30px] text-white mt-7">Sign up</Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({
                            ...form,
                            username: e
                        })}
                        otherStyles='mt-7'
                        placeholder="Enter your username"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e
                        })}
                        otherStyles='mt-5'
                        keyboardType="email-address"
                        placeholder="Enter your email address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e
                        })}
                        otherStyles='mt-5'
                        placeholder="Enter your password"
                    />

                    <CustomButton
                        title='Sign Up'
                        handlePress={submit}
                        containerStyles='mt-12'
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center items-center pt-7 flex-row gap-1.5">
                        <Text className="text-gray-200 text-[16px] font-mmedium">Already have an account?</Text>
                        <Link className="text-secondary_green text-[16px] font-mbold" href="/sign-in">Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp