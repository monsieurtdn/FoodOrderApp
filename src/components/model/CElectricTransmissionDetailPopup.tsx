import {ITitleAndDetailData} from 'common/define-types';
import CListInformation, {IListInformation} from 'components/CListInformation';
import CModel from 'components/CModel';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
interface CElectricTransmissionDetailProps {
    isVisible?: boolean;
    data?: ITitleAndDetailData;
    onClose: (value: boolean) => void;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CElectricTransmissionDetailPopup: React.FC<
    CElectricTransmissionDetailProps
> = ({isVisible = false, setIsVisible, data}) => {
    const [informationData, setInformationData] =
        useState<IListInformation[]>();

    useEffect(() => {
        const dataTmp: IListInformation[] = [];
        data?.data?.forEach(item => {
            dataTmp.push({
                leftContent: item.label ?? '',
                rightContent: item.value,
            });
        });
        setInformationData(dataTmp);
    }, [data]);

    return (
        <CModel
            isVisible={isVisible}
            dismissable={true}
            setIsVisible={setIsVisible}>
            <View>
                <Text
                    style={{
                        color: '#000000',
                        fontFamily: 'Roboto',
                        fontSize: 17,
                        fontWeight: '700',
                        paddingVertical: 10,
                        marginLeft: 30,
                    }}>
                    {data?.title}
                </Text>
                <View
                    style={{
                        width: '100%',
                        marginHorizontal: 30,
                        borderBottomWidth: 1,
                        borderStyle: 'dashed',
                        marginBottom: 10,
                        borderColor: '#D4D4D4',
                    }}
                />
                <CListInformation
                    key={1}
                    showBorder={false}
                    data={informationData ?? []}
                />
            </View>
        </CModel>
    );
};
export default CElectricTransmissionDetailPopup;
