import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { IconButton, Modal, Portal } from 'react-native-paper';

type Props = {
    visibleCheckInHistoryPopup: boolean;
    setVisibleCheckInHistoryPopup: (value: boolean) => void;
    checkInTimeList: string[];
    handleCloseCheckInPopup: () => void;
};

const CheckInHistoryModal = (props: Props) => {
    const {
        visibleCheckInHistoryPopup,
        setVisibleCheckInHistoryPopup,
        checkInTimeList,
        handleCloseCheckInPopup,
    } = props;

    return (
        <Portal>
            <Modal
                visible={visibleCheckInHistoryPopup}
                onDismiss={() => setVisibleCheckInHistoryPopup(false)}>
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
                            width: '84%',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            gap: 5,
                            // marginVertical: 10,
                            // paddingVertical: 25,
                            // borderTopRightRadius: 20,
                            // borderTopLeftRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontWeight: '700',
                            }}>
                            Lịch sử điểm danh
                        </Text>

                        <View
                            style={{
                                width: '100%',
                                // flexDirection: 'row',
                                marginVertical: 5,
                            }}>
                            {checkInTimeList.map((attendance, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconButton
                                            style={{
                                                height: 20,
                                                width: 20,
                                            }}
                                            icon={'account-check-outline'}
                                            size={20}
                                            // onPress={() => {
                                            //     handleNavigateFaceCheckScreen();
                                            // }}
                                        />
                                        <Text>{attendance}</Text>
                                    </View>
                                );
                            })}
                        </View>

                        <View
                            style={{
                                width: '100%',
                                height: 40,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleCloseCheckInPopup();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '30%',
                                    height: '100%',
                                    backgroundColor: 'rgba(234, 246, 255, 1)',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: '#005BA5',
                                        fontSize: 14,
                                    }}>
                                    {'Đóng'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

export default CheckInHistoryModal;
