
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Modal, Linking, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
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
const QuizSubmission = ({ navigation, route }) => {
    const { data, val, name, item } = route.params;

    const [Quiz, setQuiz] = React.useState([]);

    async function GetQuiz() {
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
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetQuizSub?qid=${id}&sec=${section}&sem=${semester}&prog=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");

                setQuiz(data);


            }
        } catch (error) {
            console.log(error);
        }
    };
    const [submittedStudentIDs, setSubmittedStudentIDs] = useState([]);


    useEffect(() => {


        GetQuiz();

    }, []);
    useEffect(() => {
        if (Quiz != null) {
            const submittedStudentIDs = Quiz.filter((item) => item.Status === 'Submitted').map((item) => item.id);
            setSubmittedStudentIDs(submittedStudentIDs);
            console.log('siddddddddd', submittedStudentIDs);
        }
    }, [Quiz]);
    const AddMarks = async () => {

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
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetQuizObt`
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

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        GetQuiz();
        setRefreshing(false);
    };
    const [textInputData, setTextInputData] = useState([]);

    const handleTextInputChange = (text, index) => {
        setTextInputData(prevData => {
            const updatedData = [...prevData];
            updatedData[index] = text;
            return updatedData;
        });
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
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>

                <View style={styles.inputv}>
                    <Text style={{ color: "#076F65" }}> {data?.Name}           </Text>
                    <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
                </View>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {name?.CourseName}    </Text>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Section :{val}  </Text>

                <TouchableOpacity onPress={AddMarks}>
                    <Ant name="plussquareo" size={40} color='#076F65' style={styles.iconp} />
                </TouchableOpacity>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>  Quiz </Text>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>  Total Marks:{item.TotalMarks}</Text>

                <FlatList
                    data={Quiz}
                    renderItem={({ item, index }) => renderTextInputItem({ item, index })}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />


            </View>
            {/* <TouchableOpacity style={styles.button} onPress={AddMarks}><Text style={styles.text}>Submit</Text></TouchableOpacity>
      */}
            <TouchableOpacity onPress={() => navigation.navigate('QuizReport', { data, val, name, item })}>
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
    iconp: {
        // marginLeft:170,
        marginTop: -47,
        position: 'absolute',
        marginLeft: 320
    },

    inputy: {
        width: 100,
        marginTop: -40,
        height: 40,
        left: 270,
        fontSize: 14,
        fontWeight: 'bold',


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
    textInput: {
        flex: 1,
        fontSize: 14, // Adjust the font size here
        color: '#076F65',
        borderWidth: 1,
        borderRadius: 10, // Add border radius to round the corners
        paddingHorizontal: 10,
        paddingVertical: 6,

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
    // iconp: {
    //     // marginLeft:170,
    //     marginTop: -43,
    //     position: 'absolute',
    //     marginLeft: 320
    // },

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
export default QuizSubmission;