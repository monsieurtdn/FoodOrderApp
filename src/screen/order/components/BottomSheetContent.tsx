// import { MaharajaMac } from 'dummy-data/RestaurantMenu';
import { IOrderComponent } from 'common/define-types';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { RootState } from 'store/reducers';
import { addOrderComponent } from 'store/slice/OrderSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { BlueAddButton, BlueReduceButton, FireIcon } from './Buttons';

interface BottomSheetContentProps {
    onClose: () => void; // Props function để đóng BottomSheet
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({ onClose }) => {
    const dispatch = useDispatchRoot();
    const handleButtonPress = () => {
        onClose(); // Gọi hàm onClose để đóng BottomSheet khi người dùng bấm nút
    };
    const handleSendOrder = () => {
        dispatch(addOrderComponent(orderItem));
        handleButtonPress();
        setCount(1);
        setText('');
        setCookBoolean(false);
    };
    const [status, setStatus] = useState<string>('disabled');
    const [text, setText] = useState('');
    let notes = text;
    const [count, setCount] = useState(1);
    const [cookBoolean, setCookBoolean] = useState<boolean>(false);
    const chosenItem = useSelectorRoot(
        (state: RootState) => state.order.chosenProduct,
    );
    const orderItem: IOrderComponent = {
        name: chosenItem.name,
        data: chosenItem.data,
        count: count,
        notes: notes,
        cookNow: cookBoolean,
    };
    const maxLength = 200;
    const handleTextChange = (newText: any) => {
        if (newText.length <= maxLength) {
            notes = newText;
            setText(newText);
        }
    };
    useEffect(() => {
        if (count > 1) {
            setStatus('normal');
        }
    }, [count]);
    return (
        <View style={styles.bottomSheetContent}>
            <View>
                <Image
                    source={chosenItem.data.orderImg}
                    style={{
                        height: 207,
                        width: 390,
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 15,
                        paddingHorizontal: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {chosenItem.name}
                    </Text>
                    <Text style={{ fontSize: 20 }}>
                        {chosenItem.data.price.toLocaleString('vi-VN')} đ
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 16,
                        color: 'gray',
                        paddingHorizontal: 10,
                    }}>
                    Nutritional value: {chosenItem.data.nutrition} kcal
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingTop: 5,
                        paddingHorizontal: 10,
                    }}>
                    Notes:
                </Text>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ paddingHorizontal: 10 }}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={2}
                        placeholder="E.g.: no green onion,..."
                        value={text}
                        onChangeText={handleTextChange}
                    />
                    <Text
                        style={
                            styles.characterCount
                        }>{`${text.length}/${maxLength}`}</Text>
                </ScrollView>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginRight: 10,
                        }}>
                        Cook now
                    </Text>
                    <TouchableOpacity
                        style={{ marginTop: -8, marginBottom: 10 }}
                        onPress={() => {
                            setCookBoolean(!cookBoolean);
                        }}>
                        <FireIcon
                            status={cookBoolean ? 'priority' : 'default'}
                        />
                    </TouchableOpacity>
                </View>
                <Divider />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 20,
                        paddingTop: 5,
                    }}>
                    <Text style={{ color: 'black', paddingLeft: 10 }}>
                        {(chosenItem.data.price * count).toLocaleString(
                            'vi-VN',
                        )}{' '}
                        đ
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8 }}
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
                            }}>
                            <BlueReduceButton status={status} />
                        </TouchableOpacity>
                        <Text>{count}</Text>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 8 }}
                            onPress={() => {
                                setStatus('normal');
                                setCount(count + 1);
                            }}>
                            <BlueAddButton />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005BA5',
                        gap: 10,
                        borderRadius: 20,
                        marginHorizontal: 25,
                        height: 40,
                        width: 351,
                    }}
                    activeOpacity={0.7}
                    onPress={handleSendOrder}>
                    <Text style={styles.buttonText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default BottomSheetContent;
const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        width: 390,
        height: 52,
    },
    characterCount: {
        alignSelf: 'flex-end',
        color: 'grey',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
