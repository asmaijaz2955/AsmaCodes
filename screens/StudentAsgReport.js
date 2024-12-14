
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import Plus from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const StudentAsgReport = ({ navigation, route }) => {

    const [reglst, setReglst] = React.useState([]);
    const [total, settotal] = React.useState();
    const [obt, setObt] = React.useState();
    const { data, val } = route.params;
    useEffect(() => {
        let session = 'Spring-2023';
        let id = data.RegNo;

        let code = val.CourseCode;

        console.log(session, id, code);
        fetchQuizSheet();
    }, []);


    const fetchQuizSheet = async () => {
        let session = 'Spring-2023';
        let id = data.RegNo;

        let code = val.CourseCode;


        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Student/getQuizesReport?stdId=${id}&courseCode=${code}&session=${session}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setReglst(data);




        } catch (error) {
            console.log(error);
        }
    };
    const fetchAsgSheet = async () => {
        let session = 'Spring-2023';
        let id = data.RegNo;

        let code = val.CourseCode;


        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Student/getAsgReport?stdId=${id}&courseCode=${code}&session=${session}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setReglst(data);




        } catch (error) {
            console.log(error);
        }
    };
    const fetchTotalQuizSheet = async () => {
        let session = 'Spring-2023';
        let id = data.RegNo;

        let code = val.CourseCode;


        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Student/getQuizesReporttotal?stdId=${id}&courseCode=${code}&session=${session}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setObt(data.allobtainedmarks);
            settotal(data.alltotalmarks);




        } catch (error) {
            console.log(error);
        }
    };
    const fetchTotalAsgSheet = async () => {
        let session = 'Spring-2023';
        let id = data.RegNo;

        let code = val.CourseCode;


        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Student/getAsgReporttotal?stdId=${id}&courseCode=${code}&session=${session}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setObt(data.allobtainedmarks);
            settotal(data.alltotalmarks);




        } catch (error) {
            console.log(error);
        }
    };


    const renderItem = ({ item, index }) => (

        <View style={styles.row}>
            <View>
                <Text style={[styles.column, styles.regNo]}>{item.title}</Text>
            </View>
            <View>
                <Text style={[styles.column, styles.name]}>   {item.week}</Text>
            </View>
            <View style={styles.obtainedMarksContainer}>
                <Text style={styles.obtainedMarks}>{item.obtainedmarks}</Text>
            </View>
            <View style={styles.obtainedMarksContainer}>
                <Text style={styles.obtainedMarks}>{item.totalmarks}</Text>
            </View>
        </View>

    );

    return (

        <View style={styles.container}>
            <View style={styles.inputv}>
                <Text style={styles.input}> {data.Name}             </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View >
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {val.Name}  </Text>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="library-books" size={30} color='#076F65' onPress={fetchTotalAsgSheet} />
                    <Text style={{ color: '#076F65', marginLeft: 10 }} onPress={fetchAsgSheet}>Assignment   </Text>

                </View>
                <View style={{ flexDirection: 'row', marginLeft: 80 }}>
                    <Icon name="library-books" size={30} color='#076F65' onPress={fetchTotalQuizSheet} />
                    <Text style={{ color: '#076F65', marginLeft: 10 }} onPress={fetchQuizSheet}>Quiz</Text>
                </View>
            </View>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>OverAll Marks: {obt} / {total} </Text>
            <View style={{ flexDirection: 'row' }}>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 10, }}>
                        No#
                    </Text>
                </View>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 20, }}>
                        Week No
                    </Text>
                </View>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 40 }}>
                        Obtained
                    </Text>
                </View>
                <View>

                    <Text style={{ color: '#076F65', fontSize: 14, paddingHorizontal: 10 }}>
                        Total
                    </Text>
                </View>
            </View>


            <FlatList
                data={reglst}
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
        flexDirection: 'row'


    },
    inputvxx: {
        width: 100,
        marginTop: 10,
        height: 10,
        left: 140,
        fontSize: 10,
        fontWeight: 'bold',
        backgroundColor: '#076F65',
        color: '#FFFFFF'


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
    namem: {
        flex: 2,
        paddingHorizontal: 20,
        color: '#076F65',
    },
    obtainedMarksContainer: {
        flex: 1,
        alignItems: 'flex-end', // Align the text to the right side
        paddingRight: 8, // Add some right padding to create a gap between the text and the edge of the screen
    },
    obtainedMarks: {
        color: '#076F65',
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 24,
        height: 24,
        marginRight: 5,
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
        backgroundColor: 'red',
    },
    toggleButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default StudentAsgReport;
