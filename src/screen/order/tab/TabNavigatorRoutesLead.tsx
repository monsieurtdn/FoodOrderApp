import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { HomeTab } from '../components/HomeTab'; // Đây là màn hình 'Home'
import { OrderTab } from '../components/OrderTab';
// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomNavigationBar: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    height: '8%',
                    padding: 5,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={() => {
                    return <HomeTab />;
                }}
                options={{
                    // tabBarStyle: { display: 'none' },
                    headerShown: false,
                    tabBarLabel: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: focused ? '#1381E7' : '#595959',
                                        fontSize: 14,
                                        fontWeight: focused ? '600' : '400',
                                    }}>
                                    {'Menu'}
                                </Text>
                            </View>
                        );
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconButton
                                icon={'silverware-fork-knife'}
                                iconColor={focused ? '#1381E7' : '#595959'}
                                style={{ height: 24, width: 24 }}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Order"
                component={() => <OrderTab />}
                options={{
                    // tabBarStyle: { display: 'none' },
                    headerShown: false,
                    tabBarLabel: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: focused ? '#1381E7' : '#595959',
                                        fontSize: 14,
                                        fontWeight: focused ? '600' : '400',
                                    }}>
                                    {'Orders'}
                                </Text>
                            </View>
                        );
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconButton
                                icon={'cart-outline'}
                                iconColor={focused ? '#1381E7' : '#595959'}
                                style={{ height: 24, width: 24 }}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigationBar;
