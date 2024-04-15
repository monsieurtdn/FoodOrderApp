import React, { ReactElement } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IProps {
    content: ReactElement;
    handleGoBack?: () => void;
    hasShadow?: boolean;
    shadowElevation?: number;
    height?: number;
}
export const Header = ({
    content,
    handleGoBack,
    hasShadow = true,
    shadowElevation = Platform.OS === 'ios' ? 2 : 16,
    height = 60,
}: IProps) => {
    return (
        <View
            style={[
                styles.header,
                // !handleGoBack && styles.paddingLeft,
                hasShadow && styles.boxShadow,
                { elevation: shadowElevation },
                { height },
            ]}>
            {handleGoBack && (
                <IconButton
                    icon={'arrow-left'}
                    size={27}
                    onPress={handleGoBack}
                />
            )}
            {React.cloneElement(content)}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        alignItems: 'center',
        paddingVertical: 10,
        // paddingRight: 10,
        zIndex: 50,
    },
    paddingLeft: {
        paddingLeft: 10,
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
    },
});
