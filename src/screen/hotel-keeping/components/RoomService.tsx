import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
    service: {
        title: string;
        icon: string;
    };
    isAvailable?: boolean;
    onPress: () => void;
}
export const RoomService = ({
    service,
    isAvailable = true,
    onPress,
}: IProps) => {
    return (
        <TouchableOpacity
            onPress={isAvailable ? onPress : undefined}
            activeOpacity={0.8}>
            <View
                style={[
                    styles.container,
                    { backgroundColor: isAvailable ? '#096DD9D6' : '#BFBFBF' },
                ]}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <MaterialCommunityIcons
                    name={service.icon}
                    color={'white'}
                    size={30}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
    },
    serviceTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});
