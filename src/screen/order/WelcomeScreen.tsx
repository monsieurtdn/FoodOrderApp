import { Screen } from 'common/screenEnums';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import Carousel from 'react-native-reanimated-carousel';
interface INavigation {
    navigation: any;
}
type ImageData = { img: number }[];
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const imageData: ImageData = [
    { img: require('../../../image/backgroundImage1.png') },
    { img: require('../../../image/backgroundImage2.png') },
];
export const WelcomeScreen: React.FC<INavigation> = props => {
    const { navigation } = props;
    const [access, setAccess] = useState<boolean>(false);
    useEffect(() => {
        if (access === true) {
            navigation.navigate(Screen.OrderScreen.FoodAppScreen);
        }
    });
    const [index, setIndex] = React.useState<number>(0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backgroundImage}>
                <Carousel
                    pagingEnabled={true}
                    loop={false}
                    autoPlay={false}
                    data={imageData}
                    width={width}
                    height={height}
                    panGestureHandlerProps={{
                        activeOffsetX: [-10, 10],
                    }}
                    onSnapToItem={ind => setIndex(ind)}
                    renderItem={({ item }: any) => (
                        <>
                            <Image
                                style={{ height: '100%', width: '100%' }}
                                source={item.img}
                            />
                        </>
                    )}
                />
            </View>
            <View>
                <View style={{ marginTop: -400 }}>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            maxWidth: 240,
                            marginBottom: 40,
                            paddingLeft: 35,
                        }}>
                        <Image
                            source={require('../../../image/g12.png')}
                            style={{
                                height: 60,
                                width: 60,
                                marginHorizontal: 20,
                            }}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 34,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                            Tamang Restaurant
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 24,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                paddingBottom: 15,
                            }}>
                            Welcome to our Restaurant
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 14,
                                textAlign: 'center',
                            }}>
                            Welcome to our Restaurant
                        </Text>
                    </View>
                </View>
                <View>
                    <View
                        style={{ position: 'absolute', top: 525, left: '45%' }}>
                        <AnimatedDotsCarousel
                            length={imageData.length}
                            currentIndex={index}
                            maxIndicators={imageData.length}
                            interpolateOpacityAndColor={false}
                            activeIndicatorConfig={{
                                color: 'blue',
                                margin: 3,
                                opacity: 1,
                                size: 8,
                            }}
                            inactiveIndicatorConfig={{
                                color: 'white',
                                margin: 3,
                                opacity: 0.5,
                                size: 8,
                            }}
                            decreasingDots={[
                                {
                                    config: {
                                        color: '#F96B2B',
                                        margin: 3,
                                        opacity: 0.5,
                                        size: 6,
                                    },
                                    quantity: 1,
                                },
                                {
                                    config: {
                                        color: '#F96B2B',
                                        margin: 3,
                                        opacity: 0.5,
                                        size: 4,
                                    },
                                    quantity: 1,
                                },
                            ]}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#005BA5',
                            gap: 10,
                            borderRadius: 6,
                            width: 342,
                            position: 'absolute',
                            top: 550,
                            left: -25,
                            height: 48,
                        }}
                        activeOpacity={0.7}
                        onPress={() => setAccess(true)}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Hoặc 'contain' tùy thuộc vào yêu cầu của bạn
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
});
