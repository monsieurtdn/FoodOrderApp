import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, Icon, Modal, Portal } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { RootState } from 'store/reducers';
import { cancelOrder, confirmUpdate } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { Header } from './components/Header';
import ProductOrderList from './components/ProductOrderList';

export const OrderInfoScreen: React.FC = () => {
    const dispatch = useDispatchRoot();
    const navigation = useNavigation();
    const [visibleModal, setVisibleModal] = useState(false);
    const indexList = useSelectorRoot(
        (state: RootState) => state.order.indexNumber,
    );
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
                        Order Information
                    </Text>
                }
                handleGoBack={() => navigation.goBack()}
            />
            <ScrollView style={{ marginBottom: 88 }}>
                <View>
                    <ProductOrderList />
                </View>
            </ScrollView>
            <View
                style={{
                    backgroundColor: 'white',
                    alignContent: 'center',
                    position: 'absolute',
                    bottom: 30,
                    width: '100%',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#A50000',
                        gap: 10,
                        marginRight: 20,
                        borderRadius: 100,
                        marginLeft: 40,
                        paddingHorizontal: 40,
                        height: 39,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        setVisibleModal(true);
                    }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005BA5',
                        gap: 10,
                        borderRadius: 100,
                        marginLeft: 20,
                        paddingHorizontal: 40,
                        height: 39,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        dispatch(confirmUpdate(indexList));
                        navigation.goBack();
                    }}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
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
            <Portal>
                <Modal
                    visible={visibleModal}
                    onDismiss={() => setVisibleModal(false)}
                    contentContainerStyle={styles.modalContent}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Cancel order
                    </Text>
                    <Text>Are you sure you want to cancel order?</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                        }}>
                        <Button onPress={() => setVisibleModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onPress={() => {
                                dispatch(cancelOrder(indexList));
                                navigation.navigate(
                                    Screen.OrderScreen.MenuScreen,
                                    {
                                        screen: 'Order',
                                    },
                                );
                                setVisibleModal(false);
                            }}>
                            Confirm
                        </Button>
                    </View>
                </Modal>
            </Portal>
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
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 30,
        borderRadius: 10,
    },
});
