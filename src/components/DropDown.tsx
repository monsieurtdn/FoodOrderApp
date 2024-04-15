import Utils from 'common/Utils';
import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface IItem {
    label: string;
    value: any;
}

interface IDropdownProps {
    label?: string;
    items: IItem[];
    selectedValue: any;
    onSetSelectedValue: (value: any) => void;
    disable?: boolean;
    placeholder?: string;
    children?: ReactNode;
}

const DropDown: React.FC<IDropdownProps> = props => {
    const {
        label,
        items,
        selectedValue,
        onSetSelectedValue,
        disable = false,
        placeholder = 'Select item',
    } = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            {label ? <Text style={styles.label}>{label}</Text> : <></>}

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={items}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={selectedValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    onSetSelectedValue(item.value);
                }}
                // renderLeftIcon={() => (
                //     <AntDesign
                //       style={styles.icon}
                //       color={isFocus ? 'blue' : 'black'}
                //       name="Safety"
                //       size={20}
                //     />
                //   )}
                disable={disable}
            />
        </View>
    );
};

export default DropDown;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        // height: 80,
    },
    dropdown: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 7,
    },
    adminContainer: {
        // backgroundColor: 'white',
        width: 120,
    },
    adminDropdown: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    label: {
        fontSize: Utils.getFontSize(14),
        fontWeight: '500',
        marginBottom: 5,
    },
    placeholderStyle: {
        fontSize: Utils.getFontSize(14),
    },
    selectedTextStyle: {
        fontSize: Utils.getFontSize(14),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: Utils.getFontSize(14),
    },
});
