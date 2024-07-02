import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';

import ThemeContext from '../context/ThemeContext';

const EditModal = ({ visible, onClose, onSave, field, value, lines }) => {
    const [inputValue, setInputValue] = useState(value);

    const { theme } = useContext(ThemeContext);

    // Actualizar el estado del input cuando el valor inicial cambie
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-gray-900 px-6">
                <View className="bg-white p-4 rounded-lg w-full">
                    <Text className="text-xl font-mbold mb-3">Change {field}</Text>
                    <View className="border-2 rounded-lg border-secondary_green mb-4">
                        <TextInput
                            style={{ color: theme.placeholder }}
                            className="px-1 text-[16px] font-semibold"
                            value={inputValue}
                            onChangeText={setInputValue}
                            cursorColor="#D6FC51"
                            numberOfLines={field == 'Biography' ? 3 : 1}
                            multiline={true}
                        />
                    </View>

                    <View className="flex-row justify-between mt-1">
                        <TouchableOpacity
                            className="bg-gray-300 px-6 py-2.5 justify-center rounded-md"
                            onPress={onClose}
                        >
                            <Text className="font-msemi text-[16px]">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-secondary_green px-6 font-mregular py-2.5 justify-center rounded-md"
                            onPress={() => {
                                onSave(inputValue);
                                onClose();
                            }}
                        >
                            <Text className="text-[16px] font-msemi">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditModal;
