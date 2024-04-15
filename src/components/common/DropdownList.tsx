import React, {useState} from 'react';
import {Image, View, ViewStyle} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
interface DropdownListProps {
    options?: string[];
    style?: ViewStyle;
    onChange?: (value: string, index: number) => void;
}
const DropdownList = ({options, style, onChange}: DropdownListProps) => {
    const [selectedOption, setSelectedOption] = useState('');
    return (
        <View>
            <View
                style={{
                    minHeight: 25,
                    flexDirection: 'row',
                    backgroundColor: '#EFF2F5',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    ...style,
                }}>
                <View style={{flexGrow: 1}}>
                    <SelectDropdown
                        buttonStyle={{...style}}
                        buttonTextStyle={{
                            color:
                                selectedOption.length > 0
                                    ? '#000000'
                                    : '#666666',
                        }}
                        data={options ?? []}
                        defaultButtonText={'Chọn hạng mục'}
                        onSelect={(selectedItem, index) => {
                            setSelectedOption(selectedItem);
                            onChange && onChange(selectedItem, index);
                        }}
                        buttonTextAfterSelection={selectedItem => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem;
                        }}
                        rowTextForSelection={item => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item;
                        }}
                        onChangeSearchInputText={() => {}}
                    />
                </View>
                <Image
                    source={require('../../../image/down.png')}
                    style={{
                        width: 20,
                        height: 18,
                        marginTop: 2,
                    }}
                />
            </View>
        </View>
    );
};
export default DropdownList;
