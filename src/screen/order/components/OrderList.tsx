import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { RootState } from 'store/reducers';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { ArrowDownButton, ArrowUpButton } from './Buttons';
import OrderItem from './OrderItem';

const OrderList: React.FC<any> = () => {
    const dispatch = useDispatchRoot();
    const listData = useSelectorRoot(
        (state: RootState) => state.order.confirmedComponents,
    );
    const [items, setItems] = useState<any[]>(listData);

    const [statusUp, setStatusUp] = useState<string>('normal');
    const [statusDown, setStatusDown] = useState<string>('normal');

    const [selectItem, setSelectItem] = useState<number>(0);
    useEffect(() => {
        console.log('listData', listData);
        // dispatch(updateListComponent(items));
    }, [items]);
    useEffect(() => {
        if (selectItem === 0) {
            setStatusUp('disabled');
            setStatusDown('normal');
        } else if (selectItem > 0 && selectItem < items.length - 1) {
            setStatusUp('normal');
            setStatusDown('normal');
        } else if (selectItem === items.length - 1) {
            setStatusUp('normal');
            setStatusDown('disabled');
        }
    }, [selectItem]);

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectItem(index);
                }}>
                <OrderItem
                    data={item}
                    index={index}
                    selected={selectItem === index}
                />
            </TouchableOpacity>
        );
    };

    function swapArrayElements<T>(
        array: T[],
        index1: number,
        index2: number,
    ): T[] {
        const newArray: T[] = [...array];

        // Đảm bảo index1 và index2 nằm trong phạm vi của mảng
        if (
            index1 >= 0 &&
            index1 < newArray.length &&
            index2 >= 0 &&
            index2 < newArray.length
        ) {
            // Chuyển đổi vị trí của item được chọn lên hoặc xuống 1 đơn vị
            [newArray[index1], newArray[index2]] = [
                newArray[index2],
                newArray[index1],
            ];
        }

        return newArray;
    }

    const handleUp = () => {
        if (selectItem > 0) {
            setItems(swapArrayElements(items, selectItem, selectItem - 1));
            setSelectItem(selectItem - 1);
        }
    };

    const handleDown = () => {
        if (selectItem < items.length - 1) {
            setItems(swapArrayElements(items, selectItem, selectItem + 1));
            setSelectItem(selectItem + 1);
        }
    };

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        height: 20,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                    <IconButton
                        style={{ width: 16, height: 16 }}
                        size={17}
                        icon="information-outline"
                    />
                    <Text
                        style={{
                            opacity: 0.45,
                            color: '#000000',
                            fontSize: 12,
                            fontStyle: 'italic',
                            marginTop: 5,
                            marginRight: 175,
                        }}>
                        Sort your dishes by priority
                    </Text>
                    <ArrowUpButton onPress={handleUp} status={statusUp} />
                    <ArrowDownButton onPress={handleDown} status={statusDown} />
                </View>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.scrollView}
                    scrollEnabled={true}
                    nestedScrollEnabled
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 20,
    },
    scrollView: {
        marginVertical: 10,
    },
});

export default OrderList;
