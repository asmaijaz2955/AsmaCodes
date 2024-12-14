
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Modal, Linking, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Io from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import IP from '../ip';
const AssignmentSubmission = ({ navigation, route }) => {
    const { data, val, name, item } = route.params;
    const [submittedStudentIDs, setSubmittedStudentIDs] = useState([]);
    const [Asgs, setAsgs] = React.useState([]);

    async function GetAsg() {
        let id = item.Id;
        let section = item.Section;
        let semester = item.Semester;
        let program = item.Program;

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetAsgSub?aid=${id}&sec=${section}&sem=${semester}&prog=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                // console.log(data, "get data of weekk");

                setAsgs(data);
                console.log('Asgssss', Asgs);

            }
        } catch (error) {
            console.log(error);
        }
    };

    const [textInputData, setTextInputData] = useState([]);

    const handleTextInputChange = (text, index) => {
        setTextInputData(prevData => {
            const updatedData = [...prevData];
            updatedData[index] = text;
            console.log('Data .....', textInputData);
            return updatedData;
        });
    };
    const AddMarks = async () => {
        console.log(textInputData);
        var raw = JSON.stringify({
            "obmarks": textInputData,
            "Sid": submittedStudentIDs,
            "aid": item.Id,
            "sec": item.Section,
            "sem": item.Semester,
            "prog": item.Program
        });

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: raw

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetAsgObt`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    };
    const renderTextInputItem = ({ item, index }) => (
        <>
            <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                    <Ions name="ios-mail-outline" size={30} color='#076F65' style={styles.icon1} />
                    <Text style={{ alignItems: 'flex-start', color: '#076F65' }}>{item.id} {item.Status}</Text>
                </View>
                <TextInput
                    style={styles.textInput}

                    onChangeText={(text) => handleTextInputChange(text, index)}
                    value={textInputData[index]}
                />
            </View>
        </>
    );
    const [count, setCount] = useState(0);
    useEffect(() => {
        GetAsg();
    }, []);
    useEffect(() => {
        if (Asgs != null) {
            const submittedStudentIDs = Asgs.filter((item) => item.Status === 'Submitted').map((item) => item.id);
            setSubmittedStudentIDs(submittedStudentIDs);
            console.log('siddddddddd', submittedStudentIDs);
        }
    }, [Asgs]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        GetAsg();
        setRefreshing(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            <View style={styles.container}>

                <View style={styles.inputv}>
                    <Text style={{ color: "#076F65" }}> {data?.Name}           </Text>
                    <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
                </View>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {name?.CourseName}    </Text>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Section :{val}  </Text>

                <Text style={{ color: '#076F65', alignSelf: 'center' }}>  {item.Title} </Text>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>  Total Marks:{item.TotalMarks}</Text>
                <TouchableOpacity onPress={AddMarks}>
                    <Ant name="plussquareo" size={40} color='#076F65' style={styles.iconp} />
                </TouchableOpacity>
                <FlatList
                    data={Asgs}
                    renderItem={({ item, index }) => renderTextInputItem({ item, index })}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />

                {/* <TouchableOpacity style={styles.button} onPress={AddMarks}><Text style={styles.text}>Submit</Text></TouchableOpacity>
             */}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AsgReport', { data, val, name, item })}>
                <Ions name="arrow-redo" size={40} color='#076F65' style={styles.iconp} />
            </TouchableOpacity>
        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    button: {
        marginTop: 15,
        backgroundColor: '#076F65',
        alignSelf: 'center',
        borderRadius: 32,
        width: 200,
        height: 50,
    },
    text: {
        alignSelf: 'center',
        top: 6,
        fontSize: 25,
        fontWeight: 'bold',
        color: "#FFFFFF"
    },
    inputview: {

        flexDirection: 'row',
        borderWidth: 1,
        width: 400,
        marginTop: 10,
        height: 70,
        left: -10,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#B3DED6',
        borderColor: '#B3DED6',

    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'absolute',
        marginHorizontal: 20,
        marginVertical: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: '#57B0A8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center'

    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxText: {
        color: '#076F65',
        marginLeft: 5,
    },
    inputy: {
        width: 100,
        marginTop: -40,
        height: 40,
        left: 270,
        fontSize: 14,
        fontWeight: 'bold',


    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'absolute',
        marginHorizontal: 20,
        marginVertical: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: '#57B0A8',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    inputview: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        width: 300,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#B3DED6',
        borderColor: '#B3DED6',
        alignSelf: 'center'
    },
    button: {
        marginTop: -70,
        backgroundColor: '#076F65',
        marginBottom: 200,
        marginLeft: 180,
        borderRadius: 32,
        width: 170,
        height: 50,
    },
    inputvi: {
        flexDirection: 'row',
        width: 360,
        marginTop: 8,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        borderColor: '#076F65',
        borderWidth: 1,
        justifyContent: 'space-between'

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
    inputvi: {
        flexDirection: 'row',
        width: 360,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        borderColor: '#076F65',
        borderWidth: 1,
        justifyContent: 'space-between'

    },

    input: {
        marginTop: 10,
        color: '#076F65',
        fontWeight: 'bold', alignItems: 'center'
    },
    inputx: {
        width: 100,
        marginTop: 2,
        height: 40,
        left: 130,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',

    },
    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 305
    },
    iconx: {
        // marginLeft:170,
        position: 'absolute',

    },
    icone: {
        // marginLeft:170,
        // position: 'absolute',
        left: 30

    },
    icona: {
        // marginLeft:170,
        marginTop: -47,
        position: 'absolute',
        marginLeft: 280
    },
    iconp: {
        // marginLeft:170,
        marginTop: -43,
        position: 'absolute',
        marginLeft: 320
    },
    text: {
        alignSelf: 'center',
        top: 6,
        fontSize: 25,
        fontWeight: 'bold',
        color: "#FFFFFF"
    },


    inputviii: {
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        width: 270,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: "#076F65",
        borderColor: '#076F65',
        marginLeft: 7,

    },

});
export default AssignmentSubmission;