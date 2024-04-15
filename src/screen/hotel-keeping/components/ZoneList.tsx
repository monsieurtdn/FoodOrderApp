import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SimpleGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { fetchFloors } from 'store/slice/HotelSlice';
import { ZoneItem } from './ZoneItem';

export const ZoneList = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const zonesData = useSelector((state: RootState) => state.hotel.floors);

    useEffect(() => {
        dispatch(fetchFloors());
    }, [dispatch]);
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.zonesContainer}>
            <SimpleGrid
                listKey={'zone'}
                data={zonesData}
                itemDimension={250}
                spacing={20}
                renderItem={({ item }) => (
                    <ZoneItem zone={item} navigation={navigation} />
                )}
            />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    zonesContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
});
