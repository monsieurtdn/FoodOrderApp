import IdentityApi from 'api/identity/identity.api';
import { InputType } from 'common/define-types';
import Input from 'components/common/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button } from 'react-native-paper';

const inputs = [
    {
        name: 'oldPassword',
        label: 'Mật khẩu hiện tại',
        placeholder: 'Hãy nhập mật khẩu hiện tại của bạn',
        rules: {
            required: true,
        },
        type: InputType.PASSWORD,
    },
    {
        name: 'newPassword',
        label: 'Mật khẩu mới',
        placeholder: 'Hãy nhập mật khẩu bạn muốn thay đổi',
        rules: {
            required: true,
        },
        type: InputType.PASSWORD,
    },
];
const SecurityView = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => {
        IdentityApi.changePassword(data).subscribe(
            res => {
                if (res) {
                    inputs.forEach(input => setValue(input.name, null));
                    showMessage({
                        message: 'Đổi mật khẩu thành công',
                        type: 'success',
                    });
                }
            },
            err =>
                err &&
                showMessage({
                    message: 'Đổi mật khẩu không thành công',
                    type: 'danger',
                }),
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
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
                                            errMsg={
                                                errors[input.name]
                                                    ? errors[input.name]
                                                          ?.message
                                                    : ''
                                            }
                                        />
                                    );
                                case InputType.PASSWORD:
                                    return (
                                        <Input.Password
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
            <View style={styles.footer}>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="contained-tonal"
                    buttonColor="#005BA5"
                    textColor="white"
                    labelStyle={{ fontSize: 16 }}
                    style={styles.buttonSave}>
                    Lưu
                </Button>
            </View>
        </View>
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
export default React.memo(SecurityView);
