import { ScanResultStatus } from 'common/define-types';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
interface IProps {
    resultStatus: ScanResultStatus;
}
export const StatusCircle = ({ resultStatus }: IProps) => {
    const CIRCLE_SIZE = 120;
    const renderIconByStatus = (status: ScanResultStatus) => {
        switch (status) {
            case ScanResultStatus.SUCCESS:
                return (
                    <LottieView
                        source={require('../../../../image/animated/check all animate.json')}
                        autoPlay
                        loop={false}
                        style={{
                            width: CIRCLE_SIZE / 2.3,
                            height: CIRCLE_SIZE / 2.3,
                        }}
                    />
                );
            case ScanResultStatus.LOADING:
                return (
                    <ActivityIndicator
                        size={CIRCLE_SIZE / 2.3}
                        color="#1890FF"
                    />
                );
            case ScanResultStatus.ERROR:
                return (
                    <LottieView
                        source={require('../../../../image/animated/close animate.json')}
                        autoPlay
                        style={{
                            width: 140,
                            height: 140,
                        }}
                    />
                );

            default:
                return (
                    <ActivityIndicator
                        size={CIRCLE_SIZE / 2.3}
                        color="#1890FF"
                    />
                );
        }
    };
    return (
        <View
            style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
                backgroundColor: 'white',
                position: 'absolute',
                shadowColor: '#171717',
                shadowOffset: { width: 6, height: -6 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 15,
                left: '50%',
                transform: [
                    { translateX: -CIRCLE_SIZE / 2 },
                    { translateY: -CIRCLE_SIZE / 2 },
                ],
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
            }}>
            {renderIconByStatus(resultStatus)}
        </View>
    );
};
