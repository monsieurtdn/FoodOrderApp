export enum StackScreen {
    name = 'DrawerNavigationRoutes',
    HomeScreen = 'HomeScreen',
    RegisterFaceScreen = 'RegisterFaceScreen',
    SuccessfullRegisterScreen = 'SuccessfullRegisterScreen',
    FrontFaceScreen = 'FrontFaceScreen',
    AttendanceScreen = 'AttendanceScreen',
}
export enum ScanScreen {
    name = 'ScanNavigationRoutes',
    SelectType = 'SelectType',
    IdentificationScan = 'IdentificationScan',
    IdentificationInfor = 'IdentificationInfor',
    IdentificationSubmitResult = 'IdentificationSubmitResult',
    qrScan = 'qrScan',
}

export enum HotelScreen {
    name = 'HotelNavigationRoutes',
    ZoneScreen = 'ZoneScreen',
    ZoneDetail = 'ZoneDetail',
    RoomDetail = 'RoomDetail',
    MiniBar = 'MiniBar',
    Laundry = 'Laundry',
}

export enum TabScreenLead {
    name = 'TabNavigatorRoutesLead',
    mainScreen = 'MainScreen',
    homeScreen = 'HomeScreen',
    jobScreen = 'JobScreen',
    faceCheckScreen = 'FaceCheckScreen',
    detectFaceSuccessfullyScreen = 'DetectFaceSuccessfullyScreen',
    detectFaceFailScreen = 'DetectFaceFailScreen',
    checkSuccessfullyScreen = 'CheckSuccessfullyScreen',
    checkFailScreen = 'CheckFailScreen',
    faceRegisterScreen = 'FaceRegisterScreen',
    registerSuccessfullyScreen = 'RegisterSuccessfullyScreen',
    registerFailScreen = 'RegisterFailScreen',
}

export enum ProfileScreen {
    name = 'ProfileNavigatorRoutes',
    profile = 'Profile',
    editProfile = 'EditProfile',
}

export enum OrderScreen {
    name = 'OrderNavigatorRoutes',
    FoodAppScreen = 'FoodAppScreen',
    WelcomeScreen = 'WelcomeScreen',
    MenuScreen = 'MenuScreen',
    OrderCheckScreen = 'OrderCheckScreen',
    SuccessScreen = 'SuccessScreen',
    OrderInfoScreen = 'OrderInfoScreen',
    AllRestaurantsScreen = 'AllRestaurantsScreen',
    PayScreen = 'PayScreen',
    SearchScreen = 'SearchScreen',
}

export const Screen = {
    StackScreen: StackScreen,
    Auth: 'Auth',
    RegisterScreen: 'RegisterScreen',
    MainScreen: 'MainScreen',
    OrderScreen: OrderScreen,
    TabScreen: TabScreenLead,
    ScanScreen: ScanScreen,
    HotelScreen: HotelScreen,
    ProfileScreen: ProfileScreen,
};
