// import BottomSheet from '@gorhom/bottom-sheet';
// import { Products } from 'dummy-data/RestaurantMenu';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootState } from 'store/reducers';
import { chooseProduct, setSheetOpeneded } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { MoneyIcon } from './Buttons';
interface Props {
    data: any;
}
const ProductItem: React.FC<Props> = (props: Props) => {
    const { data } = props;
    const dispatch = useDispatchRoot();
    const state1 = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetOpen,
    );
    const handlePress = () => {
        console.log('data: ', data);
        dispatch(setSheetOpeneded(!state1));
        dispatch(
            chooseProduct({
                name: data.name,
                data: data.data,
            }),
        );
    };
    return (
        <View style={{ width: 130, marginHorizontal: 5 }}>
            <TouchableOpacity onPress={handlePress}>
                <Image source={data.data.itemImg} style={styles.itemImage} />
                <View style={styles.overlay} />
            </TouchableOpacity>
            <View style={styles.priceContainer}>
                <View style={{ marginTop: 2 }}>
                    <MoneyIcon />
                </View>
                <Text style={styles.priceText}>
                    {data.data.price.toLocaleString('vi-VN')}đ
                </Text>
            </View>
            <View style={styles.boxShadow}>
                <View style={styles.textContainer}>
                    <Text style={styles.productName}>{data.name}</Text>
                </View>
            </View>
        </View>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    itemImage: {
        width: 130,
        height: 144,
    },
    productName: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
        // fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 32,
        left: 5,
    },
    priceText: {
        color: 'white',
        marginLeft: 5,
        justifyContent: 'center',
        fontFamily: 'Georgia',
        fontSize: 14,
    },
    boxShadow: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    textContainer: {
        // Thêm style để có thể áp dụng shadow cho View chứa Text
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20, // Chiều cao của vệt đen (có thể thay đổi)
        backgroundColor: '#000',
        opacity: 0.5, // Độ mờ của vệt đen (có thể thay đổi)
    },
});
