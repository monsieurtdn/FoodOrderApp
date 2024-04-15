import React from 'react';
import {PinchGestureHandler, ScrollView} from 'react-native-gesture-handler';
// import TransformableImage from 'react-native-transformable-image';

const ZoomableImage: React.FC = () => {
    const handlePinch = React.useCallback(({nativeEvent}) => {
        // You can add additional logic here if needed
        console.log('Scale:', nativeEvent.scale);
    }, []);

    return (
        <ScrollView
            minimumZoomScale={1}
            maximumZoomScale={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <PinchGestureHandler onGestureEvent={handlePinch}>
                <PinchGestureHandler>
                    {/* <TransformableImage
              style={{ width: 300, height: 300 }} // Set the initial size of the image
              source={require('../../image/HaNoi_Hotel_Logo.png')} // Replace with the actual path to your image
            /> */}
                </PinchGestureHandler>
            </PinchGestureHandler>
        </ScrollView>
    );
};

export default ZoomableImage;
