import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {View, Text} from 'react-native';

export interface IListInformation {
    leftContent: string | null;
    rightContent?: string | number | null;
    leftStyle?: TextStyle;
    rightStyle?: TextStyle;
}

interface CListInformationProps {
    data: IListInformation[];
    showBorder?: boolean;
    style?: ViewStyle;
}

const CListInformation = ({
    data,
    style,
    showBorder = true,
}: CListInformationProps) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
            }}>
            <View
                style={{
                    paddingHorizontal: 30,
                    width: '100%',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    ...style,
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'column',
                        borderBottomWidth: showBorder ? 1 : 0,
                        borderStyle: 'dashed',
                        marginBottom: 10,
                        borderColor: '#D4D4D4',
                    }}>
                    {data &&
                        data.map(item => (
                            <View
                                key={item.leftContent}
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                    justifyContent: 'space-between',
                                }}>
                                <Text
                                    style={{
                                        color: '#000000',
                                        fontFamily: 'Roboto',
                                        fontSize: 12,
                                        fontWeight: '400',
                                        width: '70%',
                                        ...(item.leftStyle ?? {}),
                                    }}>
                                    {item.leftContent ?? ''}
                                </Text>
                                <Text
                                    style={{
                                        color: '#367BF5',
                                        fontFamily: 'Roboto',
                                        fontSize: 12,
                                        fontWeight: '400',
                                        width: '30%',
                                        ...(item.rightStyle ?? {}),
                                    }}>
                                    {item.rightContent ?? ''}
                                </Text>
                            </View>
                        ))}
                </View>
            </View>
        </View>
    );
};

export default CListInformation;
