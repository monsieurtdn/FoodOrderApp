import { ScanResultStatus } from 'common/define-types';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions, Text } from 'react-native';
import Animated, {
    // Easing,
    // useAnimatedStyle,
    // withTiming,
    useSharedValue,
} from 'react-native-reanimated';

interface IProps {
    resultStatus: ScanResultStatus;
}
export const BackgroundCircle = ({ resultStatus }: IProps) => {
    const windowWidth = Dimensions.get('window').width;
    const CIRCLE_RATIO = 1.41;
    const CIRCLE_SIZE = windowWidth * CIRCLE_RATIO;

    const getResultByStatus = (status: ScanResultStatus) => {
        switch (status) {
            case ScanResultStatus.SUCCESS:
                return {
                    bgColor: '#005BA5',
                    text: 'Lưu thông tin thành công',
                };
            case ScanResultStatus.LOADING:
                return {
                    bgColor: '#597EF7',
                    text: 'Đang tải dữ liệu...',
                };
            case ScanResultStatus.ERROR:
                return {
                    bgColor: '#FF4D4F',
                    text: 'Lưu thông tin không thành công',
                };

            default:
                return {
                    bgColor: '#597EF7',
                    text: 'Đang tải dữ liệu...',
                };
        }
    };
    const bgColor = useSharedValue(getResultByStatus(resultStatus).bgColor);
    useEffect(() => {
        bgColor.value = getResultByStatus(resultStatus).bgColor;
    }, [resultStatus]);

    const resultStyle = getResultByStatus(resultStatus);
    // const animatedStyles = useAnimatedStyle(() => ({
    //     backgroundColor: withTiming(bgColor.value),
    // }));
    return (
        <Animated.View
            style={[
                {
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE * 2,
                    borderRadius: CIRCLE_SIZE / 2,
                    left: '50%',
                    transform: [{ translateX: -CIRCLE_SIZE / 2 }],
                    alignItems: 'center',
                    backgroundColor: getResultByStatus(resultStatus).bgColor,
                },
                // animatedStyles,
            ]}>
            <Text style={styles.resultText}>{resultStyle.text}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    resultText: {
        marginTop: 80,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
        flexWrap: 'wrap',
    },
});
