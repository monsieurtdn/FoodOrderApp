// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import { Screen } from 'common/screenEnums';
import { RoomDetail } from '../RoomDetail';
import { ZoneDetail } from '../ZoneDetail';
import { ZoneScreen } from '../ZoneScreen';
import { MinibarScreen } from '../MinibarScreen';
import { LaundryScreen } from '../LaundryScreen';

const Stack = createStackNavigator();

export const HotelScreenStack = () => {
    return (
        <Stack.Navigator initialRouteName={Screen.HotelScreen.ZoneScreen}>
            <Stack.Screen
                name={Screen.HotelScreen.ZoneScreen}
                component={ZoneScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.HotelScreen.ZoneDetail}
                component={ZoneDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.HotelScreen.RoomDetail}
                component={RoomDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.HotelScreen.MiniBar}
                component={MinibarScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.HotelScreen.Laundry}
                component={LaundryScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default HotelScreenStack;
