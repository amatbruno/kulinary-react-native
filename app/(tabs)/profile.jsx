import { Image, SafeAreaView, Alert, TouchableOpacity, View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'expo-router';

import { useGlobalContext } from '../../context/GlobalProvider';
import ThemeContext from '../../context/ThemeContext';

import { userLogout, updateUserBio, getAccount } from '../../lib/appwrite';

import { icons } from '../../constants/icons';

import ProfileElement from '../../components/ProfileElement';
import EditModal from '../../components/EditModal';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const [newBiography, setNewBiography] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [loading, setLoading] = useState(false);

    const { theme } = useContext(ThemeContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setNewUsername(user.username || '');
            setNewEmail(user.email || '');
            setNewBiography(user.biography || '');
        } else {
            getAccount().then(setUser).catch(console.error);
        }
    }, [user, setUser]);

    const handleUpdateField = async (field, value) => {
        setLoading(true);
        try {
            if (field === 'biography') {
                await updateUserBio(user.$id, value);
                setNewBiography(value);
                setUser(prevUser => ({ ...prevUser, biography: value }));
            }
            Alert.alert('Success', `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`);
        } catch (error) {
            console.error(`Error updating ${field}:`, error.message);
            Alert.alert('Error', `Failed to update ${field}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (field, value) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalVisible(true);
    };

    const logOut = async () => {
        await userLogout();
        setUser(null);
        setIsLoggedIn(false);

        router.replace('/sign-in');
    };

    if (!user) {
        return (
            <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }} className="h-full">
                <Text style={{ color: theme.text }}>User not logged in</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }} className="h-full">
            <View className="mt-16 items-end mx-7">
                <TouchableOpacity onPress={logOut}>
                    <Image
                        source={icons.logout}
                        className="w-7 h-7"
                        tintColor="#BF0000"
                    />
                </TouchableOpacity>
            </View>
            <View className="items-end mt-5 mb-7 mx-auto">
                <Image
                    className="w-40 h-40 rounded-full"
                    source={{ uri: user?.avatar }}
                />
                <TouchableOpacity className="bg-secondary_green rounded-full p-2 mt-[-45px]">
                    <Image
                        className="w-8 h-8"
                        source={icons.camera}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <ProfileElement
                title="Username"
                data={newUsername}
                icon={icons.filledUser}
            />
            <ProfileElement
                title="Email address"
                data={newEmail}
                icon={icons.email}
            />
            <ProfileElement
                title="Biography"
                data={newBiography || 'Customize your profile with short biography or state.'}
                icon={icons.info}
                editIcon={icons.pencil}
                onEdit={() => handleEdit('biography', newBiography)}
            />
            <EditModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={(value) => handleUpdateField(currentField, value)}
                field={currentField}
                value={currentValue}
            />
        </SafeAreaView>
    );
};

export default Profile;
