// import { Checkbox } from '@ant-design/react-native';
import { Screen } from 'common/screenEnums';
import { format } from 'date-fns';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IDetectFaceFailScreen {
    navigation: any;
}

const DetectFaceFailScreen: React.FC<IDetectFaceFailScreen> = props => {
    const { navigation } = props;
    // const {userJWT} = useSelectorRoot(state => state.login);
    // const {clickedShift} = useSelectorRoot(state => state.home);

    const [now, setNow] = useState({ date: '', hour: 0, minute: 0 });

    const handleFinish = () => {
        navigation.replace(Screen.TabScreen.jobScreen);
    };

    useEffect(() => {
        const noww = new Date();
        setNow({
            date: format(noww, 'dd/MM/yyyy'),
            hour: noww.getHours(),
            minute: noww.getMinutes(),
        });
    }, []);

    useEffect(() => {
        const handleBackButton = () => {
            // Ngăn chặn việc quay lại màn hình trước đó khi nút "Back" được nhấn
            console.log('nút back vừa nhấn');
            return true;
        };

        // Đăng ký sự kiện khi nút "Back" được nhấn
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
            );
        };
    }, []);

    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContentHeadAndBody}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginHorizontal: 30,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            gap: 10,
                        }}>
                        <LottieView
                            source={require('../../../../image/animated/fail.json')}
                            autoPlay
                            loop={false}
                            style={{ width: 90, height: 90, marginBottom: 20 }}
                        />
                        <Text
                            style={{
                                fontSize: 19,
                                fontWeight: '700',
                                fontStyle: 'italic',
                            }}>
                            Định dạng khuôn mặt thất bại!
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            Ngày {now.date}, {now.hour} giờ {now.minute} phút
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.footerStyle}>
                <TouchableOpacity
                    onPress={() => {
                        handleFinish();
                    }}
                    activeOpacity={0.5}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        {'Quay lại Công việc'}
                    </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 30,
        width: '90%',
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
    },
});

export default DetectFaceFailScreen;
