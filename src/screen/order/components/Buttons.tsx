import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import SvgUri from 'react-native-svg-uri';

type ArrowButtonProps = {
    onPress: () => void;
    disabled: string;
};

export const ArrowUpButton: React.FC<ArrowButtonProps> = (
    { onPress }: { onPress: () => void },
    {
        status,
    }: {
        status: 'normal' | 'disabled';
    },
) => {
    useEffect(() => {
        console.log(status);
    }, [status]);
    let iconColor = '#1890FF';

    if (status === 'disabled') {
        iconColor = '#181818';
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: 24,
                    height: 24,
                    marginHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconColor,
                }}>
                <Svg height="100%" width="100%">
                    {/* Background Rectangle */}
                    <Rect width="100%" height="100%" rx={2} fill={iconColor} />

                    {/* White Arrow with Tail */}
                    <View style={{ paddingLeft: 2, paddingTop: 2 }}>
                        <Icon source="arrow-up" color="#ffffff" size={20} />
                    </View>
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

export const ArrowDownButton: React.FC<ArrowButtonProps> = (
    { onPress }: { onPress: () => void },
    {
        status,
    }: {
        status: 'normal' | 'disabled';
    },
) => {
    useEffect(() => {
        console.log(status);
    }, [status]);
    let iconColor = '#1890FF';

    if (status === 'disabled') {
        iconColor = '#181818';
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: 24,
                    height: 24,
                    marginHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconColor,
                }}>
                <Svg height="100%" width="100%">
                    {/* Background Rectangle */}
                    <Rect width="100%" height="100%" rx={2} fill={iconColor} />

                    {/* White Downward Arrow with Tail */}
                    <View style={{ paddingLeft: 2, paddingTop: 2 }}>
                        <Icon source="arrow-down" color="#ffffff" size={20} />
                    </View>
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

export const SearchBar = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(223, 216, 216, 0.5)',
                marginLeft: 10,
                padding: 8,
                borderRadius: 25,
                width: 390,
                height: 36,
            }}>
            <View style={{ marginLeft: 4 }}>
                <Icon
                    source="magnify"
                    color="rgba(113, 104, 104, 0.7)"
                    size={24}
                />
            </View>
            <Text
                style={{
                    color: 'rgba(113, 104, 104, 0.7)',
                    fontSize: 18,
                    marginTop: -4,
                    paddingLeft: 6,
                }}>
                Search
            </Text>
        </View>
    );
};
export const MoneyIcon = () => {
    return (
        <View>
            <Svg
                fill="#ffffff"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            </Svg>
        </View>
    );
};
export const FireIcon = ({ status }: { status: 'normal' | 'priority' }) => {
    let iconColor = 'grey'; // Màu mặc định là grey

    if (status === 'priority') {
        iconColor = 'red'; // Thay đổi màu thành đỏ nếu status là "priority"
    }

    return (
        <View style={{ marginTop: 2 }}>
            <Svg
                fill={iconColor}
                width="24"
                height="28"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                {...status}>
                <Path d="M9.32 15.653a.812.812 0 0 1-.086-.855c.176-.342.245-.733.2-1.118a2.106 2.106 0 0 0-.267-.779 2.027 2.027 0 0 0-.541-.606 3.96 3.96 0 0 1-1.481-2.282c-1.708 2.239-1.053 3.51-.235 4.63a.748.748 0 0 1-.014.901.87.87 0 0 1-.394.283.838.838 0 0 1-.478.023c-1.105-.27-2.145-.784-2.85-1.603a4.686 4.686 0 0 1-.906-1.555 4.811 4.811 0 0 1-.263-1.797s-.133-2.463 2.837-4.876c0 0 3.51-2.978 2.292-5.18a.621.621 0 0 1 .112-.653.558.558 0 0 1 .623-.147l.146.058a7.63 7.63 0 0 1 2.96 3.5c.58 1.413.576 3.06.184 4.527.325-.292.596-.641.801-1.033l.029-.064c.198-.477.821-.325 1.055-.013.086.137 2.292 3.343 1.107 6.048a5.516 5.516 0 0 1-1.84 2.027 6.127 6.127 0 0 1-2.138.893.834.834 0 0 1-.472-.038.867.867 0 0 1-.381-.29zM7.554 7.892a.422.422 0 0 1 .55.146c.04.059.066.126.075.198l.045.349c.02.511.014 1.045.213 1.536.206.504.526.95.932 1.298a3.06 3.06 0 0 1 1.16 1.422c.22.564.25 1.19.084 1.773a4.123 4.123 0 0 0 1.39-.757l.103-.084c.336-.277.613-.623.813-1.017.201-.393.322-.825.354-1.269.065-1.025-.284-2.054-.827-2.972-.248.36-.59.639-.985.804-.247.105-.509.17-.776.19a.792.792 0 0 1-.439-.1.832.832 0 0 1-.321-.328.825.825 0 0 1-.035-.729c.412-.972.54-2.05.365-3.097a5.874 5.874 0 0 0-1.642-3.16c-.156 2.205-2.417 4.258-2.881 4.7a3.537 3.537 0 0 1-.224.194c-2.426 1.965-2.26 3.755-2.26 3.834a3.678 3.678 0 0 0 .459 2.043c.365.645.89 1.177 1.52 1.54C4.5 12.808 4.5 10.89 7.183 8.14l.372-.25z" />
            </Svg>
        </View>
    );
};

