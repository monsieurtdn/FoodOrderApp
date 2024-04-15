import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
interface CInformationCardProps {
    rightTitle?: string;
    leftTitle?: string;
    children?: ReactNode;
    footer?: {text: string; color: string; colorText: string}[];
    onPress?: () => void;
    onPressRightTitle?: () => void;
}
const CInformationCard: React.FC<CInformationCardProps> = ({
    rightTitle,
    leftTitle,
    children,
    onPress,
    onPressRightTitle,
}: CInformationCardProps) => {
    return (
        <View
            onTouchEnd={onPress}
            style={{...styles.card, ...styles.boxWithShadow}}>
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        paddingVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontFamily: 'Roboto',
                            fontSize: 17,
                            fontWeight: '700',
                        }}>
                        {leftTitle}
                    </Text>
                    <Text
                        onPress={onPressRightTitle}
                        style={{
                            color: '#367BF5',
                            fontFamily: 'Roboto',
                            fontSize: 15,
                            fontWeight: '700',
                        }}>
                        {rightTitle}
                    </Text>
                </View>
                {children}
            </View>
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
});
export default CInformationCard;
