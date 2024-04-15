import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { AllRestaurantsScreen } from '../AllRestaurantsScreen';
import { FoodAppScreen } from '../FoodAppScreen';
import { MenuScreen } from '../MenuScreen';
import { OrderCheckScreen } from '../OrderCheckScreen';
import { OrderInfoScreen } from '../OrderInfoScreen';
import { PayScreen } from '../PayScreen';
import { SearchScreen } from '../SearchScreen';
import { SuccessfulScreen } from '../SuccessfulScreen';
import { WelcomeScreen } from '../WelcomeScreen';
import TabNavigatorRoutesLead from '../tab/TabNavigatorRoutesLead';

const Stack = createStackNavigator();

export const OrderScreenStack = () => {
    return (
        <Stack.Navigator initialRouteName={Screen.OrderScreen.FoodAppScreen}>
            <Stack.Screen
                name={Screen.OrderScreen.FoodAppScreen}
                component={FoodAppScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.OrderScreen.WelcomeScreen}
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.OrderScreen.OrderCheckScreen}
                component={OrderCheckScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={Screen.OrderScreen.MenuScreen}
                component={MenuScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TabNavigatorRoutesLead"
                component={TabNavigatorRoutesLead}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SuccessScreen"
                component={SuccessfulScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderInfoScreen"
                component={OrderInfoScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AllRestaurantsScreen"
                component={AllRestaurantsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PayScreen"
                component={PayScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
