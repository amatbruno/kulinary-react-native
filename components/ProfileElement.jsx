import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const ProfileElement = ({ title, data, icon, editIcon, onEdit }) => {
    return (
        <View className="mx-7 mt-7 flex-row items-center pb-4 mb-1 border-b border-gray-700">
            <Image
                className="w-7 h-7 mr-7"
                resizeMode='cover'
                tintColor="#9ca3af"
                source={icon} />
            <View>
                <Text className="font-msemi text-[13px] text-gray-400">{title}</Text>
                <Text className="font-msemi text-[18px] text-gray-200 w-[230px] pt-1">{data}</Text>
            </View>
            {editIcon && (
                <TouchableOpacity
                    onPress={onEdit}
                >
                    <Image
                        source={editIcon}
                        className="w-6 h-6 ml-5"
                        resizeMode='cover'
                        tintColor="#9ca3af"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProfileElement;
