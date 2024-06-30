import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { useGlobalContext } from '../../context/GlobalProvider';

import { icons } from '../../constants/icons';

import ProfileElement from '../../components/ProfileElement';
import CustomButton from '../../components/CustomButton';
import EditModal from '../../components/EditModal';

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const [newBiography, setNewBiography] = useState({
        biography: user.biography
    });
    const [newEmail, setNewEmail] = useState({
        email: user.email
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const handleUpdateField = (field, value) => {
        setForm(prevForm => ({ ...prevForm, [field]: value }));
        setUser(prevUser => ({ ...prevUser, [field]: value }));
    };

    const handleEdit = (field, value) => {
        setCurrentField(field);
        setCurrentValue(value);
        setModalVisible(true);
    };

    return (
        <SafeAreaView className="bg-background h-full">
            <View className="items-end mt-16 mb-5 mx-auto">
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
                icon={icons.filledUser} />
            <ProfileElement
                title="Email address"
                data={user.email}
                icon={icons.email}
                editIcon={icons.pencil}
                onEdit={() => handleEdit('email', user.email)}
            />
            <ProfileElement
                title="Biography"
                data={user.biography ? user.biography : 'Customize your profile by writing a detailed biography about yourself.'}
                icon={icons.info}
                editIcon={icons.pencil}
                onEdit={() => handleEdit('biography', user.biography)}
            />

            <CustomButton
                containerStyles="mt-10 mx-7"
                title="Update profile"
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
