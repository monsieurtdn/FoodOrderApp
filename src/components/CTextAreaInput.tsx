import React, { createRef, Ref } from 'react';
import { Keyboard, StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
interface CTextInputProps extends TextInputProps {
    refC?: Ref<any>;
    rightComponnent?: React.ReactNode;
}

const CTextAreaInput: React.FC<CTextInputProps> = props => {
    const {
        refC,
        placeholder = '',
        keyboardType = 'default',
        autoCapitalize = 'none',
        secureTextEntry = false,
        blurOnSubmit = false,
        onChangeText,
        rightComponnent,
        placeholderTextColor,
        numberOfLines = 4,
        maxLength = 100,
    } = props;
    return (
        <View style={styles.inputStyle}>
            <TextInput
                {...props}
                // style={styles.textArea}
                style={{ flex: 1 }}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                ref={refC ?? createRef<TextInput>()}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={blurOnSubmit}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                editable
                multiline={true}
                numberOfLines={numberOfLines}
                maxLength={maxLength}
            />
            {rightComponnent ? rightComponnent : <View />}
        </View>
    );
};
export default CTextAreaInput;
const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: 'white',
        flex: 1,
        color: '#18273A',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dadae8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
