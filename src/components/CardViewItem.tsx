import React from 'react';
import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
interface CardViewItemProps {
    title?: ReactNode;
    children?: ReactNode;
    footer?: {text: string; color: string; colorText: string}[];
    onPress?: () => void;
    onPressBottom?: () => void;
    right?: ReactNode;
}
const CardViewItem: React.FC<CardViewItemProps> = ({
    title,
    children,
    footer,
    onPress,
    onPressBottom,
    right,
}: CardViewItemProps) => {
    return (
        <Card
            style={{
                ...styles.card,
                ...styles.boxWithShadow,
            }}
            onPress={() => onPress && onPress()}>
            {title && <Card.Title title={title} right={() => right} />}
            {children && (
                <Card.Content style={{marginVertical: 5}}>
                    {children}
                </Card.Content>
            )}
            {footer && footer.length > 0 && (
                <Card.Actions
                    style={{
                        borderTopWidth: 1,
                        borderColor: '#C4C4C4',
                        borderStyle: 'dashed',
                        marginTop: 10,
                        marginHorizontal: 15,
                    }}>
                    <TouchableOpacity
                        onPress={() => onPressBottom && onPressBottom()}
                        style={{
                            flexDirection: 'row',
                            marginHorizontal: 5,
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'flex-end',
                        }}>
                        {footer.map(x => (
                            <View
                                style={{
                                    backgroundColor: x.color,
                                    borderColor: x.color,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    marginHorizontal: 5,
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: x.colorText,
                                        fontSize: 10,
                                        backgroundColor: x.color,
                                        borderColor: x.color,
                                    }}>
                                    {x.text}
                                </Text>
                            </View>
                        ))}
                        {/* <View
                            style={{
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                style={{width: 10, height: 10}}
                                source={require('../../image/Shape.png')}
                            />
                        </View> */}
                    </TouchableOpacity>
                </Card.Actions>
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
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
export default CardViewItem;
