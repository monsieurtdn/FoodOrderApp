import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    BackHandler,
} from 'react-native';
import Animated, {
    FadeIn,
    SlideInDown,
    SlideOutDown,
} from 'react-native-reanimated';
import { BackgroundCircle } from './components/BackgroundCircle';
import { StatusCircle } from './components/StatusCircle';
import { Button, IconButton } from 'react-native-paper';
import { Screen } from 'common/screenEnums';
import { useSelectorRoot } from 'store/store';
import { ScanResultStatus } from 'common/define-types';

export const IdentificationSubmitResult = ({
    navigation,
}: {
    navigation: any;
}) => {
    const { height } = Dimensions.get('window');
    const resultStatus = useSelectorRoot(state => state.scan.scanResultStatus);
    const handleBackToHome = () => {
        navigation.replace(Screen.TabScreen.homeScreen);
    };
    const handleBackToScan = () => {
        navigation.navigate(Screen.ScanScreen.SelectType);
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true,
        );

        return () => backHandler.remove();
    }, []);
    return (
        <SafeAreaView style={[styles.container, { height }]}>
            <View style={styles.buttonHome}>
                <IconButton
                    icon={'home-outline'}
                    onPress={handleBackToHome}
                    size={30}
                    iconColor="white"
                />
            </View>
            <Animated.View
                entering={SlideInDown.springify()}
                exiting={SlideOutDown}
                style={{
                    justifyContent: 'center',
                    width: '100%',
                    position: 'absolute',
                    top: (height * 42) / 100,
                    zIndex: 1,
                    elevation: 1,
                }}>
                <View style={{ position: 'relative' }}>
                    <BackgroundCircle
                        resultStatus={resultStatus || ScanResultStatus.LOADING}
                    />
                    <StatusCircle
                        resultStatus={resultStatus || ScanResultStatus.LOADING}
                    />
                </View>
            </Animated.View>
            {resultStatus !== ScanResultStatus.LOADING && (
                <Animated.View
                    entering={FadeIn.delay(200)}
                    style={styles.buttonScanView}>
                    <Button
                        onPress={handleBackToScan}
                        style={styles.buttonScan}>
                        <Text style={styles.buttonText}>Scan tiếp</Text>
                    </Button>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        zIndex: 1,
    },
    buttonHome: {
        position: 'absolute',
        top: 20,
        right: 20,
        height: 40,
        width: 40,
        backgroundColor: '#005BA5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonScanView: {
        alignItems: 'center',
        marginHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        right: 0,
        left: 0,
        zIndex: 3,
        elevation: 3,
    },
    buttonScan: {
        backgroundColor: '#E6F7FF',
        paddingVertical: 5,
        borderRadius: 500,
        width: '100%',
    },
    buttonText: {
        color: '#005BA5',
        fontWeight: '500',
        fontSize: 14,
    },
});
