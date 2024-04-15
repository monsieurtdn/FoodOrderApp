// Import React and Component
import React, {useState} from 'react';
import {IconButton, Menu} from 'react-native-paper';

const OptionHomeHeader = () => {
    const [showOption, setShowOption] = useState<boolean>(false);

    const handleMenuShow = () => {
        setShowOption(true);
    };

    const handleMenuDismiss = () => {
        setShowOption(false);
    };

    return (
        // <View
        //   style={{
        //     flexDirection: 'row',
        //   }}>
        <Menu
            visible={showOption}
            onDismiss={handleMenuDismiss}
            anchor={
                <IconButton icon="dots-vertical" onPress={handleMenuShow} />
            }>
            <Menu.Item
                onPress={() => {
                    console.log('Chi tiết');
                }}
                title="Chi tiết"
            />
            <Menu.Item
                onPress={() => {
                    console.log('Xem báo cáo');
                }}
                title="Xem báo cáo"
            />
            <Menu.Item
                onPress={() => {
                    console.log('Xác nhận');
                }}
                title="Xác nhận"
            />
            <Menu.Item
                onPress={() => {
                    console.log('Hủy xác nhận');
                }}
                title="Hủy xác nhận"
            />
            <Menu.Item
                onPress={() => {
                    console.log('Ký số');
                }}
                title="Ký số"
            />
        </Menu>
        // </View>
    );
};
export default OptionHomeHeader;
