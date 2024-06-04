// import BottomSheet from '@gorhom/bottom-sheet';
// import { Products } from 'dummy-data/RestaurantMenu';
import { IOrderComponent } from 'common/define-types';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Portal } from 'react-native-paper';
import {
    deleteOrderComponent,
    updateCookNowComponent,
    updateCountComponent,
    updateNoteComponent,
} from 'store/slice/OrderSlice';
import { useDispatchRoot } from 'store/store';
import {
    BlueAddButton,
    BlueReduceButton,
    DeleteButton,
    FireIcon,
} from './Buttons';
interface Props {
    data: IOrderComponent;
    index: number;
    selected: boolean;
}

const ProductOrderItem: React.FC<Props> = (props: Props) => {
    const { data, selected } = props;
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState(data.notes);
    let notes = text;
    const maxLength = 200;
    const handleTextChange = (newText: any) => {
        if (newText.length <= maxLength) {
            setText(newText);
        }
    };
    const dispatch = useDispatchRoot();
    const index = props.index;
    const deleteItem = () => {
        setIsVisible(false);
        dispatch(deleteOrderComponent(index));
    };
    const [status, setStatus] = useState<string>('normal');
    const [count, setCount] = useState<number>(data.count);
    const [cookBoolean, setCookBoolean] = useState<boolean>(data.cookNow);
    const [totalPrice, setTotalPrice] = useState<number>(
        data.count * data.data.price,
    );
    const [openModal, setOpenModal] = useState<Boolean>(false);
    useEffect(() => {
        if (count === 1) {
            setStatus('disabled');
        }
        if (count > 1) {
            setStatus('normal');
        }
    }, [count]);
    const updateNotes = useCallback(
        (newNotes: string) => {
            setText(newNotes);
            dispatch(updateNoteComponent({ notes: newNotes, index }));
        },
        [dispatch, index],
    );

    const updateCookNow = useCallback(() => {
        setCookBoolean(!cookBoolean);
        dispatch(updateCookNowComponent({ cookNow: !cookBoolean, index }));
    }, [dispatch, cookBoolean, index]);

    const updateCount = useCallback(
        (newCount: number) => {
            setCount(newCount);
            dispatch(updateCountComponent({ count: newCount, index }));
        },
        [dispatch, index],
    );
    useEffect(() => {
        setText(data.notes);
        setCount(data.count);
        setCookBoolean(data.cookNow);
        setTotalPrice(data.count * data.data.price);

        // dispatch(
        //     updateNoteComponent({
        //         notes: text,
        //         index,
        //     }),
        // );
    }, [data]);
    useEffect(() => {
        setTotalPrice(count * data.data.price);
    });
    return isVisible ? (
        <View
            style={{
                flexDirection: 'row',
                marginLeft: 10,
                // padding: 5,
                // margin: 5,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: selected ? '#1890FF' : 'rgba(0, 0, 0, 0.25)',
                borderRadius: 10,
                width: 390,
            }}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 5, right: 5 }}
                onPress={deleteItem}>
                <DeleteButton />
            </TouchableOpacity>
            <View>
                <Image source={data.data.itemImg} style={styles.itemImage} />
            </View>
            <View style={{ padding: 8 }}>
                <Text
                    style={{
                        fontWeight: '400',
                        fontSize: 18,
                        paddingBottom: 4,
                    }}>
                    {data.name}
                </Text>
                <Text
                    style={{
                        color: '#5982CF',
                        fontSize: 17,
                        paddingBottom: 8,
                    }}>
                    {totalPrice.toLocaleString('vi-VN')} đ
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 5 }}
                            onPress={() => {
                                if (count > 2) {
                                    setCount(count - 1);
                                }
                                if (count === 2) {
                                    setCount(count - 1);
                                    setStatus('disabled');
                                } else {
                                    setStatus('disabled');
                                }
                                updateCount(count - 1);
                            }}>
                            <BlueReduceButton status={status} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 19, marginTop: -4 }}>
                            {count}
                        </Text>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 5 }}
                            onPress={() => {
                                setStatus('normal');
                                setCount(count + 1);
                                updateCount(count + 1);
                            }}>
                            <BlueAddButton />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: -15,
                                paddingLeft: 25,
                            }}>
                            <Icon
                                type="antdesign"
                                name="message1"
                                color={data.notes === '' ? '#5982CF' : 'red'}
                                iconStyle={{
                                    height: 28,
                                    width: 28,
                                    marginTop: 12,
                                    paddingLeft: 4,
                                }}
                                onPress={() => {
                                    setText(notes);
                                    setOpenModal(true);
                                }}
                            />
                            <TouchableOpacity
                                style={{ marginLeft: 15, marginTop: 8 }}
                                onPress={() => {
                                    setCookBoolean(!cookBoolean);
                                    updateCookNow();
                                }}>
                                <FireIcon
                                    status={cookBoolean ? 'priority' : 'normal'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {openModal && (
                <Portal>
                    <Modal
                        visible={true}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 20,
                            width: 300,
                            margin: '8%',
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Order Introductions
                        </Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 10 }}
                            onPress={() => {
                                setOpenModal(false);
                            }}>
                            <DeleteButton />
                        </TouchableOpacity>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 20 }}
                            keyboardShouldPersistTaps="handled">
                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={2}
                                placeholder={'E.g.: no green onion,...'}
                                value={text}
                                onChangeText={handleTextChange}
                            />
                            <Text
                                style={
                                    styles.characterCount
                                }>{`${notes.length}/${maxLength}`}</Text>
                        </ScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#5982CF',
                                    gap: 10,
                                    borderRadius: 100,
                                    marginLeft: 80,
                                    paddingHorizontal: 20,
                                    height: 39,
                                }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setOpenModal(false);
                                }}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#005BA5',
                                    gap: 10,
                                    borderRadius: 100,
                                    marginLeft: 20,
                                    paddingHorizontal: 20,
                                    height: 39,
                                }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    notes = text;
                                    setOpenModal(false);
                                    updateNotes(notes);
                                }}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>
            )}
        </View>
    ) : null;
};

export default ProductOrderItem;

const styles = StyleSheet.create({
    bottomSheetContent: {
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemImage: {
        width: 110,
        height: 110,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonImage: {
        width: 19,
        height: 17,
    },
    productName: {
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        left: 5,
    },
    priceText: {
        color: 'white',
        marginLeft: 5,
        justifyContent: 'center',
        fontFamily: 'Georgia',
        fontSize: 14,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    characterCount: {
        alignSelf: 'flex-end',
        color: 'grey',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
    },
});
