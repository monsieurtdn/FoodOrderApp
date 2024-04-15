import { View, Text, Keyboard, TouchableOpacity } from 'react-native';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { IEmployeeOfOperator } from 'store/controls/AttendanceEpic';
import CTextAreaInput from 'components/CTextAreaInput';

type Props = {
    selectedEmployee?: IEmployeeOfOperator;
    visibleNotePopup: boolean;
    setVisibleNotePopup: (value: boolean) => void;
    note: string;
    setNote: (value: string) => void;
    handleCloseNotePopup: () => void;
    handleSaveNote: () => void;
};

const NoteModal = (props: Props) => {
    const {
        selectedEmployee,
        visibleNotePopup,
        setVisibleNotePopup,
        handleCloseNotePopup,
        note,
        setNote,
        handleSaveNote,
    } = props;
    return (
        <Portal>
            <Modal
                visible={visibleNotePopup}
                onDismiss={() => setVisibleNotePopup(false)}>
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
                            // marginVertical: 10,
                            // paddingVertical: 25,
                            // borderTopRightRadius: 20,
                            // borderTopLeftRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontWeight: '700',
                            }}>
                            {selectedEmployee?.name}
                        </Text>
                        <View
                            style={{
                                width: '100%',
                                height: 100,
                                marginTop: 10,
                            }}>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    marginBottom: 5,
                                }}>
                                Ghi chú:
                            </Text>
                            <CTextAreaInput
                                defaultValue={note}
                                onChangeText={x => setNote(x)}
                                placeholder="Tối đa 100 ký tự"
                                onSubmitEditing={Keyboard.dismiss}
                                numberOfLines={4}
                                maxLength={100}
                                // placeholderTextColor={'rgba(197, 229, 255, 1)'}
                            />
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleCloseNotePopup();
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
                                    {'Hủy'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleSaveNote();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '30%',
                                    height: '100%',
                                    backgroundColor: '#005BA5',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ color: '#fff', fontSize: 14 }}>
                                    {'Lưu'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

export default NoteModal;
