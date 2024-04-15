import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Modal, Portal } from 'react-native-paper';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { setWorkingTime } from 'store/controls/PersistToSave';
import { useSelectorRoot } from 'store/store';

type Props = {
    visibleAddWorkingTimePopup: boolean;
    setVisibleAddWorkingTimePopup: (value: boolean) => void;
    // checkInTimeList: string[];
    handleCloseAddWorkingTimePopup: () => void;
};

const AddWorkingTimeModal = (props: Props) => {
    const {
        visibleAddWorkingTimePopup,
        setVisibleAddWorkingTimePopup,
        handleCloseAddWorkingTimePopup,
    } = props;

    const dispatch = useDispatch();

    const { workingTime } = useSelectorRoot(state => state.persist);
    console.log(workingTime, 'workingTime');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const FirstRoute = () => (
        <View style={{ alignItems: 'center' }}>
            <DatePicker
                mode="time"
                date={startDate}
                onDateChange={setStartDate}
                is24hourSource={'locale'}
            />
        </View>
    );

    const SecondRoute = () => (
        <View style={{ alignItems: 'center' }}>
            <DatePicker
                mode="time"
                date={endDate}
                onDateChange={setEndDate}
                is24hourSource={'locale'}
            />
        </View>
    );

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'startTime',
            title: 'Bắt đầu ca',
        },
        { key: 'endTime', title: 'Kết thúc ca' },
    ]);

    const renderScene = SceneMap({
        startTime: FirstRoute,
        endTime: SecondRoute,
    });

    const initialLayout = { width: 300, height: 300 };

    const handleSaveWorkingTime = () => {
        console.log(index, 'indexxxx');
        if (index === 0) {
            setIndex(1);
        } else if (index === 1) {
            let startTime = new Date(startDate);
            startTime.setHours(startTime.getHours() + 7);

            let endTime = new Date(endDate);
            endTime.setHours(endTime.getHours() + 7);

            console.log(
                startTime.toISOString().split('T')[1],
                endTime.toISOString().split('T')[1],
            );

            let newTime = workingTime ? [...workingTime] : [];
            newTime.push({
                startTime: startTime.toISOString().split('T')[1],
                endTime: endTime.toISOString().split('T')[1],
            });
            dispatch(setWorkingTime(newTime));

            setIndex(0);
            handleCloseAddWorkingTimePopup();
        }
    };

    const handleClosePopup = () => {
        setIndex(0);
        handleCloseAddWorkingTimePopup();
    };

    useEffect(() => {
        setIndex(0);
    }, []);

    return (
        <Portal>
            <Modal
                visible={visibleAddWorkingTimePopup}
                onDismiss={() => setVisibleAddWorkingTimePopup(false)}>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            // height: '30%',
                            width: '90%',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            gap: 5,
                            // marginVertical: 10,
                            // paddingVertical: 25,
                            // borderTopRightRadius: 20,
                            // borderTopLeftRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 15,
                            }}>
                            Thêm mốc thời gian
                        </Text>

                        <View style={{ width: '100%', height: 250 }}>
                            {/* <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                            /> */}
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                                lazy
                                renderLazyPlaceholder={() => (
                                    <ActivityIndicator />
                                )}
                                renderTabBar={propss => (
                                    <TabBar
                                        {...propss}
                                        indicatorStyle={{
                                            backgroundColor: '#006CE4',
                                        }}
                                        style={{ backgroundColor: '#FFFFFF' }}
                                        renderLabel={({ route, focused }) => (
                                            <Text
                                                style={{
                                                    color: focused
                                                        ? '#006CE4'
                                                        : '#1A1A1A',
                                                }}>
                                                {route.title}
                                            </Text>
                                        )}
                                        renderTabBarItem={itemProps => (
                                            <TabBarItem
                                                {...itemProps}
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 10,
                                                }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </View>

                        <View
                            style={{
                                width: '100%',
                                height: 40,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleClosePopup();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '45%',
                                    height: '100%',
                                    borderWidth: 1,
                                    // backgroundColor: 'rgba(234, 246, 255, 1)',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: 14,
                                    }}>
                                    {'Hủy'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    handleSaveWorkingTime();
                                }}
                                activeOpacity={0.5}
                                style={{
                                    borderRadius: 30,
                                    width: '45%',
                                    height: '100%',
                                    borderWidth: 1,
                                    backgroundColor: 'rgba(0, 91, 165, 1)',
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: '#FFF',
                                        fontSize: 14,
                                    }}>
                                    {'Lưu'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
};

export default AddWorkingTimeModal;
