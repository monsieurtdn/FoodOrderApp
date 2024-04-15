import { Screen } from 'common/screenEnums';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelectorRoot } from 'store/store';
interface IRegisterSuccessfullyScreen {
    navigation: any;
}

const RegisterSuccessfullyScreen: React.FC<
    IRegisterSuccessfullyScreen
> = props => {
    const { navigation } = props;

    const { selectedRegisterEmployee } = useSelectorRoot(state => state.home);

    const handleFinish = () => {
        navigation.replace(Screen.TabScreen.faceRegisterScreen);
    };

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
                            source={require('../../../../../image/animated/success.json')}
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
                            Đăng ký thành công!
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            {selectedRegisterEmployee?.name}
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
                        {'Quay lại Danh sách nhân sự'}
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
    },
    modalContentHead: {
        width: '100%',
        backgroundColor: '#005BA5', //Set Header color
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeftStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        // gap: 20,
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
        paddingLeft: 3,
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
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
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

export default RegisterSuccessfullyScreen;