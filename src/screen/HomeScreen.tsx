import { Screen } from 'common/screenEnums';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const HomeScreen = (props: { navigation: any }) => {
    // const { user } = useSelectorRoot(x => x.login);
    // const dispatch = useDispatch();
    // const [image, setImage] = useState<any>();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate(
                        Screen.StackScreen.FrontFaceScreen,
                    );
                }}
                activeOpacity={0.8}
                style={{
                    backgroundColor: '#329BF0',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    padding: 10,
                    width: '80%',
                    height: 100,
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: '600',
                    }}>
                    {'Đăng ký điểm danh'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate(
                        Screen.StackScreen.AttendanceScreen,
                    );
                }}
                activeOpacity={0.8}
                style={{
                    backgroundColor: '#329BF0',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50,
                    padding: 10,
                    width: '80%',
                    height: 100,
                }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 13,
                        fontWeight: '600',
                    }}>
                    {'Điểm danh'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 8,
//         paddingHorizontal: 25,
//         width: '100%',
//         marginVertical: 5,
//     },
//     boxWithShadow: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 5,
//     },
//     container: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     button: {
//         borderWidth: 1,
//         borderRadius: 5,
//         color: 'white',
//         marginHorizontal: 5,
//     },
// });

export default HomeScreen;
