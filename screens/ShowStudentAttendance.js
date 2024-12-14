
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import Plus from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ShowStudentAttendance = ({ navigation, route }) => {
    const [attendanceData, setAttendanceData] = React.useState([]);
    const [reglst, setReglst] = React.useState([]);
    const { data, val } = route.params;
    useEffect(() => {

        console.log(data);
        fetchAttendanceSheet();
    }, []);

    const [len, setllen] = React.useState(0);
    const fetchAttendanceSheet = async () => {
        let regno = data.RegNo;
        console.log(regno);
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/showAttendance?reg=${regno}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setAttendanceData(data);
            const presentCount = data.filter((item) => item.Status === 1).length;
            setCount(presentCount);
            // setllen(attendanceData.length);



        } catch (error) {
            console.log(error);
        }
    };


    const [count, setCount] = React.useState(0);





    const renderItem = ({ item, index }) => (

        <View style={styles.row}>
            <View>
                <Text style={[styles.column, styles.regNo]}>  {new Date(item.DateTime).toLocaleString(undefined, {
                    dateStyle: 'short',
                    timeStyle: 'short',
                })}</Text>
            </View>

            <View>
                <Text style={[styles.column, styles.name]}>{item.Type}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.toggleButton,
                    item.status ? styles.present : styles.absent,
                ]}

                disabled={true}
            >
                <Text style={styles.toggleButtonText}>{item.Status ? 'P' : 'A'}</Text>
            </TouchableOpacity>
        </View>
    );
    const handleToggle = () => {
        // This function will only change the UI state of the toggle button, not update the item's status
        setStatus(!status);
    };
    const [inputValue, setInputValue] = useState('');
    return (

        <View style={styles.container}>
            <View style={styles.inputv}>
                <Text style={{ color: "#076F65" }}> {data.Name}             </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>

            {/* <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {val.CourseName}    </Text>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Section :{val}  </Text> */}
            <View style={styles.inputv}>

                <Text style={{ color: '#076F65', alignSelf: 'center' }}>       {count}/{attendanceData.length}  </Text>


            </View>


            {/* <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#076F65', fontSize: 14, marginLeft: 10 }}> Students: {len}</Text>
                <Text style={{ color: '#076F65', fontSize: 14, marginLeft: 150 }}> Presents: {count}</Text>
            </View> */}
            <View style={{ flexDirection: 'row' }}>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 30, }}>
                        Date
                    </Text>
                </View>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, marginLeft: 108, }}>
                        Type
                    </Text>
                </View>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 55, }}>
                        Status
                    </Text>
                </View>
            </View>
            {/* <View style={styles.row}>
                <View>
                    <Text style={[styles.column, styles.regNo]}>Reg No</Text>
                </View>
                <View>
                    <Text style={[styles.column, styles.name]}>Name</Text>
                </View>

                <Text style={styles.toggleButtonText}>Status</Text>

            </View> */}

            <FlatList
                data={attendanceData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 2, // Added horizontal padding
    }, container1: {
        width: 150,
        height: 40,
        marginTop: 5,
        marginLeft: 90,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#076F65',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',


    },
    input: {
        fontSize: 16,


    },
    header: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#076F65',
    },
    inputv: {
        width: 90,
        marginTop: 5,
        height: 40,
        left: -10,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#076F65',
        color: '#FFFFFF"'


    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,

    },
    input: {
        width: 100,
        marginTop: 2,
        height: 40,
        left: 40,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',

    },
    column: {
        flex: 1,
        paddingHorizontal: 8,
        color: '#076F65',

    },
    regNo: {
        flex: 0.5,
        paddingHorizontal: 4,
        color: '#076F65',
    },
    name: {
        flex: 1,
        paddingHorizontal: 8,
        color: '#076F65',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 24,
        height: 24,
        marginRight: 20,
        marginLeft: 'auto', // Align toggle button to the right side
    },
    present: {
        backgroundColor: 'green',
    },
    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 305
    },
    icon1: {
        // marginLeft:170,
        marginTop: 58,
        position: 'absolute',
        marginLeft: 308
    },
    inputv: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        width: 355,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: "#FFFFFF",
        borderColor: '#076F65',
        borderWidth: 1,

        marginLeft: 3,

    },

    absent: {
        backgroundColor: 'green',
    },
    toggleButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ShowStudentAttendance;
