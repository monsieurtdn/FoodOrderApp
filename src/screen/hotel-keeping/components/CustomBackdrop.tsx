import React, { useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';

interface IProps {
    onPress?: () => void;
}
const CustomBackdrop = ({
    animatedIndex,
    style,
    onPress,
}: BottomSheetBackdropProps & IProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [1, 1],
            [1, 1],
            Extrapolate.CLAMP,
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: '#00000069',
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle],
    );

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={containerStyle} />
        </TouchableWithoutFeedback>
    );
};

export default CustomBackdrop;
