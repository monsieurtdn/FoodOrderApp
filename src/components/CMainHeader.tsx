// Import React and Component
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import {View, Image, Text} from 'react-native';

const CMainHeader = ({
    navigation,
    keyScreen,
}: {
    navigation: DrawerNavigationHelpers;
    keyScreen: string;
}) => {
    return (
        <View>
            <Image
                style={{width: '100%', height: 170}}
                source={require('../../image/homeImage.png')}
            />
            <View style={{position: 'absolute', top: 75, alignSelf: 'center'}}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '600',
                        color: '#FFFFFF',
                        alignSelf: 'center',
                        fontFamily: 'Lexend Deca',
                    }}>
                    Công ty cấp nước Hà Nội
                </Text>
                <View style={{height: 20}} />
            </View>
        </View>
    );
};

export default CMainHeader;
