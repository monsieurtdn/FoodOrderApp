import IdentifyApi from 'api/scan/identify.api';
import Utils, { KeyboardDismiss } from 'common/Utils';
import { ERROR_MSG } from 'common/constants';
import { INation, IdentifyType, InputType } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import Input from 'components/common/Input';
import Select from 'components/common/Select';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { updateIdentity } from 'store/slice/ScanSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { DateInput } from './components/DateInput';
// const genders = [
//     {
//         lable: 'Nam',
//         value: 'Nam',
//     },
//     {
//         lable: 'Nữ',
//         value: 'Nữ',
//     },
//     {
//         lable: 'Khác',
//         value: 'Khác',
//     },
// ];
export const IdentificationInfor = ({ navigation }: { navigation: any }) => {
    const [nations, setNations] = useState<INation[]>([]);
    const selectScanInfor = useSelectorRoot(state => state.scan.scanInfor);
    const selectTypeSelected = useSelectorRoot(
        state => state.scan.selectedType,
    );
    const isCCCD =
        selectTypeSelected === IdentifyType.CCCD ||
        selectTypeSelected === IdentifyType.QR;
    const dispatch = useDispatchRoot();
    const inputs = [
        {
            name: 'mvarRoomNo',
            label: 'Số phòng',
            placeholder: 'Hãy nhập số phòng',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
        },
        {
            name: 'no_cccd',
            label: 'Số CCCD / ID No',
            placeholder: 'Hãy nhập họ tên của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            identifyType: IdentifyType.CCCD || IdentifyType.QR,
        },
        {
            name: 'passport',
            label: 'Số hộ chiếu / Passport No',
            placeholder: 'Hãy nhập số hộ chiếu của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            identifyType: IdentifyType.Passport,
        },
        {
            name: 'full_name',
            label: 'Họ và tên / Full name',
            placeholder: 'Hãy nhập họ tên của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            capitalize: true,
        },
        {
            name: 'national',
            label: 'Quốc tịch / Nationality',
            placeholder: 'Hãy chọn quốc tịch của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.SELECT,
            options: nations.map(nation => ({
                lable: nation.ten,
                value: nation.ma,
            })),
        },
        {
            name: 'birth_Date',
            label: 'Ngày sinh / DOB',
            placeholder: 'Hãy nhập ngày sinh của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.DATE,
        },
        {
            name: 'sex',
            label: 'Giới tính / Gender',
            placeholder: 'Hãy nhập giới tính của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            isEditable: false,
        },
        // {
        //     name: 'dob',
        //     label: 'Nơi sinh / Place of Birth',
        //     placeholder: 'Hãy nhập quê quán của bạn',
        //     rules: {
        //         required: { value: true, message: ERROR_MSG.REQUIRED },
        //     },
        //     type: InputType.TEXT,
        //     identifyType: IdentifyType.Passport,
        // },
        {
            name: 'que_quan',
            label: 'Quê quán / Place of origin',
            placeholder: 'Hãy nhập quê quán của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            identifyType: IdentifyType.CCCD || IdentifyType.QR,
        },
        {
            name: 'thuong_tru',
            label: 'Thường trú/ Place of residence',
            placeholder: 'Hãy nhập nơi thường trú của bạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.TEXT,
            identifyType: IdentifyType.CCCD || IdentifyType.QR,
        },
        {
            name: 'exp_Date',
            label: 'Ngày hết hạn / Date of expiry',
            placeholder: 'Hãy nhập ngày hết hạn',
            rules: {
                required: { value: true, message: ERROR_MSG.REQUIRED },
            },
            type: InputType.DATE,
        },
    ];
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleBacktoScan = () => {
        KeyboardDismiss();
        navigation.navigate(Screen.ScanScreen.SelectType);
    };

    const onSubmit = (data: any) => {
        KeyboardDismiss();
        console.log(data);
        const payload = {
            mvarRoomNo: data.mvarRoomNo,
            mvarGuestName: data.full_name,
            mvarFistName: Utils.getName(data.full_name).firstName,
            mvarPassport: isCCCD ? data.no_cccd : data.passport,
            mvarBirthDay: moment(data.birth_Date, 'DD/MM/YYYY').toISOString(),
            mvarPassportDate: moment(data.exp_Date, 'DD/MM/YYYY').toISOString(),
            mvarGioiTinh: data.sex,
            mvarCountryCode: data.national,
            mvarUrlImage: selectScanInfor?.path,
        };
        console.log(payload);
        dispatch(updateIdentity(payload));
        navigation.navigate(Screen.ScanScreen.IdentificationSubmitResult);
    };

    useEffect(() => {
        IdentifyApi.getNational().subscribe(
            res =>
                res &&
                setNations(
                    res.map((item: INation) => ({
                        ...item,
                        ten: item.ten.trim(),
                    })),
                ),
            err => console.log(err),
        );
    }, []);

    useEffect(() => {
        if (selectScanInfor) {
            const scanValue: any =
                selectTypeSelected === IdentifyType.CCCD ||
                selectTypeSelected === IdentifyType.QR
                    ? {
                          ...selectScanInfor,
                          national: 'VNM',
                      }
                    : {
                          ...selectScanInfor,
                          full_name:
                              selectScanInfor.full_name &&
                              selectScanInfor.full_name !== ''
                                  ? selectScanInfor.full_name
                                  : Utils.mergeName(
                                        selectScanInfor.first_Name,
                                        selectScanInfor.last_Name,
                                        selectScanInfor.middle_Name,
                                    ) || null,
                      };
            inputs.forEach(input => {
                setValue(input.name, scanValue[input.name]);
            });
        }
    }, [selectScanInfor]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.formContainer}>
                {inputs
                    .filter(
                        input =>
                            !input.identifyType ||
                            input.identifyType === selectTypeSelected,
                    )
                    .map(input => (
                        <Controller
                            key={`personalForm-${input.name}`}
                            control={control}
                            rules={input.rules}
                            name={input.name}
                            render={({
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
                                                editable={
                                                    input.isEditable !== false
                                                }
                                                capitalize={input.capitalize}
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
                                                placeholder={input.placeholder}
                                                errMsg={
                                                    errors[input.name]
                                                        ? errors[input.name]
                                                              ?.message
                                                        : ''
                                                }
                                                disabled={
                                                    input.isEditable === false
                                                }
                                            />
                                        );
                                    case InputType.DATE:
                                        return (
                                            <DateInput
                                                placeholder={input.placeholder}
                                                value={value}
                                                onDateChange={onChange}
                                                label={input.label}
                                                hasError={!!errors[input.name]}
                                                errMsg={
                                                    errors[input.name]
                                                        ? errors[input.name]
                                                              ?.message
                                                        : ''
                                                }
                                                editable={
                                                    input.isEditable !== false
                                                }
                                            />
                                        );

                                    // file deepcode ignore DuplicateCaseBody: <please specify a reason of ignoring this>
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
                                                editable={
                                                    input.isEditable !== false
                                                }
                                                capitalize={input.capitalize}
                                            />
                                        );
                                }
                            }}
                        />
                    ))}
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: '#C5E5FF', width: '34%' },
                    ]}
                    onPress={handleBacktoScan}>
                    <Text style={{ color: '#1D192B', textAlign: 'center' }}>
                        Scan lại
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: '#005BA5', width: '63%' },
                    ]}
                    onPress={handleSubmit(onSubmit)}>
                    <Text style={{ color: '#ffffff', textAlign: 'center' }}>
                        Lưu thông tin
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        flex: 1,
        gap: 20,
        backgroundColor: 'white',
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 15,
    },
    errText: {
        color: 'red',
        textAlign: 'right',
    },
    buttonsContainer: {
        width: '100%',
        gap: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
