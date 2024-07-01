import { Image, SafeAreaView, Alert, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { useGlobalContext } from '../../context/GlobalProvider';
import { updateUserEmail } from '../../lib/appwrite';
import { updateUserBio } from '../../lib/appwrite';

import { icons } from '../../constants/icons';

import ProfileElement from '../../components/ProfileElement';
import CustomButton from '../../components/CustomButton';
import EditModal from '../../components/EditModal';


const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const [newBiography, setNewBiography] = useState(user.biography);
    const [newEmail, setNewEmail] = useState(user.email);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateField = async (field, value) => {
        setLoading(true);
        try {
            if (field === 'biography') {
                await updateUserBio(user.$id, value)
                setNewBiography(value);
                setUser(prevUser => ({ ...prevUser, biography: value }));
            } else if (field === 'email') {
                await updateUserEmail(user.$id, value);
                setNewEmail(value);
                setUser(prevUser => ({ ...prevUser, email: value }));
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

    return (
        <SafeAreaView className="bg-background h-full">
            <View className="items-end mt-20 mb-5 mx-auto">
                <Image
                    className="w-40 h-40 rounded-full"
                    source={{ uri: user?.avatar }} />
                <TouchableOpacity
                    className="bg-secondary_green rounded-full p-2 mt-[-45px]">
                    <Image
                        className="w-8 h-8"
                        source={icons.camera}
                        resizeMode='cover' />
                </TouchableOpacity>
            </View>
            <ProfileElement
                title="Username"
                data={user.username}
                icon={icons.filledUser}
            />
            <ProfileElement
                title="Email address"
                data={newEmail}
                icon={icons.email}
                editIcon={icons.pencil}
                onEdit={() => handleEdit('email', newEmail)}
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
