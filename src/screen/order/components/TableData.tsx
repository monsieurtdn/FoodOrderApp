import { useNavigation } from '@react-navigation/native';
import OrderServiceApi from 'api/order/order.api';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { FloorData } from './FloorData';
import { Header } from './Header';
interface Route {
    key: string;
    title: string;
}
export const TableData: React.FC = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [routes] = useState<Route[]>([
        { key: 'first', title: 'Floor 1' },
        { key: 'second', title: 'Floor 2' },
    ]);
    const [data, setData] = useState<any[]>([]);
    const [floor, setFloor] = useState<any[]>([]);
    useEffect(() => {
        const subscription = OrderServiceApi.getTablesMap(1).subscribe(
            response => {
                // Handle the successful response here
                setData(response.tables);
            },
            error => {
                // Handle errors here
                console.error('Error calling getTablesMap:', error);
            },
        );

        // Cleanup subscription when component unmounts
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        setFloor(data);
    }, [data]);

    useEffect(() => {
        console.log('Floor:', floor);
    }, [floor]);

    const renderScene = SceneMap({
        first: () => <FloorData data={floor} />,
        second: () => <FloorData data={floor} />,
    });
    return (
        <View style={styles.container}>
            <Header
                shadowElevation={6}
                hasShadow={true}
                content={
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginRight: '70%',
                        }}>
                        Table Map
                    </Text>
                }
                handleGoBack={() => navigation.goBack()}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                    <View style={styles.tabBar}>
                        {props.navigationState.routes.map((route, i) => (
                            <Text
                                key={route.key}
                                style={[
                                    styles.tabItem,
                                    index === i && styles.selectedTab,
                                ]}
                                onPress={() => setIndex(i)}>
                                {route.title}
                            </Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        height: '100%',
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
        // flexBasis: '30%',
        height: 40,
        width: 80,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        height: 46, // Add height to the tabBar
    },
    tabItem: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        paddingTop: 10,
    },
    selectedTab: {
        color: '#1890FF',
        borderBottomWidth: 2,
        borderBottomColor: '#1890FF',
    },
});
