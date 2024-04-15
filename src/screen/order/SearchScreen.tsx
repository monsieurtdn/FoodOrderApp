import { useNavigation } from '@react-navigation/native';
import Utils, { KeyboardDismiss } from 'common/Utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Searchbar } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';

import BottomSheet from '@gorhom/bottom-sheet';
import { Screen } from 'common/screenEnums';
import { RootState } from 'store/reducers';
import { setIndexNumber, setSheetOpeneded } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import BottomSheetContent from './components/BottomSheetContent';
import { Header } from './components/Header';
import { SearchList } from './components/SearchList';

export const SearchScreen: React.FC = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useDispatchRoot();
    const sheetState = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetResOpen,
    );
    useEffect(() => {
        if (query === '') {
            setIsFocused(false);
        } else {
            setIsFocused(true);
        }
    }, [query]);
    useEffect(() => {
        if (sheetState) {
            openBottomSheet();
            dispatch(setSheetOpeneded(false));
        }
    }, [sheetState]);
    const handleBottomSheetClose = () => {
        closeBottomSheet(); // Gọi hàm closeBottomSheet từ MenuScreen để đóng BottomSheet
    };
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };
    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
    };

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const handleSheetChanges = useCallback(() => {
        setIsSheetOpen(!isSheetOpen);
        console.log('Sheet status:', !isSheetOpen);
    }, [isSheetOpen]);
    const renderBottomSheetContent = () => (
        // Nội dung của bottom sheet ở đây
        <>
            <BottomSheetContent onClose={handleBottomSheetClose} />
        </>
    );
    const handleFocus = () => {
        setIsFocused(true);
    };

    const orderData = useSelectorRoot(
        (state: RootState) => state.order.orderComponents,
    );
    const [totalCount, setTotalcount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const orderList = useSelectorRoot((state: RootState) => state.order.orders);
    const navigateToOrder = () => {
        dispatch(setIndexNumber(orderList.length - 1));
        navigation.navigate(Screen.OrderScreen.OrderCheckScreen); // Điều hướng sang màn hình Order
    };

    useEffect(() => {
        setTotalcount(
            orderData.reduce(
                (total: any, item: { count: any }) => total + item.count,
                0,
            ),
        );
        setTotalPrice(
            orderData.reduce(
                (
                    total: number,
                    item: { count: number; data: { price: number } },
                ) => total + item.count * item.data.price,
                0,
            ),
        );
    }, [orderData]);

    return (
        <View style={styles.container}>
            <Header
                shadowElevation={6}
                hasShadow={true}
                content={
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            position: 'absolute',
                            left: 40,
                            paddingLeft: 20,
                        }}>
                        Search
                    </Text>
                }
                handleGoBack={() => {
                    navigation.goBack();
                }}
            />
            <View style={styles.header}>
                <Searchbar
                    style={[
                        styles.search,
                        (isFocused || query !== '') && styles.searchFocused,
                    ]}
                    value={query}
                    placeholder="Search"
                    onSubmitEditing={KeyboardDismiss}
                    // onFocus={KeyboardDismiss}
                    onChangeText={value => {
                        setQuery(value);
                        handleFocus();
                    }}
                    selectionColor={'grey'}
                    numberOfLines={1}
                    inputStyle={{
                        fontSize: Utils.getFontSize(16),
                        height: 20,
                        lineHeight: 18,
                        textAlignVertical: 'top',
                        marginTop: -5,
                        marginLeft: -5,
                    }}
                />
            </View>
            <SearchList />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Đóng bottom sheet khi index là -1
                snapPoints={[575, 580]} // Các điểm snap của bottom sheet
                detached
                enablePanDownToClose
                onChange={handleSheetChanges}
                backgroundComponent={() => (
                    <View style={styles.bottomSheetBackground} />
                )}>
                {renderBottomSheetContent()}
            </BottomSheet>
            <View style={{ position: 'absolute', bottom: 90, right: 10 }}>
                <View style={{ paddingBottom: 10 }}>
                    <Svg height="50" width="50">
                        {/* Hình tròn màu #0F6812 */}
                        <Circle cx="25" cy="25" r="25" fill="#0F6812" />
                        {/* Icon điện thoại trong hình tròn màu #0F6812 */}
                        <View style={{ marginLeft: 7, marginTop: 7 }}>
                            <Icon source="phone" size={35} color="white" />
                        </View>
                    </Svg>
                </View>
                <View>
                    <Svg height="50" width="50">
                        {/* Hình tròn màu #05417D */}
                        <Circle cx="25" cy="25" r="25" fill="#05417D" />
                        {/* Icon messenger trong hình tròn màu #05417D */}
                        <View style={{ marginLeft: 5, marginTop: 5 }}>
                            <Icon
                                source="facebook-messenger"
                                size={40}
                                color="white"
                            />
                        </View>
                    </Svg>
                </View>
            </View>
            {orderData.length > 0 && !isSheetOpen && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        zIndex: 1,
                    }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            backgroundColor: '#6DBFEE',
                            borderRadius: 20,
                            width: 320,
                        }}
                        onPress={navigateToOrder}>
                        <Text style={{ color: 'white', fontSize: 16 }}>
                            Your order has {totalCount} item(s)
                        </Text>
                        <Text style={{ color: 'white', fontSize: 16 }}>
                            {totalPrice.toLocaleString('vi-VN')} đ
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        alignItems: 'center',
        paddingVertical: 10,
        // paddingRight: 10,
        zIndex: 50,
    },
    boxShadow: {
        shadowColor: '#000', // Màu của bóng đổ
        shadowOffset: {
            width: 0, // Điều chỉnh vị trí ngang của bóng đổ
            height: 3, // Điều chỉnh vị trí dọc của bóng đổ
        },
        shadowOpacity: 0.5, // Độ đậm nhạt của bóng đổ
        shadowRadius: 5, // Độ rộng của bóng đổ
        elevation: 5, // Sử dụng elevation nếu không áp dụng shadow trên Android
        // Các thuộc tính khác nếu cần thiết
    },
    search: {
        flex: 2,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        marginLeft: 10,
        height: 36,
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchFocused: {
        borderColor: 'red', // Đặt màu viền khi thanh tìm kiếm được chọn
        borderWidth: 1, // Thêm viền
    },
    bottomSheetContent: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetBackground: {
        backgroundColor: 'white',
        height: 60,
    },
});
