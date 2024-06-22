import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import RecipeDetail from './RecipeDetail';

import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "MavenPro-Regular": require("../assets/fonts/MavenPro-Regular.ttf"),
        "MavenPro-Medium": require("../assets/fonts/MavenPro-Medium.ttf"),
        "MavenPro-SemiBold": require("../assets/fonts/MavenPro-SemiBold.ttf"),
        "MavenPro-Bold": require("../assets/fonts/MavenPro-Bold.ttf"),
        "MavenPro-ExtraBold": require("../assets/fonts/MavenPro-ExtraBold.ttf"),
        "MavenPro-Black": require("../assets/fonts/MavenPro-Black.ttf"),
    })

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;

    return (
        <GlobalProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack>
        </GlobalProvider>
    )
}

export default RootLayout