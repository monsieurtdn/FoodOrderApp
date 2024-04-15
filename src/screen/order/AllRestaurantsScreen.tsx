import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import OrderServiceApi from 'api/order/order.api';
import { Screen } from 'common/screenEnums';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { RootState } from 'store/reducers';
import {
    addRestaurantProducts,
    refreshRestaurantProducts,
    setIndexNumber,
    setSheetOpeneded,
} from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import BottomSheetContent from './components/BottomSheetContent';
import { SearchBar } from './components/Buttons';
import { Header } from './components/Header';
import RestaurantList from './components/RestaurantList';

export const AllRestaurantsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [tracker, setTracker] = useState<any[]>([
        { ID: 0, Parent: 0, Ten: 'All restaurants' },
    ]);
    useEffect(() => {
        const subscription = OrderServiceApi.getProductCategory(1).subscribe(
            response => {
                // Handle the successful response here
                const newData = response.map(
                    (item: { ID: any; Ten: any; Parent: any }) => ({
                        ID: item.ID,
                        Ten: item.Ten,
                        Parent: item.Parent,
                    }),
                );
                setData(newData);
            },
            error => {
                // Handle errors here
                console.error('Error calling getProductCategory:', error);
            },
        );

        // Cleanup subscription when component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    function findAllChildren(dt: any[], parentId: any) {
        const children = dt.filter(
            (item: { Parent: any }) => item.Parent === parentId,
        );
        let result = children.slice();
        children.forEach((child: { ID: any }) => {
            result = result.concat(findAllChildren(dt, child.ID));
        });
        return result;
    }
    function findRelatedItems(itemId: any) {
        const initialItem = data.find(item => item.ID === itemId);
        console.log('initialItem: ', initialItem);
        if (initialItem) {
            const res = findAllChildren(data, initialItem.ID);
            return res.length > 0 ? res : [initialItem];
        } else {
            return [];
        }
    }
    const [trackedItem, setTrackedItem] = useState<any[]>([]);

    const sortedData = [...data];
    sortedData.sort((a, b) => a.Parent - b.Parent);
    useEffect(() => {
        console.log('sortedData:', sortedData);
        if (sortedData.length > 0) {
            const initialCategories = sortedData.filter(item => item.ID === 1);
            setCategories(initialCategories);
        }
    }, [data]);
    useEffect(() => {
        console.log('categories: ', categories);
    }, [categories]);
    const orderList = useSelectorRoot((state: RootState) => state.order.orders);
    const navigateToOrder = () => {
        dispatch(setIndexNumber(orderList.length - 1));
        navigation.navigate(Screen.OrderScreen.OrderCheckScreen); // Điều hướng sang màn hình Order
    };
    const orderData = useSelectorRoot(
        (state: RootState) => state.order.orderComponents,
    );
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
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useDispatchRoot();
    const sheetState = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetResOpen,
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
    const [totalCount, setTotalcount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const orderData1 = useSelectorRoot(
        (state: RootState) => state.order.orders,
    );
    const initialData = useSelectorRoot(
        (state: RootState) => state.order.listProduct,
    );
    useEffect(() => {}, [orderData1]);
    useEffect(() => {
        dispatch(refreshRestaurantProducts());
    }, []);
    useEffect(() => {
        console.log('trackedItem: ', trackedItem);
        // const result = [];
        for (const item of initialData) {
            for (const tracked of trackedItem) {
                if (item.data.Nhomhang === tracked.ID) {
                    dispatch(addRestaurantProducts(item));
                    break; // Dừng vòng lặp trong trackedItem khi đã tìm thấy một mục thoả mãn
                }
            }
        }
    }, [trackedItem]);
    return (
        <>
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
                            All Restaurants
                        </Text>
                    }
                    handleGoBack={() => {
                        navigation.goBack();
                    }}
                />
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(
                                Screen.OrderScreen.SearchScreen,
                            );
                        }}>
                        <View style={{ marginTop: 10 }}>
                            <SearchBar />
                        </View>
                    </TouchableOpacity>
                    <ScrollView horizontal style={styles.categoryContainer}>
                        {tracker.map(
                            (item: { ID: any; Ten: string }, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        key={item.ID}
                                        onPress={() => {
                                            dispatch(
                                                refreshRestaurantProducts(),
                                            );
                                            setTrackedItem(
                                                findRelatedItems(item.ID),
                                            );
                                            const slicedTracker = tracker.slice(
                                                0,
                                                tracker.findIndex(
                                                    (i: { ID: any }) =>
                                                        i.ID === item.ID,
                                                ) + 1,
                                            );
                                            setTracker(slicedTracker);
                                            setCategories([]);
                                            const newCategories =
                                                sortedData.filter(
                                                    dt => dt.Parent === item.ID,
                                                );
                                            setCategories(newCategories);
                                        }}>
                                        <Text style={{ fontSize: 19 }}>
                                            {' '}
                                            {item.Ten}
                                        </Text>
                                    </TouchableOpacity>
                                    {index !== tracker.length - 1 ? (
                                        <Text>{' > '}</Text>
                                    ) : (
                                        <></>
                                    )}
                                </View>
                            ),
                        )}
                    </ScrollView>
                    <ScrollView horizontal style={styles.categoryContainer}>
                        {categories.map(
                            (category: { ID: any; Ten: string }) => (
                                <TouchableOpacity
                                    key={category.ID}
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        dispatch(refreshRestaurantProducts());
                                        setTrackedItem(
                                            findRelatedItems(category.ID),
                                        );
                                        // Clear existing categories
                                        setCategories([]);
                                        // Keep items up to the current index
                                        const newItem = sortedData.find(
                                            dataItem =>
                                                dataItem.ID === category.ID,
                                        );
                                        if (newItem) {
                                            tracker.push(newItem);
                                            console.log('Tracker: ', tracker);
                                        }
                                        const newCategories = sortedData.filter(
                                            item => item.Parent === category.ID,
                                        );
                                        setCategories(newCategories);
                                    }}>
                                    <Text style={styles.categoryText}>
                                        {category.Ten}
                                    </Text>
                                </TouchableOpacity>
                            ),
                        )}
                    </ScrollView>
                    <RestaurantList />
                    {orderData.length > 0 && (
                        <View style={{ height: 50 }} /> // Đoạn phần trắng 50px
                    )}
                </ScrollView>
            </View>
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
        </>
    );
};
const styles = StyleSheet.create({
    search: {
        flex: 2,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        marginLeft: 10,
        height: 38,
        marginRight: 10,
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    categoryItem: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 15,
        backgroundColor: '#D8D8D8',
    },
    categoryText: {
        fontSize: 16,
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

    productName: {
        fontSize: 16,
        marginTop: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        color: 'white',
        marginLeft: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
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
