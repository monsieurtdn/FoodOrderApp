import Utils from 'common/Utils';
import { IdentifyType } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setSelectedType } from 'store/slice/ScanSlice';
import { useDispatchRoot } from 'store/store';

export const SelectScanType = ({ navigation }: { navigation: any }) => {
    const types = [
        {
            label: '(ID card) Căn cước công dân',
            type: IdentifyType.CCCD,
        },
        {
            label: '(Passport) Hộ chiếu',
            type: IdentifyType.Passport,
        },
        {
            label: '(ID card) Căn cước công dân có gắn chip',
            type: IdentifyType.QR,
        },
    ];
    const dispatch = useDispatchRoot();
    const handleSelectType = (type: IdentifyType) => {
        if (type === IdentifyType.QR) {
            navigation.navigate(Screen.ScanScreen.qrScan);
            dispatch(setSelectedType(type));
        } else {
            navigation.navigate(Screen.ScanScreen.IdentificationScan);
            dispatch(setSelectedType(type));
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    fontSize: Utils.getFontSize(16),
                    fontWeight: '500',
                    paddingVertical: 10,
                }}>
                Chọn loại giấy tờ
            </Text>
            <View style={styles.typesContainer}>
                {types.map(item => (
                    <TouchableOpacity
                        onPress={() => handleSelectType(item.type)}
                        key={item.label}>
                        <View style={styles.typeItem}>
                            <View style={styles.typeItemWrapper}>
                                <Text>{item.label}</Text>
                                <MaterialCommunityIcons
                                    name={'chevron-right'}
                                    color={'black'}
                                    size={30}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    typesContainer: {
        flexDirection: 'column',
        gap: 10,
    },
    typeItem: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: 'white',
        padding: 16,
    },
    typeItemWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
