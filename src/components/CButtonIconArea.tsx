import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageStyle,
    TouchableOpacity,
} from 'react-native';

export interface IButtonIcon {
    uri?: any;
    text?: string;
    onPress?: () => void;
    styleImage?: ImageStyle;
}

interface CButtonIconAreaProps {
    lstBtnIcon: IButtonIcon[];
}

const CButtonIconArea = ({lstBtnIcon}: CButtonIconAreaProps) => {
    return (
        <View
            style={{
                width: '100%',
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            {lstBtnIcon &&
                lstBtnIcon.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                item.onPress && item.onPress();
                            }}
                            key={index}
                            style={{alignItems: 'center'}}>
                            <Image
                                source={item.uri}
                                style={{
                                    width: 35,
                                    height: 35,
                                    resizeMode: 'contain',
                                    ...item?.styleImage,
                                }}
                            />
                            {item.text && (
                                <Text style={styles.verifiedBtnText}>
                                    {item.text}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 25,
        marginVertical: 5,
        borderRadius: 10,
        width: '90%',
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
    verifiedBtnText: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 13,
        color: 'rgba(24, 39, 58, 0.94)',
    },
});

export default CButtonIconArea;
