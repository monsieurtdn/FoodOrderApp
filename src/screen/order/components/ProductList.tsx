import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RootState } from 'store/reducers';
import { useSelectorRoot } from 'store/store';
import ProductItem from './ProductItem';

const ProductList: React.FC<any> = () => {
    const listData = useSelectorRoot(
        (state: RootState) => state.order.listProduct,
    );
    useEffect(() => {
        console.log('listData: ', listData);
    });
    const [items, setItems] = useState<ReactElement[]>([]);
    useEffect(() => {
        const res: ReactElement[] = [];
        listData.map(item => {
            res.push(<ProductItem data={item} />);
        });
        setItems(res);
    }, [listData]);

    return (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
            {items}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
});
export default ProductList;
