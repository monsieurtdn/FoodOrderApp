import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from './components/Header';
import { Screen } from 'common/screenEnums';
import { RoomService } from './components/RoomService';
import { useSelectorRoot } from 'store/store';
import Loader from 'components/Loader';

const services = [
    {
        title: 'Post MiniBar',
        icon: 'beer-outline',
        available: true,
        jumpTo: Screen.HotelScreen.MiniBar,
    },
    {
        title: 'Post Laundry',
        icon: 'tshirt-crew-outline',
        available: true,
        jumpTo: Screen.HotelScreen.Laundry,
    },
    {
        title: 'Lost & Broken',
        icon: 'bag-personal-off-outline',
        available: false,
    },
    {
        title: 'Lost & Found',
        icon: 'archive-search-outline',
        available: false,
    },
    {
        title: 'Trace',
        icon: 'notebook-check-outline',
        available: false,
    },
];
export const RoomDetail = ({ navigation, route }: any) => {
    const { room } = route.params;
    const isMinibarLoading = useSelectorRoot(state => state.minibar.isLoading);
    const isLaundryLoading = useSelectorRoot(state => state.laundry.isLoading);
    return isMinibarLoading || isLaundryLoading ? (
        <Loader loading={isMinibarLoading || isLaundryLoading} />
    ) : (
        <SafeAreaView style={styles.container}>
            <Header
                content={
                    <View style={styles.roomHeaderContent}>
                        <Text style={styles.roomName}>{`${
                            room?.roomNo ?? ''
                        }`}</Text>
                    </View>
                }
                handleGoBack={() => navigation.goBack()}
            />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                {services.map(service => (
                    <RoomService
                        service={service}
                        isAvailable={service.available}
                        key={`Service-${service.title}`}
                        onPress={() =>
                            navigation.navigate(service.jumpTo, {
                                room,
                            })
                        }
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    roomHeaderContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingRight: 10,
    },
    roomName: {
        fontSize: 22,
        fontWeight: '600',
    },
    staffName: {
        fontSize: 16,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingHorizontal: 60,
        paddingTop: 40,
        paddingBottom: 30,
        gap: 40,
    },
});
