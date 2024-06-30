import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

const EditModal = ({ visible, onClose, onSave, field, value }) => {
    const [inputValue, setInputValue] = useState(value);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-gray-900 px-6">
                <View className="bg-white p-4 rounded-lg w-full">
                    <Text className="text-lg font-bold mb-3">Change {field}</Text>
                    <View className="border-2 border-gray-400 rounded-lg focus:border-secondary_green mb-4">
                        <TextInput
                            className="px-1"
                            value={inputValue}
                            onChangeText={setInputValue}
                        />
                    </View>

                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="bg-gray-300 px-4 font-mregular py-2 justify-center rounded-md"
                            onPress={onClose}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-secondary_green px-4 font-mregular py-2 justify-center rounded-md"
                            onPress={() => {
                                onSave(inputValue);
                                onClose();
                            }}
                        >
                            <Text className="text-white">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditModal;
