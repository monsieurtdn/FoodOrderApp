import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

type Props = {
    visibleUnregister: boolean;
    setVisibleUnregister: (value: React.SetStateAction<boolean>) => void;
    handleConfirmUnregister: () => void;
    handleCloseUnRegisterModal: () => void;
};

const UnregisterModal = (props: Props) => {
    const {
        visibleUnregister,
        setVisibleUnregister,
        handleConfirmUnregister,
        handleCloseUnRegisterModal,
    } = props;
    return (
        <Portal>
            <Modal
                visible={visibleUnregister}
                onDismiss={() => setVisibleUnregister(false)}>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            // height: '30%',
                            width: '60%',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            // marginVertical: 10,
                            // paddingVertical: 25,
                            // borderTopRightRadius: 20,
                            // borderTopLeftRadius: 20,
                        }}>
                        <View
                            style={{
                                width: '100%',
                                // height: 80,
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                marginVertical: 10,
                                // backgroundColor: 'red',
                            }}>
                            <Image
                                source={require('../../../../../../image/unregister.png')}
                                style={{
                                    // height: 150,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                }}
                            />
                            <Text
                                style={{
                                    fontWeight: '500',
                                    marginVertical: 5,
                                }}>
                                Hủy đăng ký nhận diện?
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    handleConfirmUnregister();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '80%',
                                    height: 40,
                                    backgroundColor: 'rgba(255, 204, 199, 1)',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: 'rgba(245, 34, 45, 1)',
                                        fontSize: 14,
                                    }}>
                                    {'Xác nhận'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleCloseUnRegisterModal();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '80%',
                                    height: 40,
                                    // backgroundColor: 'rgba(234, 246, 255, 1)',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        // color: '#005BA5',
                                        fontSize: 14,
                                    }}>
                                    {'Quay lại'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

// const styles = StyleSheet.create({
//     buttonText: {
//         color: '#fff',
//         fontSize: 14,
//         // fontWeight: '500'
//     },
// });

export default UnregisterModal;
