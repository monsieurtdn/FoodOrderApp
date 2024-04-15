import { IProduct } from 'common/define-types';
import React, { ReactElement, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RootState } from 'store/reducers';
import { useSelectorRoot } from 'store/store';
import RestaurantItem from './RestaurantItem';

const RestaurantList: React.FC = () => {
    const listData = useSelectorRoot(
        (state: RootState) => state.order.restaurantProducts,
    );
    const [items, setItems] = useState<ReactElement[][]>([]);

    useEffect(() => {
        const res: ReactElement[][] = [];
        listData.forEach((item, index) => {
            if (index % 2 === 0) {
                res.push([item]);
            } else {
                res[res.length - 1].push(item);
            }
        });
        setItems(res);
    }, [listData]);

    const renderRow = ({ item }: { item: IProduct[] }) => (
        <View style={styles.rowContainer}>
            {item.map(product => (
                <View style={styles.itemContainer}>
                    <RestaurantItem data={product} />
                </View>
            ))}
        </View>
    );

    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRow}
        />
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 10,
        marginTop: 10,
    },
    itemContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
});

export default RestaurantList;
