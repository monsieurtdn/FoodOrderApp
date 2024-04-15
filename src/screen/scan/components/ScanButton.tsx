import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface IProps {
    icon: ReactElement;
    onPress: () => void;
    direction?: 'vertical' | 'horizontal';
    style?: ViewStyle | {};
}
export const ScanButton = ({
    icon,
    onPress,
    direction = 'vertical',
    style = {},
}: IProps) => {
    return (
        <TouchableOpacity
            style={[
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#005BA5',
                    flexDirection: direction === 'vertical' ? 'column' : 'row',
                    gap: 10,
                    borderRadius: 60,
                    paddingHorizontal: 30,
                    paddingVertical: 6,
                    // minHeight: 70,
                },
                style ?? {},
            ]}
            activeOpacity={0.7}
            onPress={onPress}>
            {React.cloneElement(icon)}
        </TouchableOpacity>
    );
};
