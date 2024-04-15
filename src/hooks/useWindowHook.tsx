// import React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const useWindowHook = () => {
    const SCREEN_ORIENTATION = {
        PORTRAIT: 'portrait',
        LANDSCAPE: 'landscape',
    };
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const [orientation, setOrientation] = useState(SCREEN_ORIENTATION.PORTRAIT);

    const getOrientation = (width: number, height: number) => {
        if (width < height) {
            return SCREEN_ORIENTATION.PORTRAIT;
        }
        if (width > height) {
            return SCREEN_ORIENTATION.LANDSCAPE;
        }
        return SCREEN_ORIENTATION.PORTRAIT;
    };

    useEffect(() => {
        Dimensions.addEventListener(
            'change',
            ({ window: { width, height } }) => {
                setOrientation(getOrientation(width, height));
            },
        );
    }, []);
    return {
        screenWidth,
        screenHeight,
        SCREEN_ORIENTATION,
        orientation,
    };
};
