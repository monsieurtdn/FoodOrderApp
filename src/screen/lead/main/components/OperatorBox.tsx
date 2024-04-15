import { View, Text, Image } from 'react-native';
import React from 'react';
import { IOperationCenterByDepartmentId } from 'store/controls/AdminEpic';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

type Props = {
    operationCenter: IOperationCenterByDepartmentId;
    handleSelecOperationCenter: (
        company: IOperationCenterByDepartmentId,
    ) => void;
};
const Images = [
    require('../../../../../image/cover2.png'),
    require('../../../../../image/cover2.png'),
    require('../../../../../image/cover2.png'),
    require('../../../../../image/cover2.png'),
];
const OperatorBox = (props: Props) => {
    const { operationCenter, handleSelecOperationCenter } = props;
    const renderImg = () => {
        return (
            <Image
                source={Images[operationCenter.index - 1]}
                style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '75%',
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                }}
            />
        );
    };
    return (
        <View
            style={{
                // width: '100%',
                height: 250,
                display: 'flex',
                marginVertical: 7,
                flexDirection: 'row',
                justifyContent: 'center',
                // backgroundColor: 'red',
                // alignItems: 'center',
                marginHorizontal: 20,
            }}>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 250,
                    borderWidth: 0.7,
                    borderColor: 'rgba(217, 217, 217, 1)',
                    borderRadius: 7,
                    marginBottom: 15,
                    // elevation: 10,
                    // paddingHorizontal: 20,
                }}
                onPress={() => handleSelecOperationCenter(operationCenter)}>
                {renderImg()}
                <View
                    style={{
                        width: '100%',
                        height: '25%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        // backgroundColor: 'red',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor: 'red',
                            paddingHorizontal: 20,
                        }}
                        // onPress={() =>
                        //     handleSelecCompany(operationCenter)
                        // }
                    >
                        <View style={{ width: '80%' }}>
                            <Text
                                style={{
                                    fontWeight: '500',
                                    fontSize: 16,
                                }}>
                                {operationCenter.name}
                            </Text>
                        </View>
                        <IconButton
                            style={{ width: '20%' }}
                            icon={'chevron-right'}
                            // onPress={() =>
                            //     console.log('đang search')
                            // }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default OperatorBox;
