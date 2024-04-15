import Utils from 'common/Utils';
import { IFloor } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar, Surface } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setZoneSelected } from 'store/slice/HotelSlice';
import { useDispatchRoot } from 'store/store';

interface IProps {
    zone: IFloor;
    navigation: any;
}
export const ZoneItem = ({ zone, navigation }: IProps) => {
    const dispatch = useDispatchRoot();
    return (
        <Surface style={styles.zone} elevation={4}>
            <TouchableOpacity
                style={{ alignItems: 'center', flex: 1 }}
                onPress={() => {
                    navigation.navigate(Screen.HotelScreen.ZoneDetail, {
                        zone,
                    });
                    dispatch(setZoneSelected(zone));
                }}>
                <View style={styles.zoneNameContainer}>
                    <View style={styles.zoneNameWrapper}>
                        <Text style={styles.zoneName}>Floor {zone.floor}</Text>
                        <Text style={styles.helperText}>
                            {'(Chọn để xem tầng)'}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={20}
                        style={{ padding: 0 }}
                    />
                </View>
                <View style={styles.zoneWrapper}>
                    <Text
                        style={{
                            fontSize: Utils.getFontSize(18),
                            marginBottom: 5,
                        }}>{`Số phòng: ${zone.roomNumber}`}</Text>
                    <View style={styles.zoneProgress}>
                        <Text style={styles.progressLabel}>
                            Occupied Clean (OC):
                        </Text>
                        <View style={styles.progressInfo}>
                            <ProgressBar
                                progress={zone.oc / zone.roomNumber}
                                color={'green'}
                                style={styles.progressBar}
                            />
                            <Text style={{ fontWeight: '500' }}>{zone.oc}</Text>
                        </View>
                    </View>
                    <View style={styles.zoneProgress}>
                        <Text style={styles.progressLabel}>
                            Occupied Dirty (OD):
                        </Text>
                        <View style={styles.progressInfo}>
                            <ProgressBar
                                progress={zone.od / zone.roomNumber}
                                color={'red'}
                                style={styles.progressBar}
                            />
                            <Text style={{ fontWeight: '500' }}>{zone.od}</Text>
                        </View>
                    </View>
                    <View style={styles.zoneProgress}>
                        <Text style={styles.progressLabel}>
                            Vacant Dirty (VD):
                        </Text>
                        <View style={styles.progressInfo}>
                            <ProgressBar
                                progress={zone.vd / zone.roomNumber}
                                color={'red'}
                                style={styles.progressBar}
                            />
                            <Text style={{ fontWeight: '500' }}>{zone.vd}</Text>
                        </View>
                    </View>
                    <View style={styles.zoneProgress}>
                        <Text style={styles.progressLabel}>
                            Vacant Clean (VC):
                        </Text>
                        <View style={styles.progressInfo}>
                            <ProgressBar
                                progress={zone.vc / zone.roomNumber}
                                color={'green'}
                                style={styles.progressBar}
                            />
                            <Text style={{ fontWeight: '500' }}>{zone.vc}</Text>
                        </View>
                    </View>
                    <View style={styles.zoneProgress}>
                        <Text style={styles.progressLabel}>
                            VC Inspected (VCI):
                        </Text>
                        <View style={styles.progressInfo}>
                            <ProgressBar
                                progress={zone.vci / zone.roomNumber}
                                color={'green'}
                                style={styles.progressBar}
                            />
                            <Text style={{ fontWeight: '500' }}>
                                {zone.vci}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};
const styles = StyleSheet.create({
    zone: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 6,
    },
    zoneNameContainer: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingRight: 14,
        width: '100%',
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    zoneNameWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    zoneName: {
        fontSize: 20,
        fontWeight: '600',
        verticalAlign: 'bottom',
    },
    helperText: {
        fontSize: 11,
        color: '#00000073',
        paddingBottom: 4,
        verticalAlign: 'bottom',
    },
    zoneWrapper: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        width: '100%',
        gap: 15,
    },
    zoneProgress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBar: {
        width: '85%',
        minWidth: 80,
        maxWidth: 120,
        borderRadius: 6,
        height: 8,
    },
    progressLabel: {
        maxWidth: '50%',
        flexShrink: 1,
        fontSize: Utils.getFontSize(17),
    },
    progressInfo: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
