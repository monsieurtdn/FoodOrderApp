import { ERROR_MSG } from 'common/constants';
import { InputType } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import CameraFaceCheck from 'components/CameraFaceCheck';
import DateSelect from 'components/common/DateSelect';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import {
    setRegisterForm,
    setTakenRegisterPhoto,
} from 'store/controls/HomeEpic';

interface IFaceCamera {
    title: string;
    bottomTextButton: string;
    src?: Asset;
    onSummit?: (value: any) => void;
    onChange?: (value: any) => void;
    navigation: any;
}

const genders = [
    {
        lable: 'Nam',
        value: 'male',
    },
    {
        lable: 'Nữ',
        value: 'female',
    },
    {
        lable: 'Khác',
        value: 'Other',
    },
];

const inputs = [
    {
        name: 'fullName',
        label: 'Họ và tên',
        placeholder: 'Hãy nhập họ tên của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
    {
        name: 'gender',
        label: 'Giới tính',
        placeholder: 'Hãy nhập giới tính của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.SELECT,
        options: genders,
    },
    {
        name: 'dayOfBirth',
        label: 'Ngày sinh',
        placeholder: 'Hãy ngày tháng năm sinh của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.DATE,
    },
    {
        name: 'phone',
        label: 'Số điện thoại',
        placeholder: 'Hãy nhập số điên thoại của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Hãy nhập email của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
    {
        name: 'licenseNumber',
        label: 'Bằng lái xe',
        placeholder: 'Hãy nhập bằng lái xe của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
    {
        name: 'address',
        label: 'Địa chỉ',
        placeholder: 'Hãy nhập địa chỉ của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
];

const FaceCamera: React.FC<IFaceCamera> = props => {
    const { title, bottomTextButton, src, onSummit, onChange, navigation } =
        props;

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const [image, setImage] = useState<Asset | undefined>(props.src);
    const [visible, setVisible] = useState(false);

    const handleOnChangeImage = (index: number, value: any) => {
        if (value) {
            setImage(value);
        }
        onChange && onChange(value);
    };

    const onSubmit = (data: any) => {
        console.log(data);
        dispatch(setTakenRegisterPhoto(image));
        dispatch(setRegisterForm(data));
        navigation.navigate(Screen.TabScreen.registerSuccessfullyScreen);
    };

    useEffect(() => {
        setImage(src);
    }, [src]);

    useEffect(() => {
        setValue('dayOfBirth', new Date());
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: 15,
            }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    minHeight: 300,
                    minWidth: 200,
                    width: '100%',
                    // height: '100%',
                    paddingHorizontal: 10,
                }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ width: '100%', flexDirection: 'column' }}
                    contentContainerStyle={{
                        // flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                    }}>
                    <SafeAreaView
                        style={{
                            width: '100%',
                            height: 250,
                            // borderStyle: 'dashed',
                            // borderWidth: 1,
                            // borderRadius: 999,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {image ? (
                            <Image
                                source={{
                                    uri: image.uri,
                                }}
                                style={{
                                    width: 220,
                                    height: 220,
                                    borderWidth: 1,
                                    borderRadius: 999,
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </SafeAreaView>
                    {inputs.map(input => (
                        <Controller
                            key={`personalForm-${input.name}`}
                            control={control}
                            rules={input.rules}
                            name={input.name}
                            render={({
                                // eslint-disable-next-line @typescript-eslint/no-shadow
                                field: { onChange, onBlur, value },
                            }) => {
                                switch (input.type) {
                                    case InputType.TEXT:
                                        return (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                placeholder={input.placeholder}
                                                label={input.label}
                                                hasError={!!errors[input.name]}
                                                errMsg={
                                                    errors[input.name]
                                                        ? errors[input.name]
                                                              ?.message
                                                        : ''
                                                }
                                            />
                                        );
                                    case InputType.SELECT:
                                        return (
                                            <Select
                                                options={input.options}
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                label={input.label}
                                                hasError={!!errors[input.name]}
                                                errMsg={
                                                    errors[input.name]
                                                        ? errors[input.name]
                                                              ?.message
                                                        : ''
                                                }
                                            />
                                        );

                                    case InputType.DATE:
                                        return (
                                            <DateSelect
                                                value={value}
                                                onChangeValue={onChange}
                                                label={input.label}
                                                hasError={!!errors[input.name]}
                                            />
                                        );

                                    default:
                                        return (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                placeholder={input.placeholder}
                                                label={input.label}
                                                hasError={!!errors[input.name]}
                                                errMsg={
                                                    errors[input.name]
                                                        ? errors[input.name]
                                                              ?.message
                                                        : ''
                                                }
                                            />
                                        );
                                }
                            }}
                        />
                    ))}
                </ScrollView>
                <CameraFaceCheck
                    permission={'custom'}
                    onChangeImage={value => handleOnChangeImage(1, value)}
                    cameraType="back"
                    title={title}
                    width={'100%'}
                    height={'80%'}
                    src={image}
                    visible={visible}
                    setVisible={setVisible}
                    navigation={navigation}
                />
                {/* <RequestPermission
                        permission={'custom'}
                        onChangeImage={(value) => handleOnChangeImage(1, value)}
                        cameraType='front'
                        title={props.title}
                        width={'100%'}
                        height={'80%'}
                        src={image}
                    /> */}
            </SafeAreaView>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        onSummit && onSummit(image);
                        setVisible(true);
                    }}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#c5e5ff',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        padding: 10,
                        width: '30%',
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>
                        Chụp lại
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={!image}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: !image ? '#DADADA' : '#005BA5',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        padding: 10,
                        width: '60%',
                    }}>
                    <Text
                        style={{
                            color: !image ? '#555555' : 'white',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>
                        {bottomTextButton}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FaceCamera;
