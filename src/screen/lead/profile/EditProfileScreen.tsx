import React from 'react';
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import PersonalView from './components/PersonalView';
import SecurityView from './components/SecurityView';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const renderScene = SceneMap({
    personal: PersonalView,
    security: SecurityView,
});
const TabIcon = ({ focused, icon }: { focused: boolean; icon: string }) => {
    return (
        <View
            style={[
                styles.iconContainer,
                {
                    backgroundColor: focused ? '#F2F6FB' : '#F5F5F5',
                },
            ]}>
            <MaterialCommunityIcons
                name={icon}
                color={focused ? '#0050B3' : '#1A1A1A'}
                size={20}
            />
        </View>
    );
};
export const EditProfileScreen = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'personal',
            title: 'Thông tin cá nhân',
            icon: 'account-edit-outline',
        },
        { key: 'security', title: 'Bảo mật', icon: 'lock-outline' },
    ]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                lazy
                renderLazyPlaceholder={() => <ActivityIndicator />}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#006CE4' }}
                        style={{ backgroundColor: '#FFFFFF' }}
                        renderLabel={({ route, focused }) => (
                            <Text
                                style={{
                                    color: focused ? '#006CE4' : '#1A1A1A',
                                }}>
                                {route.title}
                            </Text>
                        )}
                        renderIcon={({ route, focused }) => (
                            <TabIcon icon={route.icon} focused={focused} />
                        )}
                        renderTabBarItem={itemProps => (
                            <TabBarItem
                                {...itemProps}
                                style={styles.tabBarItem}
                            />
                        )}
                    />
                )}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarItem: {
        flexDirection: 'row',
        gap: 3,
    },
});
