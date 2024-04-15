import React from 'react';
import {
    Image,
    ImageSourcePropType,
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
            }}>
            {buttons.map(x => (
                <TouchableOpacity
                    onPress={x.onPress}
                    style={{
                        flexGrow: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {x.icon && (
                        <Image
                            style={{height: 25, width: 25}}
                            source={x.icon}
                        />
                    )}
                    <Text style={{fontSize: 12}}>{x.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
export default ListButton;
