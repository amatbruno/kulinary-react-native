import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import TabsLayout from './(tabs)/_layout';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabsLayout} />
        </Stack.Navigator>
    );
};

export default AppStack