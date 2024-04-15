import { IProduct } from 'common/define-types';
import { Products } from 'dummy-data/RestaurantMenu';
import React, { ReactElement, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootState } from 'store/reducers';
import { chooseProduct, setResSheetOpeneded } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';

export const SearchList: React.FC = () => {
    const listData = useSelectorRoot(
        (state: RootState) => state.order.listProduct,
    );
    const [items, setItems] = useState<ReactElement[]>([]);
    useEffect(() => {
        const res: ReactElement[] = [];
        listData.map(item => {
            res.push(<SearchItem data={item} />);
        });
        setItems(res);
    }, [listData]);

    return <ScrollView>{items}</ScrollView>;
};
interface Props {
    data: IProduct;
}
const SearchItem: React.FC<Props> = (props: Props) => {
    const { data } = props;
    const dispatch = useDispatchRoot();
    const state1 = useSelectorRoot(
        (state: RootState) => state.order.isBottomSheetResOpen,
    );
    const handlePress = () => {
        dispatch(setResSheetOpeneded(!state1));
        dispatch(chooseProduct(Products[`${data.name}`]));
    };
    return (
        <TouchableOpacity
            style={{ paddingVertical: 5, marginHorizontal: 10 }}
            onPress={handlePress}>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 8,
                    // padding: 5,
                    // margin: 5,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: 10,
                }}>
                <View>
                    <Image
                        source={data.data.itemImg}
                        style={{
                            width: 110,
                            height: 110,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                        }}
                    />
                </View>
                <View style={{ paddingLeft: 20, paddingTop: 15 }}>
                    <Text
                        style={{
                            fontWeight: '400',
                            fontSize: 20,
                            paddingBottom: 10,
                        }}>
                        {data.name}
                    </Text>

                    <Text
                        style={{
                            fontWeight: '400',
                            fontSize: 19,
                            paddingBottom: 4,
                            color: '#5982CF',
                        }}>
                        {data.data.price.toLocaleString('vi-VN')} đ
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
