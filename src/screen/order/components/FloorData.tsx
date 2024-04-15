import { useNavigation } from '@react-navigation/native';
import { Screen } from 'common/screenEnums';
import React, { useEffect } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
interface Props {
    data: any[];
}
export const FloorData: React.FC<Props> = (props: Props) => {
    const { data } = props;
    const navigation = useNavigation();
    useEffect(() => {
        console.log(data);
    }, [data]);
    const renderItem = ({ item }: { item: any }) => {
        let backgroundColor;

        switch (item.status) {
            case 'Vacant clean':
                backgroundColor = '#1890FF';
                break;
            case 'In Service':
                backgroundColor = '#18A125';
                break;
            case 'Reserved':
                backgroundColor = '#F22DF6';
                break;
            case 'Vacant dirty':
                backgroundColor = '#FF7B1C';
                break;
            default:
                backgroundColor = '#1890FF';
        }

        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate(Screen.OrderScreen.MenuScreen)
                }
                style={[styles.item, { backgroundColor }]}>
                <Text style={styles.text}> T{item.ID}</Text>
            </TouchableOpacity>
        );
    };
    const LegendItem = ({ color, label }: { color: string; label: string }) => (
        <>
            <Svg height="20" width="20" style={{ marginHorizontal: 5 }}>
                <Circle cx="10" cy="10" r="10" fill={color} />
            </Svg>
            <Text style={{ fontSize: 14 }}>{label}</Text>
        </>
    );
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View>
                <ScrollView horizontal style={{ height: 32, marginTop: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <LegendItem color="#1890FF" label="Vacant Clean" />
                        <LegendItem color="#18A125" label="In Service" />
                        <LegendItem color="#F22DF6" label="Reserved" />
                        <LegendItem color="#FF7B1C" label="Vacant Dirty" />
                    </View>
                </ScrollView>
            </View>
            <FlatList
                style={{ alignSelf: 'center' }}
                data={data}
                renderItem={renderItem}
                numColumns={3}
                contentContainerStyle={styles.container}
                keyExtractor={item => item.name}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
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
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 5,
        color: '#FFFFFF',
    },
});
