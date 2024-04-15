// import { Checkbox } from '@ant-design/react-native';
import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import CTextInput from 'components/CTextInput';
import DropDown from 'components/DropDown';
import Loader from 'components/Loader';
import { format } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    VirtualizedList,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Checkbox, IconButton } from 'react-native-paper';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { IOperationCenterByDepartmentId } from 'store/controls/AdminEpic';
import {
    IEmployeeOfOperator,
    getAllEmployee,
    saveMealInfomation,
} from 'store/controls/AttendanceEpic';
import { createNote, updateNote } from 'store/controls/NoteEpic';
import { getAllShifts } from 'store/controls/ShiftsEpic';
import { useSelectorRoot } from 'store/store';
import CheckInHistoryModal from './components/CheckInHistoryModal';
import EmployeeAttendance from './components/EmployeeAttendance';
import NoteModal from './components/NoteModal';
import AddWorkingTimeModal from './components/AddWorkingTimeModal';

interface IJobScreen {
    navigation: any;
}

const JobScreen: React.FC<IJobScreen> = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    // const { latitude, longitude } = useLocationHook();
    // console.log(
    //     JSON.stringify({
    //         latitude: latitude,
    //         longitude: longitude,
    //     }),
    // );

    // const { userJWT } = useSelectorRoot(state => state.login);
    // const { clickedShift } = useSelectorRoot(state => state.home);
    const { seletedOperation } = useSelectorRoot(state => state.home);
    const { employeeOfOperator, saveMeal, loading } = useSelectorRoot(
        state => state.attendance,
    );
    console.log(saveMeal, 'saveMeal');
    // const { allShifts } = useSelectorRoot(state => state.shift);
    const { workingTime } = useSelectorRoot(state => state.persist);

    // const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const [employeeList, setEmployeeList] = useState<IEmployeeOfOperator[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [note, setNote] = useState('');
    const [visibleNotePopup, setVisibleNotePopup] = useState(false);
    const [visibleCheckInHistoryPopup, setVisibleCheckInHistoryPopup] =
        useState(false);
    const [isCheckAllMeal1, setIsCheckAllMeal1] = useState(false);
    const [isCheckAllMeal2, setIsCheckAllMeal2] = useState(false);

    const [currentDateString, setCurrentDateString] = useState<string>('');
    const [selectedEmployee, setSelectedEmployee] =
        useState<IEmployeeOfOperator>();
    const [checkInTimeList, setCheckInTimeList] = useState<string[]>([]);
    // const [date, setDate] = useState(new Date());

    const departmentOptions = [
        { label: 'Tất cả bộ phận', value: 0 },
        { label: 'An ninh', value: 1 },
        { label: 'Vệ sinh', value: 2 },
        { label: 'Văn phòng', value: 3 },
        { label: 'Kỹ thuật', value: 4 },
    ];
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const workingTimeOptions = workingTime?.map(time => {
        const startTime = time.startTime.slice(0, 5);
        const endTime = time.endTime.slice(0, 5);

        return {
            label: `${startTime} -> ${endTime}`,
            value: `${time.startTime},${time.endTime}`,
        };
    });
    console.log(workingTimeOptions, 'workingTimeOptions');

    const [selectedWorkingTime, setSelectedWorkingTime] = useState<any>(null);

    const aa = selectedWorkingTime as string;
    console.log(aa?.split(','), 'selectedWorkingTime');
    // const [workingTimePlaceHolder, setWorkingTimePlaceHolder] = useState('');
    const [visibleAddWorkingTimePopup, setVisibleAddWorkingTimePopup] =
        useState(false);

    const handleOpenAddWorkingTimePopup = () => {
        setVisibleAddWorkingTimePopup(true);
    };

    const handleCloseAddWorkingTimePopup = () => {
        setVisibleAddWorkingTimePopup(false);
    };

    const handleGetAllEmployee = (
        seletedOperationn: IOperationCenterByDepartmentId,
    ) => {
        dispatch(
            getAllEmployee({
                OperatorId: seletedOperationn.id,
                Date: Utils.formatDateCallApi(new Date()),
            }),
        );
    };

    // const handleSearch = (value: string) => {
    //     clearTimeout(timer);
    //     setEmployeeName(value);
    //     const timeoutId = setTimeout(() => {
    //         if (value) {
    //             if (seletedOperation) {
    //                 dispatch(
    //                     getAllEmployee({
    //                         OperatorId: seletedOperation.id,
    //                         Date: Utils.formatDateCallApi(new Date()),
    //                         Name: value,
    //                     }),
    //                 );
    //             }
    //         } else {
    //             if (seletedOperation) {
    //                 dispatch(
    //                     getAllEmployee({
    //                         OperatorId: seletedOperation.id,
    //                         Date: Utils.formatDateCallApi(new Date()),
    //                     }),
    //                 );
    //             }
    //         }
    //     }, 1500);
    //     setTimer(timeoutId);
    // };

    const handleSearch = () => {
        if (employeeName) {
            if (seletedOperation) {
                dispatch(
                    getAllEmployee({
                        OperatorId: seletedOperation.id,
                        Date: Utils.formatDateCallApi(new Date()),
                        Name: employeeName,
                    }),
                );
            }
        } else {
            if (seletedOperation) {
                dispatch(
                    getAllEmployee({
                        OperatorId: seletedOperation.id,
                        Date: Utils.formatDateCallApi(new Date()),
                    }),
                );
            }
        }
    };

    const handleClickMealCheckbox = (
        employee: IEmployeeOfOperator,
        mealIdx: number,
    ) => {
        let newList = JSON.parse(
            JSON.stringify(employeeList),
        ) as IEmployeeOfOperator[];
        const index = newList.findIndex(item => item.id === employee.id);
        if (index !== -1) {
            const emp = newList[index];
            // let mealInfo = emp.employeeDate[0].meals[0].information;

            const meal1 = emp.employeeDate[0].meals[0].meal1;
            const meal2 = emp.employeeDate[0].meals[0].meal2;
            const objMeal: {
                meal1: number;
                meal2: number;
            } = {
                meal1: meal1 ? meal1 : 0,
                meal2: meal2 ? meal2 : 0,
            };

            if (mealIdx === 1) {
                objMeal.meal1 = objMeal.meal1 ? 0 : 1;
            }
            if (mealIdx === 2) {
                objMeal.meal2 = objMeal.meal2 ? 0 : 1;
            }
            emp.employeeDate[0].meals[0].information = JSON.stringify(objMeal);
            emp.employeeDate[0].meals[0].meal1 = objMeal.meal1;
            emp.employeeDate[0].meals[0].meal2 = objMeal.meal2;
            setEmployeeList(newList);
        }
    };

    const handleCheckAllMeal = (mealIdx: number) => {
        if (employeeList) {
            let newList = JSON.parse(
                JSON.stringify(employeeList),
            ) as IEmployeeOfOperator[];
            newList.map(employee => {
                const emp = { ...employee };
                // let mealInfo = emp.employeeDate[0].meals[0].information;
                const meal1 = emp.employeeDate[0].meals[0].meal1;
                const meal2 = emp.employeeDate[0].meals[0].meal2;
                const objMeal: {
                    meal1: number;
                    meal2: number;
                } = {
                    meal1: meal1 ? meal1 : 0,
                    meal2: meal2 ? meal2 : 0,
                };
                if (mealIdx === 1) {
                    if (!isCheckAllMeal1) {
                        objMeal.meal1 = 1;
                    } else {
                        objMeal.meal1 = 0;
                    }
                    // objMeal.meal1 = objMeal.meal1 ? 0 : 1;
                }
                if (mealIdx === 2) {
                    if (!isCheckAllMeal2) {
                        objMeal.meal2 = 1;
                    } else {
                        objMeal.meal2 = 0;
                    }
                    // objMeal.meal2 = objMeal.meal2 ? 0 : 1;
                }
                emp.employeeDate[0].meals[0].information =
                    JSON.stringify(objMeal);
                emp.employeeDate[0].meals[0].meal1 = objMeal.meal1;
                emp.employeeDate[0].meals[0].meal2 = objMeal.meal2;
            });
            setEmployeeList(newList);
            if (mealIdx === 1) {
                setIsCheckAllMeal1(!isCheckAllMeal1);
            }
            if (mealIdx === 2) {
                setIsCheckAllMeal2(!isCheckAllMeal2);
            }
        }
    };

    const handleSaveMeal = () => {
        if (employeeList && seletedOperation) {
            const initMeal = { meal1: 0, meal2: 0 };
            let saveMealInfoList = employeeList.map(employee => {
                const meal = [
                    {
                        employeeDateId:
                            employee.employeeDate[0].meals[0].employeeDateId,
                        id: employee.employeeDate[0].meals[0].id,
                        information: employee.employeeDate[0].meals[0]
                            .information
                            ? employee.employeeDate[0].meals[0].information
                            : JSON.stringify(initMeal),
                    },
                ];
                return {
                    // ...employee,
                    employeeDate: [
                        {
                            id: employee.employeeDate[0].id,
                            date: employee.employeeDate[0].date,
                            employeeFaceId:
                                employee.employeeDate[0].employeeFaceId,
                            meals: meal,
                        },
                    ],
                };
            });
            console.log(saveMealInfoList, 'saveMealInfoList');
            dispatch(
                saveMealInfomation({
                    searchName: employeeName,
                    employeeDate: saveMealInfoList,
                    operatorId: seletedOperation.id,
                }),
            );
            // if (seletedOperation) {
            //     handleGetAllEmployee(seletedOperation);
            // }
            // navigation.navigate(Screen.TabScreen.homeScreen);
        }
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            const granted = await check(PERMISSIONS.IOS.CAMERA);
            if (granted !== RESULTS.GRANTED) {
                const permissionResult = await request(PERMISSIONS.IOS.CAMERA);
                return permissionResult === RESULTS.GRANTED;
            } else {
                return true;
            }
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Access Required',
                    message: 'This App needs to Access your camera',
                    buttonPositive: 'Mở cài đặt',
                },
            );
            console.log(granted, 'granted android camera');
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const granted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (granted !== RESULTS.GRANTED) {
                const permissionResult = await request(
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                );

                return permissionResult === RESULTS.GRANTED;
            } else {
                return true;
            }
        } else {
            const granted = await check(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );
            if (granted !== RESULTS.GRANTED) {
                const permissionResult = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );

                return permissionResult === RESULTS.GRANTED;
            } else {
                return true;
            }
        }
    };

    const handleNavigateFaceCheckScreen = async () => {
        requestCameraPermission().then(result => {
            if (result === true) {
                requestLocationPermission().then(resultt => {
                    if (resultt === true) {
                        navigation.replace(Screen.TabScreen.faceCheckScreen);
                    } else {
                        showMessage({
                            message:
                                'Bạn đã từ chối cấp quyền truy cập vị trí. Hãy vào setting để bật quyền truy cập',
                            type: 'warning',
                        });
                    }
                });
            } else {
                showMessage({
                    message:
                        'Bạn đã từ chối cấp quyền truy cập camera. Hãy vào setting để bật quyền truy cập',
                    type: 'warning',
                });
            }
        });
    };

    const handleSelectEmployee = (employee: IEmployeeOfOperator) => {
        setSelectedEmployee(employee);
        if (employee.employeeDate[0].notes.length > 0) {
            const notee =
                employee.employeeDate[0].notes[
                    employee.employeeDate[0].notes.length - 1
                ].content;
            setNote(employee.employeeDate[0].notes.length > 0 ? notee : '');
        } else {
            setNote('');
        }

        let checkInTime = employee.employeeDate[0].checkInTime;
        const newDateList = checkInTime
            .map(checkTime => Utils.convertToLocalTime(checkTime.date))
            .sort((a, b) => a.getTime() - b.getTime());
        console.log(
            newDateList.map(time => moment(time).format('HH:mm')),
            'newDateList',
        );
        setCheckInTimeList(
            newDateList.map(time => moment(time).format('HH:mm')),
        );

        // const startTime1 = new Date();
        // startTime1.setHours(7);
        // const endTime1 = new Date();
        // endTime1.setHours(11, 30);
        // const dt1 = newDateList
        //     .filter(
        //         x =>
        //             x.getTime() >= startTime1.getTime() &&
        //             x.getTime() <= endTime1.getTime(),
        //     )
        //     .sort((a, b) => a.getTime() - b.getTime());
        // setEmployeeAttendanceShift1(
        //     dt1.map(time => moment(time).format('HH:mm')),
        // );

        // const startTime2 = new Date();
        // startTime2.setHours(13, 30);
        // const endTime2 = new Date();
        // endTime2.setHours(18, 30);
        // const dt2 = newDateList
        //     .filter(
        //         x =>
        //             x.getTime() >= startTime2.getTime() &&
        //             x.getTime() <= endTime2.getTime(),
        //     )
        //     .sort((a, b) => a.getTime() - b.getTime());
        // setEmployeeAttendanceShift2(
        //     dt2.map(time => moment(time).format('HH:mm')),
        // );
    };

    const handleOpenNotePopup = () => {
        setVisibleNotePopup(true);
    };

    const handleCloseNotePopup = () => {
        setVisibleNotePopup(false);
        setNote('');
    };

    const handleOpenCheckInHistoryPopup = () => {
        setVisibleCheckInHistoryPopup(true);
    };

    const handleCloseCheckInPopup = () => {
        setVisibleCheckInHistoryPopup(false);
        setNote('');
    };

    const handleSaveNote = () => {
        // console.log(selectedEmployee, 'selectedEmployee');
        // console.log(note, 'note');
        if (selectedEmployee && note && seletedOperation) {
            let noteId = '';
            const notes = selectedEmployee.employeeDate[0].notes;
            if (notes.length > 0) {
                noteId = notes[notes.length - 1].id;
            }
            // console.log(noteId, 'noteId');
            if (noteId) {
                const updateNoteData = {
                    searchName: employeeName,
                    body: {
                        employeeDateId: selectedEmployee.employeeDate[0].id,
                        content: note,
                    },
                    id: noteId,
                    seletedOperationId: seletedOperation.id,
                };
                // console.log(updateNoteData, 'updateNoteData');
                dispatch(updateNote(updateNoteData));
            } else {
                const createNoteData = {
                    searchName: employeeName,
                    seletedOperationId: seletedOperation.id,
                    employeeFaceId: selectedEmployee.id,
                    employeeDateId: selectedEmployee.employeeDate[0].id,
                    date: new Date().toISOString().split('T')[0],
                    content: note,
                };
                // console.log(createNoteData);
                dispatch(createNote(createNoteData));
            }
            handleCloseNotePopup();
            if (seletedOperation) {
                handleGetAllEmployee(seletedOperation);
            }
        }
    };

    useEffect(() => {
        if (seletedOperation) {
            handleGetAllEmployee(seletedOperation);
            const now = new Date();
            const formattedDate = format(now, 'dd-MM-yyyy');
            setCurrentDateString(formattedDate);
        }
    }, [seletedOperation]);

    useEffect(() => {
        if (seletedOperation) {
            if (!employeeName) {
                dispatch(
                    getAllEmployee({
                        OperatorId: seletedOperation.id,
                        Date: Utils.formatDateCallApi(new Date()),
                    }),
                );
            }
        }
    }, [employeeName]);

    // useEffect(() => {
    //     if (loading) {
    //         setIsLoading(loading);
    //     }
    // }, [loading]);

    useEffect(() => {
        if (employeeOfOperator) {
            setEmployeeList(employeeOfOperator);
        }
    }, [employeeOfOperator]);

    useEffect(() => {
        if (employeeList) {
            const isCheckAllMeal_1 = employeeList.every(
                employee => employee.employeeDate[0].meals[0].meal1 === 1,
            );
            const isCheckAllMeal_2 = employeeList.every(
                employee => employee.employeeDate[0].meals[0].meal2 === 1,
            );
            // console.log(isCheckAllMeal_1, 'isCheckAllMeal_1');
            // console.log(isCheckAllMeal_2, 'isCheckAllMeal_2');
            setIsCheckAllMeal1(isCheckAllMeal_1);
            setIsCheckAllMeal2(isCheckAllMeal_2);
        }
    }, [employeeList]);

    useEffect(() => {
        dispatch(getAllShifts());
    }, []);

    // console.log(loading, 'loading');
    // console.log(isLoading, 'isLoading');

    return (
        <SafeAreaView style={styles.modalContainer}>
            <Loader loading={loading} />
            <View style={styles.modalContentHeadAndBody}>
                <View style={styles.modalContentHead}>
                    <View style={styles.headerLeftStyle}>
                        <IconButton
                            icon={'arrow-left'}
                            iconColor={'#FFFFFF'}
                            size={30}
                            onPress={() => {
                                navigation.navigate(
                                    Screen.TabScreen.name,
                                    'Main',
                                );
                            }}
                        />
                        <Text style={styles.headerTextStyle}>
                            {`Công việc ${currentDateString}`}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        // height: 60,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                        paddingHorizontal: 20,
                    }}>
                    <View style={{ width: '40%' }}>
                        <DropDown
                            // label="Loại phát sinh"
                            items={departmentOptions}
                            selectedValue={selectedDepartment}
                            onSetSelectedValue={setSelectedDepartment}
                            placeholder="Bộ phận"
                        />
                    </View>
                    <View style={{ width: '47%' }}>
                        <DropDown
                            // label="Loại phát sinh"
                            items={workingTimeOptions ? workingTimeOptions : []}
                            selectedValue={selectedWorkingTime}
                            onSetSelectedValue={setSelectedWorkingTime}
                            placeholder="Thời gian làm việc"
                        />
                    </View>
                    <IconButton
                        style={{
                            height: 25,
                            width: 25,
                            // backgroundColor: 'red',
                        }}
                        icon={'plus'}
                        size={25}
                        onPress={() => {
                            handleOpenAddWorkingTimePopup();
                        }}
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 70,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}>
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // paddingHorizontal: 30,
                        }}>
                        <View
                            style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // paddingHorizontal: 30,
                            }}>
                            <CTextInput
                                value={employeeName}
                                onChangeText={text => setEmployeeName(text)}
                                placeholder="Tìm kiếm nhân sự"
                                onSubmitEditing={Keyboard.dismiss}
                                rightComponnent={
                                    <IconButton
                                        icon={'account-search-outline'}
                                        size={20}
                                        onPress={() => handleSearch()}
                                    />
                                }
                                placeholderTextColor={'rgba(0, 0, 0, 0.25)'}
                                style={{ height: 40, paddingRight: 5 }}
                            />
                        </View>
                        <View
                            style={{
                                width: '30%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: 'red',
                                // paddingHorizontal: 30,
                            }}>
                            {/* <Image
                                source={require('../../../../image/rice.png')}
                            /> */}
                            <TouchableOpacity
                                style={{
                                    width: '80%',
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    backgroundColor:
                                        'rgba(24, 144, 255, 1)                                ',
                                }}
                                activeOpacity={0.5}
                                onPress={() => handleSaveMeal()}>
                                <Text style={{ color: '#FFFFFF' }}>
                                    Lưu cơm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        // height: 30,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}>
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // paddingHorizontal: 30,
                        }}>
                        <View
                            style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                // paddingHorizontal: 30,
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500',
                                }}>
                                Nhân sự ({employeeList.length})
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '30%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                style={{
                                    width: 45,
                                    height: 45,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // backgroundColor: 'red'
                                }}
                                onPress={() => {
                                    handleCheckAllMeal(1);
                                }}>
                                <Checkbox.Android
                                    status={
                                        isCheckAllMeal1
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    uncheckedColor={'#1890FF'}
                                    color={'#1890FF'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 45,
                                    height: 45,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // backgroundColor: 'red'
                                }}
                                onPress={() => {
                                    handleCheckAllMeal(2);
                                }}>
                                <Checkbox.Android
                                    status={
                                        isCheckAllMeal2
                                            ? 'checked'
                                            : 'unchecked'
                                    }
                                    uncheckedColor={'#1890FF'}
                                    color={'#1890FF'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <VirtualizedList
                    data={employeeList}
                    initialNumToRender={10}
                    renderItem={({ item }) => (
                        <EmployeeAttendance
                            key={item.id}
                            employee={item}
                            handleClickMealCheckbox={handleClickMealCheckbox}
                            handleOpenNotePopup={handleOpenNotePopup}
                            handleOpenCheckInHistoryPopup={
                                handleOpenCheckInHistoryPopup
                            }
                            handleSelectEmployee={handleSelectEmployee}
                        />
                    )}
                    keyExtractor={(item: IEmployeeOfOperator) => item.id}
                    getItemCount={() => employeeList.length}
                    getItem={(data: IEmployeeOfOperator[], idx) => data[idx]}
                />
                <NoteModal
                    selectedEmployee={selectedEmployee}
                    visibleNotePopup={visibleNotePopup}
                    setVisibleNotePopup={setVisibleNotePopup}
                    note={note}
                    setNote={setNote}
                    handleCloseNotePopup={handleCloseNotePopup}
                    handleSaveNote={handleSaveNote}
                />

                <CheckInHistoryModal
                    visibleCheckInHistoryPopup={visibleCheckInHistoryPopup}
                    setVisibleCheckInHistoryPopup={
                        setVisibleCheckInHistoryPopup
                    }
                    checkInTimeList={checkInTimeList}
                    handleCloseCheckInPopup={handleCloseCheckInPopup}
                />

                <AddWorkingTimeModal
                    visibleAddWorkingTimePopup={visibleAddWorkingTimePopup}
                    setVisibleAddWorkingTimePopup={
                        setVisibleAddWorkingTimePopup
                    }
                    handleCloseAddWorkingTimePopup={
                        handleCloseAddWorkingTimePopup
                    }
                />
            </View>

            <View style={styles.footerStyle}>
                <TouchableOpacity
                    onPress={() => {
                        handleNavigateFaceCheckScreen();
                    }}
                    activeOpacity={0.5}
                    style={styles.button}>
                    <Text style={styles.buttonText}> {'Điểm danh'}</Text>
                </TouchableOpacity>
            </View>
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
    },
    modalContentHead: {
        width: '100%',
        backgroundColor: '#005BA5', //Set Header color
        height: 65,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    headerLeftStyle: {
        // width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
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
    scrollViewStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 15,
        marginTop: 10,
        paddingBottom: 50,
        backgroundColor: 'red',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        // margin: 5,
        marginVertical: 5,
        marginHorizontal: 30,
        // paddingHorizontal: 30,
        // marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 6,
        borderRadius: 5,
        marginHorizontal: 31,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        // height: 25,
        // width: 25,
        // marginRight: 7,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trashTextStyle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
});

export default JobScreen;
