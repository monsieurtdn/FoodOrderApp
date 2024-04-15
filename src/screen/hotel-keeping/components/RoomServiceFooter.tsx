import Utils from 'common/Utils';
import CCheckBox from 'components/CCheckBox';
import CTextInput from 'components/CTextInput';
import { useWindowHook } from 'hooks/useWindowHook';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TouchableWithoutFeedback,
} from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface ISubmitValue {
    billNo: string;
    discount: number;
    freeCharge: boolean;
    isExpress?: boolean;
}
interface IProps {
    style?: ViewStyle;
    handleDetailClick?: () => void;
    items: any[];
    hasExpress?: boolean;
    handleSubmit: (value: ISubmitValue) => void;
}
export const RoomServiceFooter = ({
    style,
    handleDetailClick,
    items,
    hasExpress = false,
    handleSubmit,
}: IProps) => {
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    const [billNo, setBillNo] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isFreeOfCharge, setIsFreeOfCharge] = useState(false);
    const [isExpress, setIsExpress] = useState(false);
    const subTotal = items.reduce(
        (total, item) => item.quantity * item.donGia + total,
        0,
    );
    const onSubmit = () => {
        handleSubmit({
            billNo,
            discount,
            freeCharge: isFreeOfCharge,
            isExpress,
        });
    };
    return (
        <View style={[styles.footer, style]}>
            {items.length > 0 && (
                <TouchableWithoutFeedback onPress={handleDetailClick}>
                    <View style={styles.footerWrapper}>
                        <Text
                            style={[
                                styles.footerWrapper_col_left,
                                {
                                    color: '#00000073',
                                    fontStyle: 'italic',
                                    fontSize: 13,
                                },
                            ]}>
                            Bấm để xem chi tiết
                        </Text>
                        <View
                            style={[
                                styles.footerWrapper_col_right,
                                styles.spaceBetween_row,
                            ]}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: '500',
                                        fontSize: 16,
                                    }}>
                                    Cộng
                                </Text>
                                <MaterialCommunityIcons
                                    name="chevron-up"
                                    size={20}
                                />
                            </View>

                            <Text style={{ fontWeight: '500' }}>
                                {Utils.formatCurrency(subTotal)}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
            <View
                style={[
                    styles.billWrapper,
                    {
                        flexDirection:
                            orientation === SCREEN_ORIENTATION.LANDSCAPE
                                ? 'row'
                                : 'column',
                    },
                ]}>
                <View
                    style={[
                        styles.footerWrapper,
                        {
                            width:
                                orientation === SCREEN_ORIENTATION.LANDSCAPE
                                    ? '50%'
                                    : '100%',
                        },
                    ]}>
                    <View
                        style={[
                            styles.footerWrapper_col_left,
                            styles.spaceBetween_row,
                        ]}>
                        <Text style={{ fontSize: Utils.getFontSize(14) }}>
                            Số HĐ:
                        </Text>
                        <CTextInput
                            value={billNo}
                            onChangeText={value => setBillNo(value)}
                            style={{ height: 40, borderRadius: 8 }}
                        />
                    </View>
                    <View
                        style={[
                            styles.footerWrapper_col_right,
                            styles.spaceBetween_row,
                        ]}>
                        <Text style={{ fontSize: Utils.getFontSize(14) }}>
                            Giảm:
                        </Text>
                        <CTextInput
                            style={{ height: 40, borderRadius: 8, padding: 0 }}
                            value={discount.toString()}
                            onChangeText={value =>
                                Utils.isNumeric(value) &&
                                parseInt(value, 10) >= 0 &&
                                parseInt(value, 10) <= 100
                                    ? setDiscount(parseInt(value, 10))
                                    : setDiscount(0)
                            }
                            rightComponnent={<Text>%</Text>}
                        />
                        <Text style={{ fontSize: Utils.getFontSize(12) }}>
                            {Utils.formatCurrency(
                                Math.floor((subTotal * discount) / 100),
                            )}
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.footerWrapper,
                        {
                            width:
                                orientation === SCREEN_ORIENTATION.LANDSCAPE
                                    ? '50%'
                                    : '100%',
                        },
                        { paddingLeft: 10 },
                    ]}>
                    <View
                        style={[
                            styles.footerWrapper_col_left,
                            styles.spaceBetween_row,
                        ]}>
                        {hasExpress ? (
                            <>
                                <CCheckBox
                                    label="FOC"
                                    onChangeValue={checked =>
                                        setIsFreeOfCharge(checked)
                                    }
                                    bgCheckColor="#1890FF"
                                    noPaddingLeft={true}
                                />
                                <CCheckBox
                                    label="Express"
                                    onChangeValue={checked =>
                                        setIsExpress(checked)
                                    }
                                    bgCheckColor="#1890FF"
                                    noPaddingLeft={true}
                                />
                            </>
                        ) : (
                            <CCheckBox
                                label="Free of charge"
                                onChangeValue={checked =>
                                    setIsFreeOfCharge(checked)
                                }
                                bgCheckColor="#1890FF"
                                noPaddingLeft={true}
                            />
                        )}
                    </View>
                    <View
                        style={[
                            styles.footerWrapper_col_right,
                            styles.spaceBetween_row,
                        ]}>
                        <Text
                            style={{
                                fontWeight: '500',
                                fontSize: Utils.getFontSize(15),
                            }}>
                            Tổng cộng
                        </Text>
                        <Text style={{ fontWeight: '500' }}>
                            {Utils.formatCurrency(
                                Math.round((subTotal * (100 - discount)) / 100),
                            )}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerWrapper}>
                {/* <Button
                    mode="outlined"
                    style={{ flex: 1 }}
                    buttonColor="#FFFFFF"
                    textColor="black">
                    Hủy
                </Button> */}
                <Button
                    mode="contained-tonal"
                    style={{ flex: 1 }}
                    buttonColor="#1890FF"
                    disabled={!items || items.length === 0}
                    onPress={onSubmit}
                    textColor="white">
                    Lưu
                </Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    footer: {
        justifyContent: 'center',
        borderTopColor: '#D9D9D9',
        backgroundColor: 'white',
        borderTopWidth: 1,
    },
    footerWrapper: {
        flexDirection: 'row',
        width: '100%',
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    footerWrapper_col_left: {
        flexBasis: '41%',
    },
    footerWrapper_col_right: {
        flexBasis: '54%',
    },
    spaceBetween_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    billWrapper: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
});
