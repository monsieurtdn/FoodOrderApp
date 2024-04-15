import Utils from 'common/Utils';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IProps {
    data: [title: string, list: any[]][];
    handleClosePress?: () => void;
}
export const BottomList = ({ data, handleClosePress }: IProps) => {
    console.log(data);

    const calculateTotal = useCallback(() => {
        let total = 0;
        data.forEach(([_, list]) => {
            list.forEach(item => {
                total += item.donGia * item.quantity;
            });
        });
        return total;
    }, [data]);
    return (
        <View style={styles.bottomSheet}>
            <View style={styles.header}>
                <IconButton
                    icon="close"
                    onPress={handleClosePress}
                    style={{
                        marginRight: 0,
                        transform: [{ translateX: 10 }],
                    }}
                />
            </View>
            {data.map(
                ([title, list]) =>
                    list.length > 0 && (
                        <View key={`section-${title}`} style={styles.section}>
                            <Text
                                style={styles.sectionTitle}>{`${title}`}</Text>
                            <View style={styles.bottomList}>
                                {list.map(
                                    (item: {
                                        ten: string;
                                        quantity: number;
                                        donGia: number;
                                    }) => (
                                        <View
                                            key={`ordered-${item.ten}`}
                                            style={styles.bottomListItem}>
                                            <View
                                                style={
                                                    styles.bottomListItem_leftCol
                                                }>
                                                <Text
                                                    style={
                                                        styles.bottomListItem_name
                                                    }>{`${item.ten}`}</Text>
                                            </View>
                                            <View
                                                style={
                                                    styles.bottomListItem_rightCol
                                                }>
                                                <Text>{`${item.quantity}`}</Text>
                                                <Text>{`${Utils.formatCurrency(
                                                    item.donGia * item.quantity,
                                                )}`}</Text>
                                            </View>
                                        </View>
                                    ),
                                )}
                            </View>
                        </View>
                    ),
            )}
            <View style={styles.footer}>
                <View
                    style={[
                        styles.bottomListItem_rightCol,
                        { flexBasis: '44%' },
                    ]}>
                    <Text style={{ fontWeight: '500', fontSize: 16 }}>
                        Cộng
                    </Text>
                    <Text
                        style={{ fontWeight: '500' }}>{`${Utils.formatCurrency(
                        calculateTotal(),
                    )}`}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    bottomSheet: {
        flexDirection: 'column',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    section: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    bottomList: {
        flexDirection: 'column',
        gap: 20,
    },
    bottomListItem: {
        flexDirection: 'row',
    },
    bottomListItem_leftCol: {
        flexBasis: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomListItem_rightCol: {
        flexBasis: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomListItem_name: {
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'flex-end',
    },
});
