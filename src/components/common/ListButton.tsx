import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
interface ListButtonProps {
    buttons: {
        text: string;
        onPress: () => void;
        icon?: ImageSourcePropType;
    }[];
}
const ListButton = ({buttons}: ListButtonProps) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                ...styles.card,
            }}>
            {buttons.map(x => (
                <TouchableOpacity
                    onPress={x.onPress}
                    style={{
                        height: 44,
                        marginHorizontal: 10,
                        flexGrow: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1676F3',
                        width: `${90 / buttons.length}%`,
                        borderRadius: 5,
                    }}>
                    {x.icon && (
                        <Image
                            style={{height: 25, width: 25}}
                            source={x.icon}
                        />
                    )}
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#FFFFFF',
                        }}>
                        {x.text}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 25,
        marginVertical: 5,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
export default ListButton;
