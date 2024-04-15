// import Switch from '@meksiabdou/react-native-switch';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ProfileMenuItem } from './ProfileMenuItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Surface } from 'react-native-paper';

interface IProps {
    navigation: any;
    showLogout: () => void;
}

// const SecuritySwitch = () => {
//     const [hasSecurity, setHasSecurity] = useState(false);
//     return (
//         <Switch
//             value={hasSecurity}
//             onValueChange={() => setHasSecurity(prev => !prev)}
//             backgroundInActive={'#E8E8E8'}
//             backgroundActive={'#1890FF'}
//             width={40}
//             circleSize={18}
//             activeText={''}
//             inActiveText={''}
//         />
//     );
// };
export const ProfileMenu = ({ navigation, showLogout }: IProps) => {
    const menu = [
        // {
        //     icon: 'bell-outline',
        //     title: 'Thông báo',
        //     description: 'Xem các thông báo',
        // },
        {
            icon: 'account-outline',
            title: 'Tài khoản',
            // description: 'Chỉnh sửa tài khoản',
            description: 'Thông tin tài khoản',
            onPress: () =>
                navigation.navigate(Screen.ProfileScreen.name, {
                    screen: Screen.ProfileScreen.editProfile,
                }),
        },
        // {
        //     icon: 'lock-outline',
        //     title: 'Face ID / Touch ID',
        //     description: 'Bảo mật ứng dụng',
        //     right: <SecuritySwitch />,
        // },
        {
            icon: 'logout-variant',
            title: 'Đăng xuất',
            description: 'Thoát tài khoản khỏi ứng dụng',
            onPress: showLogout,
        },
    ];
    return (
        <Surface style={styles.container}>
            {menu.map((item, index) => (
                <ProfileMenuItem
                    key={`${item.icon}-${index}`}
                    {...item}
                    icon={
                        <MaterialCommunityIcons
                            name={item.icon}
                            color={'#0050B3'}
                            size={20}
                        />
                    }
                />
            ))}
        </Surface>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: 'white',
    },
});
