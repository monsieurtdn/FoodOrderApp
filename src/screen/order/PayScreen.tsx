import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { clearConfirmedOrder } from 'store/slice/OrderSlice';
import { useDispatchRoot } from 'store/store';
import { Header } from './components/Header';

export const PayScreen: React.FC = ({ route }) => {
    const confirmedComponents = route.params?.confirmedComponents || [];
    const total: number = confirmedComponents.reduce(
        (accumulator: number, currentItem: any) => {
            const productTotal: number =
                currentItem.count * currentItem.data.price;
            return accumulator + productTotal;
        },
        0,
    );
    const dispatch = useDispatchRoot();
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
                            position: 'absolute',
                            left: 40,
                            paddingLeft: 20,
                        }}>
                        Billing Information{' '}
                    </Text>
                }
                handleGoBack={() => {
                    navigation.goBack();
                }}
            />
            <View style={{ paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text
                        style={{
                            opacity: 0.45,
                            color: '#000000',
                            fontSize: 12,
                            fontStyle: 'italic',
                            paddingLeft: 20,
                            width: 200,
                        }}>
                        Tên món
                    </Text>
                    <Text
                        style={{
                            opacity: 0.45,
                            color: '#000000',
                            fontSize: 12,
                            fontStyle: 'italic',
                            width: 120,
                        }}>
                        SL
                    </Text>
                    <Text
                        style={{
                            opacity: 0.45,
                            color: '#000000',
                            fontSize: 12,
                            fontStyle: 'italic',
                        }}>
                        TT
                    </Text>
                </View>
                {confirmedComponents.map(
                    (item: {
                        name:
                            | boolean
                            | React.ReactChild
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        count:
                            | boolean
                            | React.ReactChild
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        data: {
                            price: {
                                toLocaleString: (
                                    arg0: string,
                                ) =>
                                    | boolean
                                    | React.ReactChild
                                    | React.ReactFragment
                                    | React.ReactPortal
                                    | null
                                    | undefined;
                            };
                        };
                    }) => (
                        <View
                            style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    paddingLeft: 20,
                                    width: 200,
                                    paddingVertical: 8,
                                }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    width: 120,
                                    paddingVertical: 8,
                                }}>
                                {item.count}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 8,
                                }}>
                                {item.data.price.toLocaleString('vi-VN')}đ
                            </Text>
                        </View>
                    ),
                )}
            </View>
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
                        right: -225,
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Total: </Text>
                    <Text style={{ fontStyle: 'italic', marginLeft: 50 }}>
                        {total.toLocaleString('vi-VN')}đ
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005BA5',
                        gap: 10,
                        borderRadius: 100,
                        marginLeft: 10,
                        width: 390,
                        height: 39,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        dispatch(clearConfirmedOrder());
                        navigation.navigate(Screen.OrderScreen.SuccessScreen, {
                            fromPayScreen: true,
                        });
                    }}>
                    <Text style={styles.buttonText}>Send Payment Request</Text>
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
    },
});
