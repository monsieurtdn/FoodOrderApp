import BottomSheet from '@gorhom/bottom-sheet';
import OrderServiceApi from 'api/order/order.api';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { RootState } from 'store/reducers';
import {
    addListProduct,
    resetListProduct,
    setSheetOpeneded,
} from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import BottomSheetContent from './components/BottomSheetContent';
import BottomNavigationBar from './tab/TabNavigatorRoutesLead';
export const MenuScreen = () => {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const subscription = OrderServiceApi.getProductList(1).subscribe(
            response => {
                // Handle the successful response here
                setData(response.dishes);
            },
            error => {
                // Handle errors here
                console.error('Error calling getTablesMap:', error);
            },
        );

        // Cleanup subscription when component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useDispatchRoot();
    useEffect(() => {
        dispatch(resetListProduct());
        data.map(item => {
            dispatch(
                // addListProduct(Products[`${data.name}`])
                addListProduct({
                    name: item.Name,
                    data: {
                        itemImg: require('../../../image/MaharajaMac1.png'),
                        price: item.Price,
                        nutrition: item.Nutrition,
                        orderImg: require('../../../image/MaharajaMac2.png'),
                        Nhomhang: item.CategoryID,
                    },
                }),
            );
        });
    });
    const sheetState = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetOpen,
    );
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
    const renderBottomSheetContent = () => (
        // Nội dung của bottom sheet ở đây
        <>
            <BottomSheetContent onClose={handleBottomSheetClose} />
        </>
    );
    return (
        <>
            <BottomNavigationBar />

            <View style={{ position: 'absolute', bottom: 120, right: 10 }}>
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
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Đóng bottom sheet khi index là -1
                snapPoints={[575, 580]} // Các điểm snap của bottom sheet
                detached
                enablePanDownToClose
                backgroundComponent={() => (
                    <View style={styles.bottomSheetBackground} />
                )}>
                {renderBottomSheetContent()}
            </BottomSheet>
        </>
    );
};
const styles = StyleSheet.create({
    bottomSheetContent: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetBackground: {
        flex: 1,
        backgroundColor: 'white',
        height: 60,
    },
});
