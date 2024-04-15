// Import React and Component
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const NavigationDrawerHeader = (props: {
    navigationProps: DrawerNavigationHelpers;
}) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View
            style={{
                flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Image
                    source={require('../../image/drawer-toggle.png')}
                    style={{
                        width: 25,
                        height: 25,
                        marginLeft: 10,
                        marginBottom: 80,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};
export default NavigationDrawerHeader;
