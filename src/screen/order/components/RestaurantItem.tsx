import { IProduct } from 'common/define-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootState } from 'store/reducers';
import { chooseProduct, setResSheetOpeneded } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { MoneyIcon } from './Buttons';
// import BottomSheet from '@gorhom/bottom-sheet';
interface Props {
    data: IProduct;
}

const RestaurantItem: React.FC<Props> = (props: Props) => {
    const { data } = props;
    const dispatch = useDispatchRoot();
    const state1 = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetResOpen,
    );
    const handlePress = () => {
        dispatch(setResSheetOpeneded(!state1));
        dispatch(
            chooseProduct({
                name: data.name,
                data: data.data,
            }),
        );
    };
    return (
        <View style={{ width: 160, marginBottom: 15 }}>
            <TouchableOpacity onPress={handlePress}>
                <Image source={data.data.itemImg} style={styles.itemImage} />
                <View style={styles.overlay} />
            </TouchableOpacity>
            <View style={styles.priceContainer}>
                <TouchableOpacity style={{ marginTop: 2 }}>
                    <MoneyIcon />
                </TouchableOpacity>
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

export default RestaurantItem;

const styles = StyleSheet.create({
    bottomSheetContent: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemImage: {
        width: 160,
        height: 209,
    },
    buttonImage: {
        width: 19,
        height: 17,
    },
    productName: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: -10,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 27,
        left: 5,
    },
    priceText: {
        color: 'white',
        marginLeft: 4,
        marginBottom: 15,
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
        paddingBottom: 10,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30, // Chiều cao của vệt đen (có thể thay đổi)
        backgroundColor: '#000',
        opacity: 0.5, // Độ mờ của vệt đen (có thể thay đổi)
    },
});
