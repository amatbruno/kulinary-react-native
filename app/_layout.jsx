import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

import GlobalProvider from '../context/GlobalProvider';
import { ThemeProvider } from '../context/ThemeContext';

SplashScreen.preventAutoHideAsync();

console.log = () => { };
console.warn = () => { };
console.error = () => { };

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
        <ThemeProvider>
            <GlobalProvider>
                <Stack>
                    <Stack.Screen name='index' options={{ headerShown: false }} />
                    <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                    <Stack.Screen name='RecipeDetail' options={{ headerShown: false }} />
                </Stack>
            </GlobalProvider>
        </ThemeProvider>
    )
}

export default RootLayout