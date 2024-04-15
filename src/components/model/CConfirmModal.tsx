import CModel from 'components/CModel';
import React, {ReactNode, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Title, Button, IconButton, Portal} from 'react-native-paper';
interface CConfirmModalProps {
    title: string;
    message?: string;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: (value: boolean) => void;
    children?: ReactNode;
}
const CConfirmModal: React.FC<CConfirmModalProps> = ({
    message,
    title,
    onClick,
    isVisible = false,
    setIsVisible,
    children,
}) => {
    useEffect(() => {
        setIsVisible(isVisible);
    }, [isVisible]);
    return (
        <Portal>
            <CModel isVisible={isVisible} setIsVisible={setIsVisible}>
                <View style={styles.modalHeader}>
                    <IconButton color="#FAAD14" icon={'alert-circle-outline'} />
                    <Title style={{color: 'black', width: '90%'}}>
                        {title}
                    </Title>
                </View>
                <View style={styles.modalContent}>
                    <View style={{width: 50}} />
                    {message && <Text style={{color: 'black'}}>{message}</Text>}
                    {children}
                    <View style={styles.modalFooter}>
                        <Button
                            style={styles.buttonNo}
                            mode="contained"
                            color="white"
                            onPress={() => {
                                setIsVisible(false);
                                onClick(false);
                            }}>
                            {'Hủy'}
                        </Button>
                        <Button
                            style={styles.buttonYes}
                            color={'#1890FF'}
                            mode="contained"
                            onPress={() => {
                                setIsVisible(false);
                                onClick(true);
                            }}>
                            {'Đồng ý'}
                        </Button>
                    </View>
                </View>
            </CModel>
        </Portal>
    );
};
export default CConfirmModal;

const styles = StyleSheet.create({
    modalHeader: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '95%',
        marginBottom: 10,
    },
    modalContent: {
        minHeight: 120,
        alignSelf: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: '95%',
    },
    modalFooter: {
        height: 57,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    buttonNo: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        color: 'black',
        marginHorizontal: 5,
    },
    buttonYes: {
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
        marginHorizontal: 5,
    },
});
