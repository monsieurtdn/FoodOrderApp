import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const SuccessfulScreen: React.FC<{
    route: { params: { fromPayScreen: boolean } };
}> = ({ route }) => {
    const navigation = useNavigation();
    const { fromPayScreen } = route.params;
    useEffect(() => {
        console.log(fromPayScreen);
    }, [navigation, fromPayScreen]);

    const successAnimationJSON = require('../../../image/animated/success.json');

    return (
        <>
            <View style={{ alignItems: 'center', top: '40%' }}>
                <LottieView
                    source={successAnimationJSON}
                    autoPlay
                    loop={false}
                    style={{ width: 106, height: 106 }}
                />
                <Text
                    style={{
                        fontSize: 22,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        paddingLeft: 10,
                    }}>
                    {fromPayScreen
                        ? 'Successful request submission!'
                        : 'Successful Submission!'}
                </Text>
            </View>
            <View>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#005BA5',
                        gap: 10,
                        borderRadius: 100,
                        marginLeft: 10,
                        width: 335,
                        height: 40,
                        top: 500,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        navigation.navigate(Screen.OrderScreen.MenuScreen, {
                            screen: route.params.fromPayScreen
                                ? 'Home'
                                : 'Order',
                        });
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 15,
                            width: '100%',
                            textAlign: 'center',
                        }}>
                        {fromPayScreen ? 'Go to Home' : 'Go to Order'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};
