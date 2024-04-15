import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
    onPress?: () => void;
    icon: ReactElement;
    title: string;
    description?: string;
    right?: ReactElement;
}
const RightArrow = () => {
    return (
        <Image
            source={require('../../../../../image/icon/right-cheveron.png')}
        />
    );
};
export const ProfileMenuItem = ({
    onPress,
    icon,
    title,
    description,
    right,
}: IProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={onPress || !right ? 0.7 : 1}>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    {React.cloneElement(icon)}
                </View>
                <View style={styles.informationWrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description ?? ''}</Text>
                </View>
                {right ? React.cloneElement(right) : <RightArrow />}
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F6FB',
    },
    informationWrapper: {
        flexDirection: 'column',
        flex: 1,
        gap: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    description: {
        fontSize: 13,
        color: '#ABABAB',
    },
});
