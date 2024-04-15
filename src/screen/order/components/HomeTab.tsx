import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { RootState } from 'store/reducers';
import { setIndexNumber } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { SearchBar } from './Buttons';
import ProductList from './ProductList';
// import TabNavigatorRoutesLead from './tab/TabNavigatorRoutesLead';

type ImageData = { img: any }[];
const imageData: ImageData = [
    { img: require('../../../../image/Promo1.png') },
    { img: require('../../../../image/Promo2.png') },
    { img: require('../../../../image/Promo3.png') },
];
export const HomeTab: React.FC = () => {
    const dispatch = useDispatchRoot();
    const [totalCount, setTotalcount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [index, setIndex] = React.useState<number>(0);
    const navigation = useNavigation();
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
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <Text
                    style={{
                        fontSize: 35,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        paddingLeft: 12,
                    }}>
                    Menu
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(Screen.OrderScreen.SearchScreen);
                    }}>
                    <View style={styles.header}>
                        <SearchBar />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        paddingLeft: 12,
                        paddingBottom: 10,
                    }}>
                    Deal of the day
                </Text>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        paddingLeft: 20,
                    }}>
                    <Carousel
                        pagingEnabled={true}
                        loop={true}
                        autoPlay={false}
                        scrollAnimationDuration={1000}
                        data={imageData}
                        width={347}
                        height={137}
                        panGestureHandlerProps={{
                            activeOffsetX: [-10, 10],
                        }}
                        onSnapToItem={ind => setIndex(ind)}
                        renderItem={({ item }: any) => (
                            <View>
                                <Image
                                    source={item.img}
                                    style={{
                                        width: 325,
                                        height: 132,
                                        borderRadius: 21,
                                    }}
                                />
                            </View>
                        )}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            paddingLeft: 10,
                            paddingBottom: 10,
                        }}>
                        Best Seller
                    </Text>
                    <View style={{ paddingLeft: 5 }}>
                        <ProductList />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                                paddingLeft: 12,
                                paddingBottom: 10,
                            }}>
                            All Restaurants
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(
                                    Screen.OrderScreen.AllRestaurantsScreen,
                                );
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#1381E7',
                                    paddingRight: 20,
                                    paddingTop: 4,
                                }}>
                                See All
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingLeft: 5 }}>
                        <ProductList />
                    </View>
                </View>
                {orderData.length > 0 && (
                    <View style={{ height: 50 }} /> // Đoạn phần trắng 50px
                )}
            </ScrollView>
            {orderData.length > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 20,
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
        alignContent: 'center',
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
    search: {
        flex: 2,
        backgroundColor: '#F1F1F1',
        borderRadius: 20,
        marginLeft: 10,
        height: 38,
        marginRight: 10,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundImage: {
        position: 'relative',
        width: 152,
        height: 168,
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
});
