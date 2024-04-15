import Utils from 'common/Utils';
import { IOrderedLaundryItem, IOrderedMinibarItem } from 'common/define-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const QuantityButton = ({
    onPress,
    disabled = false,
    type,
}: {
    onPress: () => void;
    disabled?: boolean;
    type: 'decrease' | 'increase';
}) => {
    return (
        <View
            style={{
                height: 30,
                width: 30,
                borderRadius: 4,
                backgroundColor: !disabled ? '#096DD9' : '#D9D9D9',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <IconButton
                icon={type === 'increase' ? 'plus' : 'minus'}
                onPress={!disabled ? onPress : undefined}
                iconColor="white"
            />
        </View>
    );
};
interface IProps {
    item: IOrderedMinibarItem | IOrderedLaundryItem;
    handleChangeQuantity: (quantity: number) => void;
}
export const RoomServiceItem = ({
    item,
    handleChangeQuantity,
}: // quantity,
// handleChangeQuantity,
IProps) => {
    const handleDecrease = () => {
        if (item.quantity > 0) {
            Utils.throttle(() => {
                handleChangeQuantity(item.quantity - 1);
            }, 150);
        }
    };
    const handleIncrease = () => {
        Utils.throttle(() => {
            handleChangeQuantity(item.quantity + 1);
        }, 150);
    };
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfoWrapper}>
                <View>
                    <Text style={styles.name}>{item.ten}</Text>
                    <Text style={styles.description}>{item.ghiChu}</Text>
                </View>
                <View>
                    <Text>
                        {Utils.formatCurrency(
                            item.quantity * (item.donGia ?? 0),
                        )}
                    </Text>
                </View>
            </View>
            <View style={styles.quantityWrapper}>
                <View>
                    <Text>{`Đơn giá: ${Utils.formatCurrency(
                        item.donGia ?? 0,
                    )}`}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <QuantityButton
                        type="decrease"
                        disabled={item.quantity === 0}
                        onPress={handleDecrease}
                    />
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <QuantityButton type="increase" onPress={handleIncrease} />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D9D9D9',
    },
    itemInfoWrapper: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    name: {
        fontWeight: '500',
    },
    description: {
        fontStyle: 'italic',
        fontSize: 13,
        color: '#00000073',
    },
    quantityWrapper: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantity: {
        width: 30,
        verticalAlign: 'middle',
        textAlign: 'center',
    },
});
