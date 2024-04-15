import RequestPermission from 'components/RequestPermission';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Asset } from 'react-native-image-picker';

const FaceCamera = (props: {
    title: string;
    bottomTextButton: string;
    src?: Asset;
    onSummit?: (value: any) => void;
    onChange?: (value: any) => void;
}) => {
    const [image, setImage] = useState<Asset | undefined>(props.src);
    useEffect(() => {
        setImage(props.src);
    }, [props.src]);

    const handleOnChangeImage = (index: number, value: any) => {
        if (value) {
            setImage(value);
        }
        props.onChange && props.onChange(value);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: 20,
            }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 300,
                    minWidth: 200,
                    width: '100%',
                    height: '100%',
                }}>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '600',
                        marginBottom: 5,
                    }}>
                    {props.title}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <RequestPermission
                        permission={'custom'}
                        onChangeImage={value => handleOnChangeImage(1, value)}
                        cameraType="front"
                        title={props.title}
                        width={'100%'}
                        height={'80%'}
                        src={image}
                    />
                </View>
            </SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    props.onSummit && props.onSummit(image);
                }}
                disabled={!image}
                activeOpacity={0.8}
                style={{
                    backgroundColor: !image ? '#DADADA' : '#005BA5',
                    borderRadius: 99,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    padding: 10,
                    width: '100%',
                }}>
                <Text
                    style={{
                        color: !image ? '#555555' : 'white',
                        fontSize: 13,
                        fontWeight: '600',
                    }}>
                    {props.bottomTextButton}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default FaceCamera;
