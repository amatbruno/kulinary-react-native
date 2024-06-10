import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-3xl">THIS IS KULINARY MOBILE APP</Text>
            <StatusBar style="auto" />
            <Link href="/profile" className='text-blue-700'>Go to user profile</Link>
        </View>
    );
}