import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { RootState } from 'store/reducers';
import { confirmOrder } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { Header } from './components/Header';
import ProductOrderList from './components/ProductOrderList';

export const OrderCheckScreen: React.FC = () => {
    const dispatch = useDispatchRoot();
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const orderData = useSelectorRoot(
        (state: RootState) => state.order.orderComponents,
    );
    useEffect(() => {
        setTotalCount(orderData.reduce((total, item) => total + item.count, 0));
        setTotalPrice(
            orderData.reduce(
                (total, item) => total + item.count * item.data.price,
                0,
            ),
        );
    }, [orderData]);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header
                shadowElevation={6}
                hasShadow={true}
                content={
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginRight: 200,
                        }}>
                        Your Selection
                    </Text>
                }
                handleGoBack={() => navigation.goBack()}
            />
            <ScrollView style={{ marginBottom: 88 }}>
                <View>
                    <ProductOrderList />
                </View>
                <Divider style={{ width: '150%' }} />
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        paddingLeft: 10,
                    }}>
                    <View>
                        <Text style={{ fontSize: 16 }}>
                            Do you need anything more?
                        </Text>
                        <Text style={{ fontSize: 12 }}>
                            Choose to add something else if you want.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#1890FF',
                            gap: 10,
                            borderRadius: 100,
                            marginLeft: 30,
                            paddingHorizontal: 25,
                            height: 39,
                        }}
                        activeOpacity={0.7}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <Divider style={{ width: '150%' }} />
            </ScrollView>
            <View
                style={{
                    backgroundColor: 'white',
                    alignContent: 'center',
                    position: 'absolute',
                    bottom: 10,
                    width: '100%',
                }}>
                <Divider style={{ width: '150%' }} />
                <View
                    style={{
                        flexDirection: 'row',
                        paddingBottom: 10,
                        paddingTop: 10,
                        right: -150,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Total: </Text>
                    <Text style={{ fontStyle: 'italic', marginLeft: 50 }}>
                        {totalPrice.toLocaleString('vi-VN')}đ
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005BA5',
                        gap: 10,
                        marginLeft: 10,
                        borderRadius: 100,
                        width: 342,
                        height: 39,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        dispatch(confirmOrder());
                        navigation.navigate(Screen.OrderScreen.SuccessScreen, {
                            fromPayScreen: false,
                        });
                    }}>
                    <Text style={styles.buttonText}>Order</Text>
                </TouchableOpacity>
            </View>
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
        </View>
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
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        textAlign: 'center',
    },
});
