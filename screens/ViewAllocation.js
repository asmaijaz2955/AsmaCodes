import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IP from '../ip';
import Ions from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown';
const ViewAllocation = ({ navigation }) => {
    const [changeCount, setChangeCount] = useState(0);
    useEffect(() => {
        if (changeCount == 2 || changeCount == 1) {
            getAllocation();
        }
        if (changeCount == 3) {

            setChangeCount(0);
        }
    }, [changeCount])
    const [Session, setSession] = useState('Fall');
    const getAllocation = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/allAllocations?session=${Session}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            const sortedData = [...data];
            sortedData.sort((a, b) => a.TeacherId.localeCompare(b.TeacherId)); // Sort by TeacherId

            setList(sortedData);
            console.log("Allocations:", data[0].allocations);




        } catch (error) {
            console.log(error);
        }
    };
    const [list, setList] = React.useState([]);
    function handleSessionChange(value, setSelectedValue) {
        setSession(value);
        setChangeCount(changeCount + 1);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Picker style={styles.picker} selectedValue={Session} onValueChange={(value) => handleSessionChange(value, Session)}>
                    <Picker.Item label="Fall-2023" value="Fall-2023" />
                    <Picker.Item label="Spring-2023" value="Spring-2023" />
                    <Picker.Item label="Summer-2023" value="Summer-2023" />
                </Picker>
            </View>
            <FlatList data={list} renderItem={({ item }) => {
                // console.log('Item', item.allocations)
                return (
                    <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }}> {item.TeacherId}</Text>

                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Picker style={styles.picker} mode="dropdown">
                                    {
                                        item.allocations.map((allocation, index) => {
                                            console.log('allocation', allocation)
                                            return (

                                                <Picker.Item key={index} label={` ${allocation.CourseName},${allocation.Program},  ${allocation.Semester},`} value={allocation.CourseName} style={styles.pickerItem} />
                                            )
                                        })
                                    }
                                </Picker>
                                <View style={styles.pickerArrow} />

                            </View>
                        </View>
                    </View>
                );
            }} />

        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },

    inputv: {
        width: 150,
        marginTop: 10,
        height: 40,
        left: -10,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#076F65',


    },
    inputa: {
        // width: 140,
        width: '100%',
        marginTop: 10,
        height: 40,
        left: 50,
        fontSize: 10,
        fontWeight: 'bold',
        backgroundColor: '#1B9595',


    },
    input: {
        width: 130,
        marginTop: 10,
        height: 40,
        left: -10,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#1B9595',



    },
    picker: {

        width: 30,
        height: 30,
        opacity: 0,

        borderWidth: 1,
        borderRadius: 20,

        marginTop: 10,
        marginBottom: 6,
        marginEnd: 2,
        paddingHorizontal: 10,
        overflow: 'hidden',
        color: '#076F65',

    },
    inputvii: {
        width: 130,
        marginTop: -106,
        height: 40,
        left: 210,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#1B9595',


    },
    header: {
        backgroundColor: '#076F65',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
        width: 150,
        height: 40,
        borderRadius: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    inputvix: {
        width: 130,
        marginTop: 2,
        height: 40,
        left: 210,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#1B9595',


    },
    inputvi: {
        flexDirection: 'row',
        width: 355,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        borderColor: '#076F65',
        borderWidth: 1,
        justifyContent: 'space-between',
        color: '#076F65',

    },
    pickerItem: {
        fontSize: 14,
        color: '#076F65',
    },
    pickerArrow: {
        position: 'absolute',
        top: 25,
        right: 10,
        borderLeftWidth: 6,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#076F65',
        transform: [{ rotate: '45deg' }],
    },

    button: {
        marginTop: 10,
        backgroundColor: '#076F65',
        alignSelf: 'center',
        borderRadius: 32,
        width: 200,
        height: 50,
    },
    text: {
        alignSelf: 'center',
        top: 8,
        fontSize: 25,
        fontWeight: 'bold'
    },
    textfor: {
        marginTop: 5,
        marginLeft: 200
    }

});
export default ViewAllocation;
