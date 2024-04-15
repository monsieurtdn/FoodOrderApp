import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Switch from '@meksiabdou/react-native-switch';
// import { Switch } from 'react-native-switch';
import { ProgressBar } from 'react-native-paper';
import Utils, { KeyboardDismiss } from 'common/Utils';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import {
    setZoneSelected,
    updateRoomStatusByFloor,
} from 'store/slice/HotelSlice';
import { InspectedStatus, RoomStatusCode } from 'common/define-types';
import { showMessage } from 'react-native-flash-message';

const SwitchCircle = () => {
    const CIRCLE_SIZE = 20;
    return (
        <View
            style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
                backgroundColor: 'white',
            }}
        />
    );
};
export const ZoneHeaderContent = () => {
    const selectZones = useSelectorRoot(state => state.hotel.floors);
    const selectZoneSelected = useSelectorRoot(
        state => state.hotel.floorSelected,
    );
    const foundZoneSelected = selectZones.find(
        zone => zone.floor === selectZoneSelected?.floor,
    );
    console.log(selectZoneSelected);
    const selectRooms = useSelectorRoot(state => state.hotel.rooms);
    const isAllCleaned = selectRooms
        .filter(room => room.floorNo === selectZoneSelected?.floor)
        .every(
            room =>
                room.roomStatusCode === RoomStatusCode.VC ||
                room.roomStatusCode === RoomStatusCode.OC,
        );
    const isAllInspected = selectRooms
        .filter(room => room.floorNo === selectZoneSelected?.floor)
        .every(room => room.vci === InspectedStatus.TRUE);
    const dispatch = useDispatchRoot();
    const handleUpdateFloor = (status: boolean) => {
        if (selectZoneSelected) {
            if (isAllInspected) {
                showMessage({
                    message: `${
                        `Floor ${selectZoneSelected?.floor}` ?? 'Tầng'
                    } đã được kiểm tra`,
                    type: 'warning',
                });
                return;
            }
            dispatch(
                updateRoomStatusByFloor({
                    id: selectZoneSelected.floor,
                    status: status ? 0 : 1,
                }),
            );
        }
    };
    return (
        <TouchableWithoutFeedback onPress={KeyboardDismiss}>
            <View style={styles.container}>
                <View style={styles.zoneHeaderWrapper}>
                    <SelectDropdown
                        data={selectZones ?? []}
                        defaultButtonText={`Floor ${selectZoneSelected?.floor}`}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            dispatch(setZoneSelected(selectedItem));
                        }}
                        buttonStyle={styles.selectDropdown}
                        // search={false}
                        renderDropdownIcon={() => (
                            <Image
                                source={require('../../../../image/icon/arrow-down.png')}
                            />
                        )}
                        onChangeSearchInputText={() => {}}
                        buttonTextAfterSelection={selectedItem => {
                            return `Floor ${selectedItem.floor}`;
                        }}
                        rowTextForSelection={item => {
                            console.log(item);

                            return `Floor ${item.floor}`;
                        }}
                        rowStyle={{ backgroundColor: 'white' }}
                        dropdownStyle={{ borderRadius: 6 }}
                        selectedRowStyle={{ backgroundColor: '#357edd40' }}
                        buttonTextStyle={{
                            fontSize: 22,
                            fontWeight: '600',
                        }}
                    />
                    <View style={{ width: 150 }}>
                        {/* <Switch
                            value={isCleaned}
                            onValueChange={() => setIsCleaned(prev => !prev)}
                            activeText="On"
                            inActiveText="Off"
                            backgroundInactive={'rgba(255, 77, 79, 1)'}
                            switchLeftPx={3}
                            switchRightPx={3}
                            renderInsideCircle={() => <SwitchCircle />}
                            // circleChildrenInActive={<SwitchCircle />}
                            circleActiveColor="#249c00"
                            circleInActiveColor="rgba(255, 77, 79, 1)"
                        /> */}
                        <Switch
                            value={isAllCleaned}
                            onValueChange={() =>
                                handleUpdateFloor(!isAllCleaned)
                            }
                            width={150}
                            activeText="Floor Cleaned"
                            inActiveText="Floor Dirty"
                            backgroundInActive={'rgba(255, 77, 79, 1)'}
                            switchPaddingLeft={3}
                            switchPaddingRight={3}
                            circleChildrenActive={<SwitchCircle />}
                            circleChildrenInActive={<SwitchCircle />}
                            circleActiveColor="#249c00"
                            circleInActiveColor="rgba(255, 77, 79, 1)"
                            textStyle={{ fontSize: Utils.getFontSize(16) }}
                        />
                    </View>
                </View>
                <View>
                    <ProgressBar
                        color="#389E0D"
                        progress={
                            foundZoneSelected
                                ? (foundZoneSelected.oc +
                                      foundZoneSelected.vc) /
                                  (foundZoneSelected.oc +
                                      foundZoneSelected.od +
                                      foundZoneSelected.vc +
                                      foundZoneSelected.vd)
                                : 0
                        }
                        style={styles.zoneProgress}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        gap: 10,
        // backgroundColor: 'white',
    },
    zoneHeaderWrapper: {
        paddingRight: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectDropdown: {
        backgroundColor: 'white',
        width: 120,
    },
    zoneProgress: {
        height: 8,
        borderRadius: 2,
    },
});
