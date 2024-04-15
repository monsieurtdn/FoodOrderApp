import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { OrderScreenStack } from 'screen/order/navigator/OrderNavigatorRoutes';
import { store } from 'store/store';

const Stack = createStackNavigator();

const persistor = persistStore(store);

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="OrderNavigatorRoutes">
                            <Stack.Screen
                                name="OrderNavigatorRoutes"
                                component={OrderScreenStack}
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
