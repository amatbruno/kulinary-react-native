import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Button } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants/images';
import CustomButton from '../components/CustomButton';

export default function App() {
    return (
        <SafeAreaView className="bg-background h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <View className="flex-row items-center justify-center gap-3 mb-5">
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                        />
                        <Text className="font-mbextraold text-[52px] text-white">Kulinary</Text>
                    </View>
                    <Image
                        source={images.MainMenuImg}
                        resizeMode="contain"
                        className="w-[375px]"
                    />
                    <Text className="font-mbextraold w-[300px] text-center text-[38px] text-white mb-4">Perfect recipes for a <Text className="text-secondary_green">perfect day</Text></Text>
                    <Text className="font-mregular w-[290px] text-center text-[17px] text-white">Discover over a thousand healthy and easy recipes</Text>
                    <CustomButton title='Get Started' handlePress={() => router.push('/sign-in')} containerStyles='w-[305px] mt-7' />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#11151E' style='light' />
        </SafeAreaView>
    );
}