import Utils, { KeyboardDismiss } from 'common/Utils';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { fetchRooms } from 'store/slice/HotelSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { Header } from './components/Header';
import { RoomList } from './components/RoomList';
import { ZoneHeaderContent } from './components/ZoneHeaderContent';

export const ZoneDetail = ({ navigation }: any) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatchRoot();
    const selectRoomsLoading = useSelectorRoot(state => state.hotel.isLoading);
    const selectRooms = useSelectorRoot(state => state.hotel.rooms);

    const selectZoneSelected = useSelectorRoot(
        state => state.hotel.floorSelected,
    );
    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);
    return (
        <SafeAreaView style={styles.container}>
            <Header
                hasShadow={false}
                content={
                    <Searchbar
                        value={query}
                        style={styles.search}
                        placeholder="Tìm kiếm tầng, phòng...."
                        onChangeText={value => setQuery(value)}
                        onSubmitEditing={Keyboard.dismiss}
                        onBlur={Keyboard.dismiss}
                        numberOfLines={1}
                        inputStyle={{
                            fontSize: Utils.getFontSize(16),
                            height: 20,
                            lineHeight: 18,
                            textAlignVertical: 'top',
                        }}
                    />
                }
                handleGoBack={() => navigation.goBack()}
            />
            {/* zone header */}
            <TouchableWithoutFeedback
                onPress={KeyboardDismiss}
                style={{ backgroundColor: 'red' }}>
                <>
                    <Header
                        shadowElevation={4}
                        content={<ZoneHeaderContent />}
                        height={80}
                    />
                    {selectRoomsLoading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ActivityIndicator />
                        </View>
                    ) : selectRooms.filter(
                          room => room.floorNo === selectZoneSelected?.floor,
                      ).length > 0 ? (
                        <RoomList navigation={navigation} />
                    ) : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text>No room available</Text>
                        </View>
                    )}
                </>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        maxHeight: 40,
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
});
