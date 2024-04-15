import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundColor: 'grey',
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientTo: '#08130D',
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const data = [
    {
        name: 'Expected',
        population: 65,
        color: 'rgba(82, 196, 26, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Actual',
        population: 35,
        color: 'rgba(24, 144, 255, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
];

const Cashier = () => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scrollStyle}>
                <View style={styles.subContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Frontdesk</Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.containerBox}>
                        <View style={[styles.contentContainerBox]}>
                            <View style={styles.contentBox}>
                                <Text
                                    style={[
                                        styles.contentText,
                                        { textDecorationLine: 'underline' },
                                    ]}>
                                    Arrivals
                                </Text>
                            </View>
                            <View style={[styles.contentBox, { gap: 10 }]}>
                                <View style={styles.textContainer}>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { color: 'rgba(82, 196, 26, 1)' },
                                        ]}>
                                        Expected:
                                    </Text>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { fontWeight: '400' },
                                        ]}>
                                        0 rms / 0 guests
                                    </Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { color: 'rgba(24, 144, 255, 1)' },
                                        ]}>
                                        Actual
                                    </Text>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { fontWeight: '400' },
                                        ]}>
                                        0 rms / 0 guests
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <PieChart
                            data={data}
                            width={250}
                            height={160}
                            chartConfig={chartConfig}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            paddingLeft={'15'}
                            // center={[10, 50]}
                            absolute
                            hasLegend={false}
                            style={{
                                width: 145,
                                // backgroundColor: 'red',
                            }}
                        />
                        {/* <View style={styles.percentageView}>
                            <Text style={styles.percentageText}>35%</Text>
                        </View> */}
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Cashier</Text>
                        <View style={styles.divider} />
                    </View>
                    <View style={styles.containerBox_Row}>
                        <View
                            style={[
                                styles.contentContainerBox_Row,
                                { width: '55%' },
                            ]}>
                            <Text
                                style={[
                                    styles.contentText,
                                    { textDecorationLine: 'underline' },
                                ]}>
                                In-House
                            </Text>
                            <View style={styles.subContentContainerBox_Row}>
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor:
                                                'rgba(250, 219, 20, 1)',
                                        },
                                    ]}>
                                    <Text style={styles.buttonText}>
                                        5 rooms
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor:
                                                'rgba(250, 140, 22, 1)',
                                        },
                                    ]}>
                                    <Text style={styles.buttonText}>
                                        5 guests
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.contentContainerBox_Row,
                                { width: '40%' },
                            ]}>
                            <Text
                                style={[
                                    styles.contentText,
                                    { textDecorationLine: 'underline' },
                                ]}>
                                High Balance
                            </Text>
                            <View
                                style={[
                                    styles.button,
                                    {
                                        width: '100%',
                                        backgroundColor: 'rgba(255, 77, 79, 1)',
                                    },
                                ]}>
                                <Text style={styles.buttonText}>5 rooms</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBox}>
                        <View style={styles.contentContainerBox}>
                            <View style={styles.contentBox}>
                                <Text
                                    style={[
                                        styles.contentText,
                                        { textDecorationLine: 'underline' },
                                    ]}>
                                    Departure
                                </Text>
                            </View>
                            <View style={[styles.contentBox, { gap: 10 }]}>
                                <View style={styles.textContainer}>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { color: 'rgba(82, 196, 26, 1)' },
                                        ]}>
                                        Expected:
                                    </Text>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { fontWeight: '400' },
                                        ]}>
                                        0 rms / 0 guests
                                    </Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { color: 'rgba(24, 144, 255, 1)' },
                                        ]}>
                                        Actual
                                    </Text>
                                    <Text
                                        style={[
                                            styles.contentText,
                                            { fontWeight: '400' },
                                        ]}>
                                        0 rms / 0 guests
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <PieChart
                            data={data}
                            width={250}
                            height={160}
                            chartConfig={chartConfig}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            paddingLeft={'15'}
                            // center={[10, 50]}
                            absolute
                            hasLegend={false}
                            style={{
                                width: 145,
                                // backgroundColor: 'red',
                            }}
                        />
                        {/* <View style={styles.percentageView}>
                            <Text style={styles.percentageText}>35%</Text>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Cashier;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // padding: 20,
    },
    scrollStyle: {
        flex: 1,
        width: '100%',
        height: 2000,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    subContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20,
        // backgroundColor: 'red',
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
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: 'red',
    },
    percentageView: {
        position: 'absolute',
        marginLeft: 270,
        marginTop: 76,
    },
    percentageText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    contentContainerBox: {
        width: '55%',
        height: 120,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // marginVertical: 10,
        // backgroundColor: 'green',
    },
    contentBox: {
        width: '100%',
        flexDirection: 'column',
    },
    textContainer: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 5,
    },
    contentText: {
        fontSize: 14,
        fontWeight: '500',
    },
    containerBox_Row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    contentContainerBox_Row: {
        flexDirection: 'column',
        gap: 10,
    },
    subContentContainerBox_Row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 90,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        // fontSize: 16,
        fontWeight: '500',
    },
});
