import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const WelcomeModal = ({ visible, pressStart }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={pressStart}
        >
            <View className="h-full justify-center items-center m-auto w-full bg-slate-150">
                <View className="w-[345px] h-fit bg-gray-300 pt-6 pb-2 px-7 rounded-lg">
                    <View>
                        <Text className="font-mbold text-2xl text-center mb-5">Welcome to Kulinary!</Text>
                        <Text className="font-mmedium text-[16px] text-start mb-3">This is an Android App made it with the
                            objective to make a life-easier and and improve healthy cooking knowledge.</Text>
                        <Text className="font-mmedium text-[16px] text-start mb-3">
                            Kulinary provides you a way to make your diet better with a large amount of fast and simple recipes for everyone.
                        </Text>
                        <Text className="font-mmedium text-[16px] text-start mb-5">
                            Discover all the recipes navigating inside the aplication and see the features inside the application.
                        </Text>
                        <Text className="font-msemi text-[17px] text-start mb-5">
                            Enjoy!
                        </Text>
                    </View>
                    <TouchableOpacity
                        className="bg-secondary_green py-2.5 rounded-md"
                        onPress={pressStart}
                    >
                        <Text className="font-msemi text-center text-[19px]">Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default WelcomeModal;