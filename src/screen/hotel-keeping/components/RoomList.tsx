import CCheckBox from 'components/CCheckBox';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { Button } from 'react-native-paper';
import { RoomItem } from './RoomItem';
import Utils from 'common/Utils';
import { useSelectorRoot } from 'store/store';

interface IProps {
    navigation: any;
}
export const RoomList = ({ navigation }: IProps) => {
    const selectRooms = useSelectorRoot(state => state.hotel.rooms);
    const selectZoneSelected = useSelectorRoot(
        state => state.hotel.floorSelected,
    );
    const rooms = selectRooms.filter(
        room => room.floorNo === selectZoneSelected?.floor,
    );

    return (
        <View style={styles.container}>
            {/* <View style={styles.roomsAction}>
                <View style={{ flexShrink: 1 }}>
                    <CCheckBox
                        label={`Chọn ${rooms.length} phòng`}
                        onChangeValue={checked => console.log(checked)}
                        bgCheckColor="#1890FF"
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        mode="contained-tonal"
                        style={[styles.button]}
                        buttonColor="#FF4D4F"
                        textColor="white"
                        labelStyle={{ fontSize: Utils.getFontSize(14) }}>
                        Dirty
                    </Button>
                    <Button
                        mode="contained-tonal"
                        style={[styles.button]}
                        buttonColor="#1890FF"
                        textColor="white"
                        labelStyle={{ fontSize: Utils.getFontSize(14) }}>
                        Cleaned
                    </Button>
                </View>
            </View> */}
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                }}>
                <SimpleGrid
                    listKey={'zone'}
                    data={rooms}
                    itemDimension={120}
                    spacing={15}
                    renderItem={({ item }) => (
                        <RoomItem room={item} navigation={navigation} />
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    search: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        height: 38,
        marginRight: 10,
    },
    zoneHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectDropdown: {
        backgroundColor: 'white',
        width: 120,
    },
    roomsAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexWrap: 'wrap',
        paddingHorizontal: 5,
        paddingVertical: 10,
        gap: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
    },
    button: {
        borderRadius: 4,
    },
});
