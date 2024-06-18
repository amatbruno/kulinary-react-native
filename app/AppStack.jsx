import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import RecipeDetail from './(tabs)/recipe-detail';
import TabsLayout from './(tabs)/_layout';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabsLayout} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        </Stack.Navigator>
    );
};

export default AppStack