import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';

const chartConfig = {
    // backgroundColor: '#e26a00',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientToOpacity: 0.5,
    color: () => '#8f8b8b', //màu của ô vuông
    labelColor: () => '#000000', //màu của label
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const data = {
    labels: ['Sun', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    datasets: [
        {
            data: [1, 1, 2, 2, 1, 2, 2],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
        },
    ],
};

const Revenue = () => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.subContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>End of day</Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.containerBox}>
                        <View style={styles.contentContainerBox}>
                            <View style={styles.contentBox}>
                                <View style={styles.contentInfo}>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            30
                                        </Text>
                                        <Text>Room</Text>
                                    </View>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            60
                                        </Text>
                                        <Text>PAX</Text>
                                    </View>
                                </View>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.contentTitleText}>
                                        Occupied Tonight
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.percentageInfo,
                                    { backgroundColor: 'rgba(82, 196, 26, 1)' },
                                ]}>
                                <Text style={styles.textStyle}>9.26%</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainerBox}>
                            <View style={styles.contentBox}>
                                <View style={styles.contentInfo}>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            30
                                        </Text>
                                        <Text>Room</Text>
                                    </View>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            60
                                        </Text>
                                        <Text>PAX</Text>
                                    </View>
                                </View>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.contentTitleText}>
                                        Available Tonight
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.percentageInfo,
                                    { backgroundColor: 'rgba(255, 77, 79, 1)' },
                                ]}>
                                <Text style={styles.textStyle}>90.74%</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainerBox}>
                            <View style={styles.contentBox}>
                                <View style={styles.contentInfo}>
                                    <View style={styles.columnInfo}>
                                        <Text
                                            style={[
                                                styles.infoTextValue,
                                                {
                                                    color: 'rgba(56, 158, 13, 1)',
                                                },
                                            ]}>
                                            30.000.000
                                        </Text>
                                        <Text>VND</Text>
                                    </View>
                                </View>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.contentTitleText}>
                                        Room Revenue
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.percentageInfo,
                                    { backgroundColor: 'rgba(255, 77, 79, 1)' },
                                ]}>
                                <Text style={styles.textStyle}>-14.5%</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainerBox}>
                            <View style={styles.contentBox}>
                                <View style={styles.contentInfo}>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            30
                                        </Text>
                                        <Text>Room</Text>
                                    </View>
                                    <View style={styles.columnInfo}>
                                        <Text style={styles.infoTextValue}>
                                            60
                                        </Text>
                                        <Text>PAX</Text>
                                    </View>
                                </View>
                                <View style={styles.contentTitle}>
                                    <Text style={styles.contentTitleText}>
                                        Average Daily Rate
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.percentageInfo,
                                    {
                                        backgroundColor:
                                            'rgba(133, 165, 255, 1)',
                                    },
                                ]}>
                                <Text style={styles.textStyle}>0%</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.subContainer,
                        {
                            paddingVertical: 20,
                            paddingBottom: 40,
                            marginBottom: 100,
                        },
                    ]}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Revenue</Text>
                        <View style={styles.divider} />
                    </View>
                    <LineChart
                        data={data}
                        width={350}
                        height={200}
                        chartConfig={chartConfig}
                        style={{
                            borderRadius: 16,
                            // backgroundColor: 'red',
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Revenue;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // margin: 15,
    },
    scrollStyle: {
        flex: 1,
        width: '100%',
        height: 2000,
        paddingVertical: 15,
        paddingHorizontal: 15,
        // marginBottom: 50,
        // backgroundColor: 'red',
    },
    subContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 10,
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    divider: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'rgba(191, 191, 191, 1)',
    },
    containerBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    contentContainerBox: {
        position: 'relative',
        width: '49%',
        height: 120,
        marginVertical: 10,
        // backgroundColor: 'red',
    },
    contentBox: {
        position: 'relative',
        width: '92%',
        height: '86%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginLeft: 7,
        borderWidth: 0.7,
        borderColor: 'rgba(191, 191, 191, 1)',
        borderRadius: 5,
        elevation: 10,
    },
    contentInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    columnInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    infoTextValue: {
        fontWeight: '700',
    },
    contentTitle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTitleText: {
        fontSize: 16,
        fontWeight: '500',
    },
    percentageInfo: {
        position: 'absolute',
        width: 60,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginLeft: 95,
    },
    textStyle: {
        color: '#FFFFFF',
    },
});
