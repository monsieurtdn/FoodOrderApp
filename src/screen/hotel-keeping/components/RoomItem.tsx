// import Switch from '@meksiabdou/react-native-switch';
import Utils from 'common/Utils';
import {
    CleanedStatus,
    IRoom,
    InspectedStatus,
    RoomStatusCode,
} from 'common/define-types';
import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Checkbox, IconButton, Switch } from 'react-native-paper';
import { updateRoomStatus } from 'store/slice/HotelSlice';
import { fetchLaundry } from 'store/slice/LaundrySlice';
import { fetchMinibarItems } from 'store/slice/MnibarSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';

interface IProps {
    room: IRoom;
    navigation: any;
}
export const RoomItem = ({ room, navigation }: IProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const isVc =
        room.roomStatusCode === RoomStatusCode.VC ||
        room.roomStatusCode === RoomStatusCode.VD;
    const isCleaned =
        room.roomStatusCode === RoomStatusCode.VC ||
        room.roomStatusCode === RoomStatusCode.OC;
    const isOcupied =
        room.roomStatusCode === RoomStatusCode.OC ||
        room.roomStatusCode === RoomStatusCode.OD;
    const isInspected = room.vci === InspectedStatus.TRUE || isOcupied;
    const isCompleted = isCleaned && isInspected;
    const dispatch = useDispatchRoot();
    const servicesToCall = [
        () => dispatch(fetchMinibarItems()),
        () => dispatch(fetchLaundry()),
    ];
    const selectIsSubmitting = useSelectorRoot(
        state => state.hotel.isSubmitting,
    );

    const handleUpdateRoomStatus = (status: boolean) => {
        if (isInspected) {
            showMessage({
                message: `Phòng ${room.roomNo} đã được kiểm tra`,
                type: 'warning',
            });
        } else {
            dispatch(
                updateRoomStatus({
                    id: room.roomNo,
                    inspected: isInspected
                        ? InspectedStatus.TRUE
                        : InspectedStatus.FALSE,
                    status: status
                        ? CleanedStatus.CLEANED
                        : CleanedStatus.DIRTY,
                }),
            );
        }
    };

    const handleUpdateRoomInspected = (inspected: boolean) => {
        if (inspected && !isCleaned) {
            showMessage({
                message: `Phòng ${room.roomNo} chưa được dọn dẹp`,
                type: 'warning',
            });
            return;
        }
        dispatch(
            updateRoomStatus({
                id: room.roomNo,
                status: isCleaned ? CleanedStatus.CLEANED : CleanedStatus.DIRTY,
                inspected: inspected
                    ? InspectedStatus.TRUE
                    : InspectedStatus.FALSE,
            }),
        );
    };

    return (
        <View
            style={[
                styles.room,
                isCompleted
                    ? styles.borderCompleted
                    : isCleaned || isInspected
                    ? styles.borderOcupied
                    : {},
            ]}>
            <Loader loading={selectIsSubmitting} />
            <TouchableWithoutFeedback
                onPress={() => {
                    if (isOcupied) {
                        navigation.navigate(Screen.HotelScreen.RoomDetail, {
                            room,
                        });
                        servicesToCall.forEach(service => {
                            service();
                        });
                    }
                }}>
                <View
                    style={[
                        styles.roomNameContainer,
                        isCompleted
                            ? styles.bgCompleted
                            : isCleaned || isInspected
                            ? styles.bgOcupied
                            : styles.bgIncompleted,
                    ]}>
                    <View style={styles.roomNameCheckbox}>
                        {Platform.OS === 'ios' ? (
                            <Checkbox.IOS
                                status={isChecked ? 'checked' : 'unchecked'}
                                color={isChecked ? '#1890FF' : 'gray'}
                                onPress={() => setIsChecked(prev => !prev)}
                            />
                        ) : (
                            <Checkbox.Android
                                status={isChecked ? 'checked' : 'unchecked'}
                                color={isChecked ? '#1890FF' : 'gray'}
                                onPress={() => setIsChecked(prev => !prev)}
                            />
                        )}
                        <Text style={styles.roomName}>{room.roomNo}</Text>
                    </View>
                    <Text
                        style={{
                            flexShrink: 1,
                            maxWidth: '50%',
                            fontSize: Utils.getFontSize(14),
                        }}>
                        {room.roomTypeCode ?? ''}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.roomWrapper}>
                {isVc ? (
                    <>
                        <View style={styles.roomSwitch}>
                            <Text style={styles.roomSwitch_Text}>VC</Text>
                            <Switch
                                value={isCleaned}
                                onValueChange={() =>
                                    handleUpdateRoomStatus(!isCleaned)
                                }
                                color={isCleaned ? '#1890FF' : '#BFBFBF'}
                                style={{ width: 40 }}
                            />
                            {/* <Switch
                                value={vc}
                                onValueChange={() => setVc(prev => !prev)}
                                backgroundInActive={'#BFBFBF'}
                                backgroundActive={'#1890FF'}
                                width={40}
                                circleSize={18}
                                activeText={''}
                                inActiveText={''}
                            /> */}
                        </View>
                        <View style={styles.roomSwitch}>
                            <Text style={styles.roomSwitch_Text}>
                                Inspected
                            </Text>
                            <Switch
                                value={isInspected}
                                onValueChange={() =>
                                    handleUpdateRoomInspected(!isInspected)
                                }
                                color={isInspected ? '#1890FF' : '#BFBFBF'}
                                style={{ width: 40 }}
                            />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.roomSwitch}>
                            <Text style={styles.roomSwitch_Text}>
                                {'OC (2)'}
                            </Text>
                            <Switch
                                value={isCleaned}
                                onValueChange={() =>
                                    handleUpdateRoomStatus(!isCleaned)
                                }
                                color={isCleaned ? '#1890FF' : '#BFBFBF'}
                                style={{ width: 40 }}
                            />
                        </View>
                        <View style={styles.roomSwitch}>
                            <Text
                                style={styles.guessName}
                                numberOfLines={3}>{`${room.firstName || ''} ${
                                room.lastName || ''
                            } `}</Text>
                            <IconButton
                                icon={'information-outline'}
                                iconColor="#1890FF"
                                style={{
                                    marginRight: 0,
                                    maxHeight: 22,
                                }}
                            />
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    room: {
        minHeight: 130,
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 6,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#bfbfbf',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    roomNameCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomNameContainer: {
        paddingVertical: 5,
        paddingRight: 10,
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bgCompleted: {
        backgroundColor: '#F6FFED',
    },
    bgOcupied: {
        backgroundColor: '#E6F7FF',
    },
    bgIncompleted: {
        backgroundColor: '#FFF1F0',
    },
    borderCompleted: {
        borderColor: '#389E0D',
        borderWidth: 2,
    },
    borderOcupied: {
        borderColor: '#1890FF',
        borderWidth: 2,
    },
    roomName: {
        fontSize: Utils.getFontSize(18),
        fontWeight: '600',
    },
    roomWrapper: {
        padding: 10,
        width: '100%',
        gap: 5,
        flex: 1,
    },
    guessName: {
        flexShrink: 1,
        maxWidth: '85%',
        color: '#1890FF',
        fontSize: Utils.getFontSize(14),
    },
    roomSwitch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomSwitch_Text: {
        fontSize: Utils.getFontSize(16),
    },
});
