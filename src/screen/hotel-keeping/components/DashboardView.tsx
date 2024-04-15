// import { Screen } from 'common/screenEnums';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, ProgressBar } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { RootState } from 'store/reducers';
import { fetchTotal } from 'store/slice/HotelSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';

interface CircleInterface {
    color: string;
    radius: number;
    strokeWidth: number;
    percent: number;
}

export const DashboardView = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatchRoot();
    useEffect(() => {
        dispatch(fetchTotal());
    }, [dispatch]);
    const totalData = useSelectorRoot(
        (state: RootState) => state.hotel.totalFloor,
    );
    console.log(totalData);
    const navigateToZoneList = () => {
        navigation.navigate('floor');
    };
    const list = [
        'Expected Departure',
        'Actual Departure',
        'In-House (Stay-Over)',
        'Expected Arrival',
        'Actual Arrival',
    ];
    const RenderListItem = ({
        title,
        value1,
        value2,
    }: {
        title: any;
        value1: any;
        value2: any;
    }) => {
        return (
            <View style={{ paddingVertical: 10 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1,
                        borderRadius: 6,
                        marginRight: 10,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.5,
                    }}>
                    <View style={{ paddingHorizontal: 15, width: 165 }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                paddingTop: 12,
                            }}>
                            {title}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            paddingLeft: 10,
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                paddingBottom: 4,
                            }}>
                            {value1}
                        </Text>
                        <Text>Room</Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            paddingLeft: 30,
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                paddingBottom: 4,
                            }}>
                            {value2}
                        </Text>
                        <Text>PAX</Text>
                    </View>
                </View>
            </View>
        );
    };
    const RenderCircle = (props: { datas: CircleInterface[] }) => {
        let prevD = 0;
        const { datas } = props;

        return (
            <Svg width={100} height={100} viewBox={'0 0 160 160'}>
                {datas.map((item, index) => {
                    if (index !== 0) {
                        prevD = 360 * (datas[index - 1].percent / 100) + prevD;
                        // console.log(prevD);
                    }
                    return (
                        <Circle
                            key={index}
                            cy={80}
                            cx={80}
                            r={item.radius}
                            strokeWidth={item.strokeWidth}
                            stroke={item.color}
                            strokeDasharray={2 * Math.PI * item.radius}
                            strokeDashoffset={
                                2 *
                                Math.PI *
                                item.radius *
                                (1 - item.percent / 100)
                            }
                            fill="transparent"
                            originX={80}
                            originY={80}
                            rotation={270 + prevD}
                        />
                    );
                })}
                <Text style={{ paddingTop: 40, paddingLeft: 38 }}>100</Text>
            </Svg>
        );
    };

    const data: CircleInterface[] = [
        {
            color: '#73D13D',
            percent: 20,
            radius: 55,
            strokeWidth: 50,
        },
        {
            color: '#597EF7',
            percent: 20,
            radius: 55,
            strokeWidth: 50,
        },
        {
            color: '#F759AB',
            percent: 60,
            radius: 55,
            strokeWidth: 50,
        },
    ];
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', borderRadius: 2 }}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Room Summary</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingBottom: 30,
                            paddingLeft: 25,
                        }}>
                        <View>
                            <Text style={{ paddingTop: 15 }}>
                                Total room in hotel
                            </Text>
                            <Text style={{ paddingTop: 15, color: 'green' }}>
                                Out of order (20)
                            </Text>
                            <Text style={{ paddingTop: 15, color: 'blue' }}>
                                Room for sell (20)
                            </Text>
                            <Text style={{ paddingTop: 15, color: 'magenta' }}>
                                Out of services (60)
                            </Text>
                        </View>
                        <View style={{ paddingLeft: 35, paddingTop: 30 }}>
                            <RenderCircle datas={data} />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 16,
                        borderRadius: 2,
                    }}>
                    <TouchableOpacity
                        style={styles.heading}
                        onPress={navigateToZoneList}>
                        <Text style={styles.headingText}>
                            Housekeeping - General
                        </Text>
                    </TouchableOpacity>
                    <View style={{ paddingBottom: 30, paddingLeft: 25 }}>
                        <Text style={{ paddingVertical: 15, fontSize: 16 }}>
                            Số phòng: {totalData.room}
                        </Text>
                        <View style={styles.zoneProgress}>
                            <Text style={styles.progressLabel}>
                                Occupied Clean (OC):
                            </Text>
                            <View style={styles.progressInfo}>
                                <ProgressBar
                                    progress={totalData.oc / totalData.room}
                                    color={'green'}
                                    style={styles.progressBar}
                                />
                                <Text style={{ fontWeight: '500' }}>
                                    {totalData.oc}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.zoneProgress}>
                            <Text style={styles.progressLabel}>
                                Occupied Dirty (OD):
                            </Text>
                            <View style={styles.progressInfo}>
                                <ProgressBar
                                    progress={totalData.od / totalData.room}
                                    color={'red'}
                                    style={styles.progressBar}
                                />
                                <Text style={{ fontWeight: '500' }}>
                                    {totalData.od}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.zoneProgress}>
                            <Text style={styles.progressLabel}>
                                Vacant Dirty (VD):
                            </Text>
                            <View style={styles.progressInfo}>
                                <ProgressBar
                                    progress={totalData.vd / totalData.room}
                                    color={'red'}
                                    style={styles.progressBar}
                                />
                                <Text style={{ fontWeight: '500' }}>
                                    {totalData.vd}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.zoneProgress}>
                            <Text style={styles.progressLabel}>
                                Vacant Clean (VC):
                            </Text>
                            <View style={styles.progressInfo}>
                                <ProgressBar
                                    progress={totalData.vc / totalData.room}
                                    color={'green'}
                                    style={styles.progressBar}
                                />
                                <Text style={{ fontWeight: '500' }}>
                                    {totalData.vc}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.zoneProgress}>
                            <Text style={styles.progressLabel}>
                                VC Inspected (VCI):
                            </Text>
                            <View style={styles.progressInfo}>
                                <ProgressBar
                                    progress={totalData.vci / totalData.room}
                                    color={'green'}
                                    style={styles.progressBar}
                                />
                                <Text style={{ fontWeight: '500' }}>
                                    {totalData.vci}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 16,
                        borderRadius: 2,
                    }}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>End of day</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingBottom: 30,
                            paddingLeft: 25,
                        }}>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Occupied tonight{' '}
                                </Text>
                                <Text>(2.44%)</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    buttonColor="#FAAD14"
                                    textColor="#fff"
                                    style={{
                                        width: 81,
                                        height: 40,
                                        borderRadius: 10,
                                    }}>
                                    {' '}
                                    5 rooms
                                </Button>
                                <Button
                                    buttonColor="#FA8C16"
                                    textColor="#fff"
                                    style={{
                                        width: 75,
                                        height: 40,
                                        borderRadius: 10,
                                        marginLeft: 5,
                                    }}>
                                    {' '}
                                    10 PAX
                                </Button>
                            </View>
                        </View>
                        <View style={{ paddingLeft: 10, paddingTop: 10 }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                }}>
                                Available tonight{' '}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: 10,
                                }}>
                                <Button
                                    buttonColor="#A0D911"
                                    textColor="#fff"
                                    style={{
                                        width: 114,
                                        height: 40,
                                        borderRadius: 10,
                                    }}>
                                    {' '}
                                    40 rooms
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 16,
                        borderRadius: 2,
                    }}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Movement</Text>
                    </View>
                    <View style={{ paddingVertical: 10, paddingLeft: 25 }}>
                        {list.map((item, index) => (
                            <RenderListItem
                                key={index}
                                title={item}
                                value1="30"
                                value2="60"
                            />
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        overflow: 'visible',
    },
    heading: {
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingLeft: 25,
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    progressBar: {
        width: '85%',
        minWidth: 80,
        maxWidth: 120,
        borderRadius: 6,
        height: 8,
    },
    zoneProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
    progressLabel: {
        maxWidth: '50%',
        flexShrink: 1,
        fontSize: 15,
    },
    progressInfo: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
