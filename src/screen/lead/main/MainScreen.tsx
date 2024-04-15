// import { Checkbox } from '@ant-design/react-native';
import { Screen } from 'common/screenEnums';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    VirtualizedList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { IOperationCenterByDepartmentId } from 'store/controls/AdminEpic';
import { getEmployeeInfo } from 'store/controls/EmployeeEpic';
import {
    setOperationCenterList,
    setSelectedOpeationCenter,
} from 'store/controls/HomeEpic';
import { useSelectorRoot } from 'store/store';
import OperatorBox from './components/OperatorBox';

interface IMainScreen {
    navigation: any;
}

const MainScreen: React.FC<IMainScreen> = props => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const { listOperationByDepartmentId } = useSelectorRoot(
        state => state.admin,
    );

    const [listOC, setOC] = useState<IOperationCenterByDepartmentId[]>([]);

    const handleSelecOperationCenter = (
        company: IOperationCenterByDepartmentId,
    ) => {
        dispatch(setSelectedOpeationCenter(company));
        navigation.navigate(Screen.TabScreen.homeScreen);
    };

    // console.log(userInfo, 'userInfo');
    // console.log(token);

    // const datajson = {
    //     name: 'Minh',
    //     age: 23,
    // };

    // const jsonString = JSON.stringify(datajson);
    // console.log(jsonString); // In ra chuỗi JSON

    // const jsonObject = JSON.parse(jsonString);
    // console.log(typeof jsonObject);

    // console.log(employeeInfo, 'employeeInfo');
    // console.log(listOperationByDepartmentId, 'listOperationByDepartmentId');
    useEffect(() => {
        dispatch(getEmployeeInfo());
    }, []);

    useEffect(() => {
        if (listOperationByDepartmentId) {
            setOC(listOperationByDepartmentId);
            dispatch(setOperationCenterList(listOperationByDepartmentId));
        }
    }, [listOperationByDepartmentId]);

    return (
        <SafeAreaView style={styles.modalContainer}>
            <StatusBar backgroundColor={'#005BA5'} barStyle={'dark-content'} />
            <View style={styles.modalContentHeadAndBody}>
                <View style={styles.modalContentHead}>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                            flexShrink: 1,
                            maxWidth: '100%',
                        }}>
                        Welcome to PerfectKey!
                    </Text>
                    <TouchableOpacity
                        style={{
                            // width: '15%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.4,
                            borderRadius: 99,
                        }}
                        activeOpacity={0.5}
                        onPress={() =>
                            navigation.navigate(Screen.TabScreen.name, {
                                screen: Screen.ProfileScreen.profile,
                            })
                        }>
                        <Image
                            source={require('../../../../image/user.png')}
                            style={{
                                resizeMode: 'contain',
                                margin: 12,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <VirtualizedList
                    data={listOC}
                    initialNumToRender={5}
                    maxToRenderPerBatch={7}
                    renderItem={({ item }) => (
                        <OperatorBox
                            key={item.id}
                            operationCenter={item}
                            handleSelecOperationCenter={
                                handleSelecOperationCenter
                            }
                        />
                    )}
                    keyExtractor={(item: IOperationCenterByDepartmentId) =>
                        item.id + ''
                    }
                    getItemCount={() => listOC.length}
                    getItem={(data: IOperationCenterByDepartmentId[], idx) =>
                        data[idx]
                    }
                />
                {/* <ScrollView
                    style={{
                        flex: 1,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingHorizontal: 20,
                    }}>
                    {listOC.map((operationCenter, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: '100%',
                                    height: 250,
                                    borderWidth: 0.1,
                                    borderColor: 'rgba(217, 217, 217, 1)',
                                    borderRadius: 7,
                                    marginBottom: 15,
                                    elevation: 3,
                                }}
                                onPress={() =>
                                    handleSelecOperationCenter(operationCenter)
                                }>
                                <Image
                                    source={require('../../../../image/cover.png')}
                                    style={{
                                        resizeMode: 'cover',
                                        width: '100%',
                                        height: '75%',
                                        borderTopRightRadius: 5,
                                        borderTopLeftRadius: 5,
                                    }}
                                />
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
                                                {'-'}
                                                {operationCenter.id}
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
                        );
                    })}
                </ScrollView> */}
            </View>

            {/* <View style={styles.footerStyle}>
                <TouchableOpacity
                    onPress={() => {
                        handleNavigateFaceCheckScreen();
                    }}
                    activeOpacity={0.5}
                    style={styles.button}>
                    <Text style={styles.buttonText}> {'Điểm danh'}</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        position: 'relative',
    },
    modalContentHeadAndBody: {
        flex: 1,
        width: '100%',
        // paddingVertical: 10,
    },
    modalContentHead: {
        width: '100%',
        // backgroundColor: '#005BA5', //Set Header color
        height: 70,
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerLeftStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
    },
    cTextInputStyle: {
        backgroundColor: 'rgba(241, 241, 241, 1)',
        paddingLeft: 1,
        paddingRight: 1,
        height: 43,
    },
    button: {
        borderRadius: 30,
        width: '100%',
        height: 45,
        color: '#FFFFFF',
        backgroundColor: '#005BA5',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        // fontWeight: '500'
    },
    footerStyle: {
        borderRadius: 5,
        width: '100%',
        // height: 35,
        // marginTop: 670,
        // display: 'flex',
        // flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
});

export default MainScreen;
