// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Import Screens
import {
    HotelScreen,
    OrderScreen,
    ProfileScreen,
    ScanScreen,
} from 'common/screenEnums';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import HotelScreenStack from 'screen/hotel-keeping/navigator/HotelNavigatorRoutes';
import CheckFailScreen from 'screen/lead/home/CheckFailScreen';
import CheckSuccessfullyScreen from 'screen/lead/home/CheckSuccessfullyScreen';
import DetectFaceFailScreen from 'screen/lead/home/DetectFaceFailScreen';
import DetectFaceSuccessfullyScreen from 'screen/lead/home/DetectFaceSuccessfullyScreen';
import FaceCheckScreen from 'screen/lead/home/FaceCheckScreen';
import JobScreen from 'screen/lead/home/JobScreen';
import { ProfileNavigatorRoutes } from 'screen/lead/profile/navigator/ProfileNavigatorRoutes';
import FaceRegisterScreen from 'screen/lead/register/FaceRegister/FaceRegisterScreen';
import RegisterFailScreen from 'screen/lead/register/RegisterFail/RegisterFailScreen';
import RegisterSuccessfullyScreen from 'screen/lead/register/RegisterSuccessfully/RegisterSuccessfullyScreen';
import TabNavigatorRoutesLead from 'screen/lead/tab/TabNavigatorRoutesLead';
import { OrderScreenStack } from 'screen/order/navigator/OrderNavigatorRoutes';
import ScanScreenStack from 'screen/scan/navigator/ScanNavigatorRoutes';
import { store } from 'store/store';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import SplashScreen from './src/screen/SplashScreen';
import { HomeScreenStack } from './src/screen/drawer/DrawerNavigatorRoutes';

const Stack = createStackNavigator();

const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    title: 'Register', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#FFFFFF', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};
const persistor = persistStore(store);

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="SplashScreen">
                            {/* SplashScreen which will come once for 5 Seconds */}
                            <Stack.Screen
                                name="SplashScreen"
                                component={SplashScreen}
                                // Hiding header for Splash Screen
                                options={{ headerShown: false }}
                            />
                            {/* Auth Navigator: Include Login and Signup */}
                            <Stack.Screen
                                name="Auth"
                                component={Auth}
                                options={{ headerShown: false }}
                            />
                            {/* Navigation Drawer as a landing page */}
                            <Stack.Screen
                                name="DrawerNavigationRoutes"
                                component={HomeScreenStack}
                                // Hiding header for Navigation Drawer
                                options={{ headerShown: false }}
                            />
                            {/* <Stack.Screen
                                name="MainScreen"
                                component={MainScreen}
                                options={{ headerShown: false }}
                            /> */}
                            <Stack.Screen
                                name="TabNavigatorRoutesLead"
                                component={TabNavigatorRoutesLead}
                                options={{ headerShown: false }}
                            />
                            {/* <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            /> */}
                            <Stack.Screen
                                name="JobScreen"
                                component={JobScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="FaceCheckScreen"
                                component={FaceCheckScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="CheckSuccessfullyScreen"
                                component={CheckSuccessfullyScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="DetectFaceSuccessfullyScreen"
                                component={DetectFaceSuccessfullyScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="DetectFaceFailScreen"
                                component={DetectFaceFailScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="CheckFailScreen"
                                component={CheckFailScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="FaceRegisterScreen"
                                component={FaceRegisterScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="RegisterSuccessfullyScreen"
                                component={RegisterSuccessfullyScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name="RegisterFailScreen"
                                component={RegisterFailScreen}
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false,
                                }}
                            />
                            <Stack.Screen
                                name={ScanScreen.name}
                                component={ScanScreenStack}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name={OrderScreen.name}
                                component={OrderScreenStack}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name={HotelScreen.name}
                                component={HotelScreenStack}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name={ProfileScreen.name}
                                component={ProfileNavigatorRoutes}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <FlashMessage position="top" />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
