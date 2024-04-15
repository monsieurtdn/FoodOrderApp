import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    // NativeScrollEvent,
    // NativeSyntheticEvent,
} from 'react-native';
import { Header } from './components/Header';
import { IconButton, Searchbar } from 'react-native-paper';
import Utils, { KeyboardDismiss } from 'common/Utils';
import {
    BottomSheetModalProvider,
    BottomSheetModal,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { SimpleGrid } from 'react-native-super-grid';
import {
    cleanOrder,
    // createLaundryService,
    setItemQuantity,
} from 'store/slice/LaundrySlice';
import { BottomList } from './components/BottomList';
import CustomBackdrop from './components/CustomBackdrop';
import {
    ISubmitValue,
    RoomServiceFooter,
} from './components/RoomServiceFooter';
import { RoomServiceItem } from './components/RoomServiceItem';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { TabView, TabBar, TabBarItem } from 'react-native-tab-view';
import { useWindowHook } from 'hooks/useWindowHook';
import { GuestSelect } from './components/GuestSelect';
import { ICreateLaundryService, LaundryType } from 'common/define-types';
import HotelServiceApi from 'api/hotel/service.api';
import { showMessage } from 'react-native-flash-message';
import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';

// const guests = [
//     {
//         name: 'Hoàng Đức Thắng',
//     },
//     {
//         name: 'Hồng Giang',
//     },
// ];
interface IRoute {
    key: string;
    title: string;
}
export const LaundryScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatchRoot();
    const { room } = route.params;
    const guessName = `${room.firstName || ''} ${room.lastName || ''} `;
    const [query, setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { screenWidth } = useWindowHook();
    const selectLaundryItems = useSelectorRoot(
        state => state.laundry.orderedItems,
    );
    // const [scrollY, setScrollY] = useState(0);
    // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    //     setScrollY(event.nativeEvent.contentOffset.y);
    // };

    //bottom sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    // tab
    const [tabIndex, setTabIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: LaundryType.LAUNDRY,
            title: 'Laundry',
        },
        { key: LaundryType.DRY, title: 'Dry' },
        { key: LaundryType.PRESSING, title: 'Pressing Only' },
    ]);

    const onSave = (value: ISubmitValue) => {
        setIsSubmitting(true);
        const subTotal = selectLaundryItems.reduce(
            (total, item) => item.quantity * item.donGia + total,
            0,
        );
        const postValue: ICreateLaundryService = {
            ngayThang: new Date().toISOString(),
            thanhTien: subTotal,
            tyLeGiamTru: value.discount,
            soTienGiamTru: Math.round((subTotal * value.discount) / 100),
            tongSoTien: Math.round((subTotal * (100 - value.discount)) / 100),
            tongVND: Math.round((subTotal * (100 - value.discount)) / 100),
            freeCharge: value.freeCharge,
            soPhong: room.roomNo,
            nguoiDung: 0,
            guest: room.guestID,
            ghiChu: '',
            chiTietGiaoDichLaundry: selectLaundryItems
                .filter(item => item.quantity > 0)
                .map(item => ({
                    hangHoa: item.id,
                    soLuong: item.quantity,
                    donGia: item.donGia,
                    thanhTien: item.donGia * item.quantity,
                    flagType: 0,
                    ten: item.ten,
                })),
        };

        HotelServiceApi.createDryCleaningService(postValue).subscribe(
            res => {
                if (res) {
                    showMessage({ message: 'Lưu thành công', type: 'success' });
                    dispatch(cleanOrder());
                    navigation.navigate(Screen.HotelScreen.ZoneDetail);
                }
            },
            err => {
                showMessage({
                    message: 'Lưu không thành công',
                    type: 'danger',
                });
                setIsSubmitting(false);
                console.log(err.response);
            },
            () => setIsSubmitting(false),
        );
    };

    const renderScene = ({ route: tab }: { route: IRoute }) => {
        return (
            <ScrollView
                keyboardShouldPersistTaps="handled"
                // onScroll={handleScroll}
                // contentOffset={{ x: 0, y: scrollY }}
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <SimpleGrid
                    listKey={tab.key}
                    data={selectLaundryItems.filter(
                        item => item.type === tab.key,
                    )}
                    itemDimension={300}
                    spacing={10}
                    renderItem={({ item }) => (
                        <RoomServiceItem
                            item={item}
                            handleChangeQuantity={quantity =>
                                dispatch(setItemQuantity({ item, quantity }))
                            }
                        />
                    )}
                />
            </ScrollView>
        );
    };
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={styles.container}>
                {isSubmitting && <Loader loading={isSubmitting} />}
                <Header
                    content={
                        <View style={styles.roomHeaderContent}>
                            <Text style={styles.roomName}>{`${
                                room?.roomNo ?? '100'
                            }`}</Text>
                            <View style={styles.roomHeaderWrapper}>
                                <GuestSelect
                                    data={[{ name: guessName.trim() }]}
                                />
                                <IconButton
                                    icon={'information-outline'}
                                    iconColor="#1890FF"
                                    style={{
                                        marginHorizontal: 0,
                                    }}
                                />
                            </View>
                        </View>
                    }
                    handleGoBack={() => navigation.goBack()}
                />
                <View style={styles.mainContentContainer}>
                    <Searchbar
                        value={query}
                        style={styles.search}
                        placeholder="Tìm kiếm sản phẩm"
                        onChangeText={value => setQuery(value)}
                        onSubmitEditing={KeyboardDismiss}
                        onBlur={KeyboardDismiss}
                        numberOfLines={1}
                        inputStyle={{
                            fontSize: Utils.getFontSize(14),
                            height: 20,
                            lineHeight: 18,
                            textAlignVertical: 'top',
                        }}
                    />
                    <TabView
                        navigationState={{ index: tabIndex, routes }}
                        renderScene={renderScene}
                        onIndexChange={setTabIndex}
                        initialLayout={{ width: screenWidth }}
                        lazy
                        renderLazyPlaceholder={() => <ActivityIndicator />}
                        style={{ flex: 1 }}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                indicatorStyle={{
                                    backgroundColor: '#006CE4',
                                }}
                                style={{ backgroundColor: '#FFFFFF' }}
                                renderLabel={({ route: tab, focused }) => (
                                    <Text
                                        style={{
                                            color: focused
                                                ? '#006CE4'
                                                : '#1A1A1A',
                                            fontSize: Utils.getFontSize(14),
                                        }}>
                                        {tab.title}
                                    </Text>
                                )}
                                renderTabBarItem={itemProps => (
                                    <TabBarItem
                                        {...itemProps}
                                        style={styles.tabBarItem}
                                    />
                                )}
                            />
                        )}
                    />
                </View>
                <RoomServiceFooter
                    handleDetailClick={handlePresentModalPress}
                    hasExpress={true}
                    items={selectLaundryItems.filter(item => item.quantity > 0)}
                    handleSubmit={onSave}
                />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={props => (
                        <CustomBackdrop {...props} onPress={handleClosePress} />
                    )}>
                    <BottomSheetScrollView>
                        <BottomList
                            data={routes.map(laundryRoute => [
                                laundryRoute.title,
                                selectLaundryItems.filter(
                                    item =>
                                        item.quantity > 0 &&
                                        item.type === laundryRoute.key,
                                ),
                            ])}
                            // [
                            //     [
                            //         'Laundry',
                            //         selectLaundryItems.filter(
                            //             item =>
                            //                 item.quantity > 0 &&
                            //                 item.type === LaundryType.LAUNDRY,
                            //         ),
                            //     ],
                            //     [
                            //         'Dry',
                            //         selectLaundryItems.filter(
                            //             item =>
                            //                 item.quantity > 0 &&
                            //                 item.type === LaundryType.DRY,
                            //         ),
                            //     ],
                            //     [
                            //         'Pressing Only',
                            //         selectLaundryItems.filter(
                            //             item =>
                            //                 item.quantity > 0 &&
                            //                 item.type === LaundryType.PRESSING,
                            //         ),
                            //     ],
                            // ]
                            handleClosePress={handleClosePress}
                        />
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabBarItem: {
        flexDirection: 'row',
        gap: 10,
    },
    roomHeaderContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingRight: 10,
    },
    roomHeaderWrapper: {
        flexDirection: 'row',
        gap: 0,
        alignItems: 'center',
    },
    roomName: {
        fontSize: 22,
        fontWeight: '600',
    },
    staffName: {
        fontSize: 16,
    },
    mainContentContainer: {
        flexGrow: 1,
        paddingTop: 10,
        marginHorizontal: 5,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingTop: 10,
        marginHorizontal: 5,
    },
    search: {
        // flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        height: 38,
        margin: 10,
    },
    bottomSheet: {
        flexDirection: 'column',
        paddingVertical: 20,
    },
    bottomList: {
        flexDirection: 'column',
        gap: 20,
    },
    bottomListItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    bottomListItem_col: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomListItem_name: {
        fontWeight: '600',
    },
});