export const SuccessIcon = () => {
    return (
        <View>
            <SvgUri
                width="106"
                height="106"
                source={require('../../../../image/icon/success.svg')}
                fill="black"
            />
        </View>
    );
};
export const GreenAddButton = () => {
    return (
        <View>
            <Svg height="17" width="19">
                {/* Vẽ hình tròn màu xanh lá */}
                <Circle cx="9.5" cy="8.5" r="8" fill="green" />
                {/* Vẽ viền trắng cho hình tròn */}
                <Circle
                    cx="9.5"
                    cy="8.5"
                    r="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                />
                {/* Vẽ dấu cộng */}
                <G>
                    {/* Vẽ đường ngang */}
                    <Line
                        x1="5"
                        y1="8.5"
                        x2="14"
                        y2="8.5"
                        stroke="white"
                        strokeWidth="2"
                    />
                    {/* Vẽ đường dọc */}
                    <Line
                        x1="9.5"
                        y1="4"
                        x2="9.5"
                        y2="13"
                        stroke="white"
                        strokeWidth="2"
                    />
                </G>
            </Svg>
        </View>
    );
};
export const BlueReduceButton = ({
    status,
}: {
    status: 'normal' | 'disabled';
}) => {
    let iconColor = 'grey';

    if (status === 'normal') {
        iconColor = '#5982CF';
    }
    return (
        <View>
            <Svg height="20" width="20">
                {/* Vẽ hình tròn */}
                <Circle cx="10" cy="10" r="9" fill={iconColor} />
                {/* Vẽ viền trắng cho hình tròn */}
                <Circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                />
                {/* Vẽ dấu trừ */}
                <G>
                    {/* Vẽ đường ngang */}
                    <Line
                        x1="6"
                        y1="10"
                        x2="14"
                        y2="10"
                        stroke="white"
                        strokeWidth="2"
                    />
                </G>
            </Svg>
        </View>
    );
};

export const BlueAddButton = () => {
    return (
        <View>
            <Svg height="20" width="20">
                {/* Vẽ hình tròn */}
                <Circle cx="10" cy="10" r="9" fill="#5982CF" />
                {/* Vẽ viền trắng cho hình tròn */}
                <Circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                />
                {/* Vẽ dấu cộng */}
                <G>
                    {/* Vẽ đường ngang */}
                    <Line
                        x1="6"
                        y1="10"
                        x2="14"
                        y2="10"
                        stroke="white"
                        strokeWidth="2"
                    />
                    {/* Vẽ đường dọc */}
                    <Line
                        x1="10"
                        y1="6"
                        x2="10"
                        y2="14"
                        stroke="white"
                        strokeWidth="2"
                    />
                </G>
            </Svg>
        </View>
    );
};

export const DeleteButton = () => {
    const buttonWidth = 16; // Chiều rộng của nút
    const buttonHeight = 16; // Chiều dài của nút
    return (
        <View style={{ width: buttonWidth, height: buttonHeight }}>
            <Svg
                width={buttonWidth}
                height={buttonHeight}
                viewBox={`0 0 ${buttonWidth} ${buttonHeight}`}>
                {/* Vẽ hình tròn background màu đỏ */}
                <Circle
                    cx={buttonWidth / 2}
                    cy={buttonHeight / 2}
                    r={buttonWidth / 2}
                    fill="#B8B4B4"
                />
                {/* Vẽ dấu X màu trắng */}
                <Path
                    d={`M${buttonWidth / 4} ${buttonHeight / 4} L${
                        (buttonWidth * 3) / 4
                    } ${(buttonHeight * 3) / 4} M${(buttonWidth * 3) / 4} ${
                        buttonHeight / 4
                    } L${buttonWidth / 4} ${(buttonHeight * 3) / 4}`}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
};
export const CancelButton = () => {
    const buttonWidth = 23; // Chiều rộng của nút
    const buttonHeight = 23; // Chiều dài của nút (đã điều chỉnh để là hình vuông)

    return (
        <View style={{ width: buttonWidth, height: buttonHeight }}>
            <Svg
                width={buttonWidth}
                height={buttonHeight}
                viewBox={`0 0 ${buttonWidth} ${buttonHeight}`}>
                {/* Vẽ hình vuông background màu trong suốt */}
                <Rect
                    x="0"
                    y="0"
                    width={buttonWidth}
                    height={buttonHeight}
                    fill="transparent" // Đặt fill thành transparent để làm nền trong suốt
                />
                {/* Vẽ dấu X màu xám */}
                <Path
                    d={`M${buttonWidth / 4} ${buttonHeight / 4} L${
                        (buttonWidth * 3) / 4
                    } ${(buttonHeight * 3) / 4} M${(buttonWidth * 3) / 4} ${
                        buttonHeight / 4
                    } L${buttonWidth / 4} ${(buttonHeight * 3) / 4}`}
                    stroke="#808080" // Màu xám
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
};
