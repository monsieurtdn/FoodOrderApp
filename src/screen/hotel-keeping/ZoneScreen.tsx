import Utils, { KeyboardDismiss } from 'common/Utils';
import { useWindowHook } from 'hooks/useWindowHook';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { TabBar, TabBarItem, TabView } from 'react-native-tab-view';
import { DashboardView } from './components/DashboardView';
import { Header } from './components/Header';
import { ZoneList } from './components/ZoneList';

interface IRoute {
    key: string;
    title: string;
}
export const ZoneScreen = ({ navigation }: any) => {
    const [query, setQuery] = useState('');
    const [index, setIndex] = React.useState(0);
    const { screenWidth } = useWindowHook();

    const [routes] = React.useState<IRoute[]>([
        {
            key: 'dashboard',
            title: 'Dashboard',
        },
        { key: 'floor', title: 'Floor/Area' },
    ]);

    const renderScene = ({ route }: { route: IRoute }) => {
        switch (route.key) {
            case 'dashboard':
                return <DashboardView navigation={navigation} />;
            case 'floor':
                return <ZoneList navigation={navigation} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                shadowElevation={6}
                content={
                    <Searchbar
                        value={query}
                        style={styles.search}
                        placeholder="Tìm kiếm tầng, phòng...."
                        onChangeText={value => setQuery(value)}
                        onSubmitEditing={KeyboardDismiss}
                        onBlur={KeyboardDismiss}
                        numberOfLines={1}
                        inputStyle={{
                            fontSize: Utils.getFontSize(16),
                            height: 20,
                            lineHeight: 18,
                            textAlignVertical: 'top',
                        }}
                    />
                }
                handleGoBack={() => navigation.goBack()}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: screenWidth }}
                lazy
                renderLazyPlaceholder={() => (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View>
                )}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#006CE4' }}
                        style={{ backgroundColor: '#FFFFFF' }}
                        renderLabel={({ route, focused }) => (
                            <Text
                                style={{
                                    color: focused ? '#006CE4' : '#1A1A1A',
                                    fontSize: Utils.getFontSize(16),
                                }}>
                                {route.title}
                            </Text>
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
    container: {
        flex: 1,
    },
    search: {
        flex: 1,
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        height: 38,
        marginRight: 10,
    },
    zonesContainer: {
        backgroundColor: 'white',
    },
    tabBarItem: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
    },
});
