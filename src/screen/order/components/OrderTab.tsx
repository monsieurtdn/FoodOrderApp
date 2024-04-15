import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { RootState } from 'store/reducers';
import { useSelectorRoot } from 'store/store';
import { Header } from './Header';
import OrderList from './OrderList';

export const OrderTab: React.FC = () => {
    const orderData = useSelectorRoot((state: RootState) => state.order.orders);
    const confirmedComponents = orderData
        .filter(order => order.status === 'Confirmed')
        .flatMap(order => order.components);
    const navigation = useNavigation();
    const hasSpecificOrderData = orderData && orderData.length > 0;
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
                            paddingLeft: 20,
                        }}>
                        Orders
                    </Text>
                }
            />
            <ScrollView style={{ marginBottom: 88 }}>
                <View>
                    <OrderList index={0} />
                </View>
            </ScrollView>
            {hasSpecificOrderData && (
                <View
                    style={{
                        backgroundColor: 'white',
                        alignContent: 'center',
                        position: 'absolute',
                        bottom: 20,
                        width: '100%',
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#005BA5',
                            gap: 10,
                            borderRadius: 100,
                            marginLeft: 10,
                            width: 336,
                            height: 39,
                        }}
                        activeOpacity={0.7}
                        onPress={() =>
                            navigation.navigate(Screen.OrderScreen.PayScreen, {
                                confirmedComponents: confirmedComponents,
                            })
                        }>
                        <Text style={styles.buttonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
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
