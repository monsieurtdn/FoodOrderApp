import Geolocation from 'react-native-geolocation-service';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';

const useLocationHook = () => {
    const [latitude, setLatitude] = useState<any>();
    const [longitude, setLongitude] = useState<any>();

    const handleLocationPermissionDenied = () => {
        showMessage({
            message:
                'Lỗi khi lấy thông tin về vị trí hiện tại. Hãy kiểm tra lại setting.',
            type: 'warning',
        });
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            error => {
                // Xử lý khi không có quyền truy cập vị trí hoặc lỗi khác
                // console.error('Lỗi khi lấy vị trí:', error);

                // Kiểm tra xem lỗi có phải là do từ chối truy cập vị trí
                console.log(error.code, error.message);
                handleLocationPermissionDenied();
            },
            { enableHighAccuracy: false, timeout: 20000 },
        );
    }, []);

    return { latitude, longitude };
};

export default useLocationHook;
