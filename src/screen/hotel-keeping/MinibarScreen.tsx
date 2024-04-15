import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from './components/Header';
import { IconButton, Searchbar } from 'react-native-paper';
import Utils, { KeyboardDismiss } from 'common/Utils';
import {
    ISubmitValue,
    RoomServiceFooter,
} from './components/RoomServiceFooter';
import { RoomServiceItem } from './components/RoomServiceItem';
import { SimpleGrid } from 'react-native-super-grid';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from './components/CustomBackdrop';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import {
    cleanOrder,
    // createMinibarItemsService,
    setItemQuantity,
} from 'store/slice/MnibarSlice';
import { BottomList } from './components/BottomList';
import { GuestSelect } from './components/GuestSelect';
import { ICreateMinibarService } from 'common/define-types';
import HotelServiceApi from 'api/hotel/service.api';
import { showMessage } from 'react-native-flash-message';
import Loader from 'components/Loader';
import { Screen } from 'common/screenEnums';

// const guests = [
//     {
//         name: 'Hoàng Đức Thắng',
//     },
//     {
//         name: 'Hồng Giang',
//     },
// ];
export const MinibarScreen = ({ navigation, route }: any) => {
    const dispatch = useDispatchRoot();
    const { room } = route.params;
    const guessName = `${room.firstName || ''} ${room.lastName || ''} `;
    const [query, setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['80%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        KeyboardDismiss();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const selectMinibarItems = useSelectorRoot(
        state => state.minibar.orderedItems,
    );

    // useEffect(() => {
    //     dispatch(fetchMinibarItems());
    // }, [dispatch])
    const onSave = (value: ISubmitValue) => {
        setIsSubmitting(true);
        const subTotal = selectMinibarItems.reduce(
            (total, item) => item.quantity * item.donGia + total,
            0,
        );
        const postValue: ICreateMinibarService = {
            ngayThang: new Date().toISOString(),
            thanhTien: subTotal,
            tyLeGiamTru: value.discount,
            soTienGiamTru: Math.round((subTotal * value.discount) / 100),
            tongSoTien: Math.round((subTotal * (100 - value.discount)) / 100),
            freeCharge: value.freeCharge,
            soPhong: room.roomNo,
            nguoiDung: 0,
            guest: room.guestID,
            ghiChu: '',
            chiTietGiaoDichMiniBars: selectMinibarItems
                .filter(item => item.quantity > 0)
                .map(item => ({
                    hangHoa: item.id,
                    soLuong: item.quantity,
                    donGia: item.donGia,
                    thanhTien: item.donGia * item.quantity,
                    ten: item.ten,
                })),
        };
        console.log(postValue);
        HotelServiceApi.createMinibarService(postValue).subscribe(
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
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}>
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
                    <SimpleGrid
                        listKey={'minibar'}
                        data={selectMinibarItems}
                        itemDimension={300}
                        spacing={10}
                        renderItem={({ item }) => (
                            <RoomServiceItem
                                item={item}
                                handleChangeQuantity={quantity =>
                                    dispatch(
                                        setItemQuantity({ item, quantity }),
                                    )
                                }
                            />
                        )}
                    />
                </ScrollView>
                <RoomServiceFooter
                    handleDetailClick={handlePresentModalPress}
                    items={selectMinibarItems.filter(item => item.quantity > 0)}
                    handleSubmit={value => onSave(value)}
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
                            data={[
                                [
                                    'Bar',
                                    selectMinibarItems.filter(
                                        item => item.quantity > 0,
                                    ),
                                ],
                            ]}
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
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 30,
        marginHorizontal: 10,
    },
    search: {
        // flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        height: 38,
        marginHorizontal: 10,
    },
    selectDropdown: {
        backgroundColor: 'white',
        width: 180,
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
