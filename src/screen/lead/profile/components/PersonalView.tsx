import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { InputType } from 'common/define-types';
import Input from 'components/common/Input';
import { ActivityIndicator } from 'react-native-paper';
import ChangeableAvatar from './ChangeableAvatar';
import { AndroidPermissionEnum } from 'types';
import Select from 'components/common/Select';
import { ERROR_MSG } from 'common/constants';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { failRequest } from 'store/controls/EmployeeEpic';
// import Utils from 'common/Utils';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const genders = [
    {
        lable: 'Nam',
        value: 'Nam',
    },
    {
        lable: 'Nữ',
        value: 'Nữ',
    },
    {
        lable: 'Khác',
        value: 'Khác',
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
        type: InputType.TEXT,
        options: genders,
    },
    // {
    //     name: 'phone',
    //     label: 'Số điện thoại',
    //     placeholder: 'Hãy nhập số điên thoại của bạn',
    //     rules: {
    //         required: { value: true, message: ERROR_MSG.REQUIRED },
    //     },
    //     type: InputType.TEXT,
    // },
    // {
    //     name: 'email',
    //     label: 'Email',
    //     placeholder: 'Hãy nhập email của bạn',
    //     rules: {
    //         required: { value: true, message: ERROR_MSG.REQUIRED },
    //     },
    //     type: InputType.TEXT,
    // },
    {
        name: 'homeTown',
        label: 'Địa chỉ',
        placeholder: 'Hãy nhập địa chỉ của bạn',
        rules: {
            required: { value: true, message: ERROR_MSG.REQUIRED },
        },
        type: InputType.TEXT,
    },
];
const PersonalView = () => {
    const dispatch = useDispatchRoot();
    const {
        control,
        // handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const { employeeInfo } = useSelectorRoot(state => state.employee);
    const selectErrMsg = useSelectorRoot(state => state.employee.errorMessage);
    const selectIsSubmitting = useSelectorRoot(
        state => state.employee.isSubmittingProfile,
    );

    useEffect(() => {
        if (selectErrMsg) {
            showMessage({
                message: 'Có lỗi xảy ra.',
                description: selectErrMsg || 'Vui lòng thử lại sau.',
                type: 'danger',
            });
            dispatch(failRequest(null));
        }
    }, [selectErrMsg]);

    // const onSubmit = (data: any) => {
    //     if (employeeInfo) {
    //         const employeeName = Utils.getName(data.fullName);
    //         dispatch(
    //             updateInfo({
    //                 id: employeeInfo?.id,
    //                 firstName: employeeName.firstName,
    //                 middleName: employeeName.middleName,
    //                 lastName: employeeName.lastName,
    //                 ...data,
    //             }),
    //         );
    //     }
    // };

    useEffect(() => {
        if (employeeInfo) {
            const profileValue: any = {
                fullName:
                    `${employeeInfo.lastName} ${employeeInfo.middleName} ${employeeInfo.firstName}`.trim(),
                // phone: employeeInfo.contactDetail.workPhone,
                // email: employeeInfo.contactDetail.workEmail,
                gender: employeeInfo.gender,
                homeTown: employeeInfo.homeTown,
            };
            inputs.forEach(input => {
                setValue(input.name, profileValue[input.name]);
            });
        }
    }, [employeeInfo]);

    // const handleOnChangeAvatar = async (value: any) => {
    //     const formData = new FormData();
    //     formData.append('File', {
    //         name: value.fileName,
    //         type: value.type,
    //         uri:
    //             Platform.OS === 'ios'
    //                 ? value.uri.replace('file://', '')
    //                 : value.uri,
    //     });

    //     fetch('https://sit.srv.anybim.vn/Issue/issues/uploadImage', {
    //         headers: {
    //             'content-type': 'multipart/form-data',
    //             Authorization: Utils.token ? `Bearer ${Utils.token}` : '',
    //         },
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then(res => res.text())
    //         .then(res => {
    //             // setAvatarImagePathFile(res);
    //             console.log('fect img: ', res);
    //         })
    //         .catch(err => console.log('img err: ', err));
    // };
    return selectIsSubmitting ? (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={50} />
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <ChangeableAvatar
                    permission={AndroidPermissionEnum.both}
                    // onChangeImage={handleOnChangeAvatar}
                    onChangeImage={() => {}}
                    lable="Ảnh đại diện"
                />
                {inputs.map(input => (
                    <Controller
                        key={`personalForm-${input.name}`}
                        control={control}
                        rules={input.rules}
                        name={input.name}
                        render={({ field: { onChange, onBlur, value } }) => {
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
                                            editable={false}
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
                                            disabled={true}
                                            errMsg={
                                                errors[input.name]
                                                    ? errors[input.name]
                                                          ?.message
                                                    : ''
                                            }
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
                                            editable={false}
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
            {/* <View style={styles.footer}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="contained-tonal"
                    buttonColor="#005BA5"
                    textColor="white"
                    labelStyle={{ fontSize: 16 }}
                    style={styles.buttonSave}>
                    Lưu
                </Button>
            </View> */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
    },
    scrollContentContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 30,
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: 'center',
        borderTopColor: '#bac0ca63',
        backgroundColor: '#f7f7f7',
        borderTopWidth: 1,
    },
    buttonSave: {
        borderRadius: 6,
        marginHorizontal: 'auto',
    },
});
export default React.memo(PersonalView);
