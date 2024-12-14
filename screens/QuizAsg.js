
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Modal, Linking, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
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
const QuizAsg = ({ navigation, route }) => {
    const { data, val, name } = route.params;
    const [Quizs, setQuizs] = useState([]);
    const [Grader, setGrader] = useState([]);
    const [Asgs, setAsgs] = React.useState([]);

    async function GetAsg() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, program, semester, section);
        let cname = name.CourseCode;
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetAsg?ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");

                setAsgs(data);


            }
        } catch (error) {
            console.log(error);
        }
    };
    async function GetQuiz() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, program, semester, section);
        let cname = name.CourseCode;
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetQuiz?ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");

                setQuizs(data);


            }
        } catch (error) {
            console.log(error);
        }
    };
    async function GetGrader() {
        let id = data.Id;
        console.log('tidd', id);
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetGrader?tid=${id}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");

                setGrader(data);


            }
        } catch (error) {
            console.log(error);
        }
    };
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const toggleQuizSelection = (quiz) => {
        const updatedSelectedQuizzes = selectedQuizzes.includes(quiz)
            ? selectedQuizzes.filter(item => item !== quiz)
            : [...selectedQuizzes, quiz];

        setSelectedQuizzes(updatedSelectedQuizzes);
    };
    useEffect(() => {
        console.log(val);
        console.log(name.CourseName);
        console.log(name.CourseCode);
        GetQuiz();
        GetAsg();
        GetGrader();
        const defaultSelectedAsgs = Asgs.filter(asg => asg.isForGrader === 1);
        setSelectedAsgs(defaultSelectedAsgs);
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        GetQuiz();
        GetAsg();
        setRefreshing(false);
    };
    const [selectedValue, setSelectedValue] = useState('');

    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
    };
    const [selectedAsgs, setSelectedAsgs] = useState([]);

    const toggleAsgSelection = (asg) => {
        const updatedSelectedAsgs = selectedAsgs.includes(asg)
            ? selectedAsgs.filter(item => item !== asg)
            : [...selectedAsgs, asg];


        console.log(selectedAsgs)
        setSelectedAsgs(updatedSelectedAsgs);
    };
    // const handleAsgSelection = (item) => {
    //     item.isForGrader = item.isForGrader === 1 ? 0 : 1;
    //     // Update the assignment object with the new isForGrader value
    //     const updatedAsgs = Asgs.map((asg) =>
    //         asg.id === item.id ? { ...asg, isForGrader: item.isForGrader } : asg
    //     );
    //     setAsgs(updatedAsgs);
    // };


    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={{ color: "#076F65" }}> {data?.Name}           </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>

            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {name?.CourseName}    </Text>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Section :{val}  </Text>
            <TouchableOpacity onPress={GetAsg}>
                <Ant name="plussquareo" size={40} color='#076F65' style={styles.iconp} />
            </TouchableOpacity>
            <Picker
                style={styles.inputviii}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleValueChange(itemValue)}
            >
                {Grader.map((item) => (
                    <Picker.Item
                        key={item.Name}
                        label={item.Name}
                        value={item}
                    />
                ))}
            </Picker>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>  Assignments </Text>
            <FlatList data={Asgs} renderItem={({ item }) =>

                <>
                    <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                            <Ions name="ios-mail-outline" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => navigation.navigate('AssignmentSubmission', { data, val, name, item })}> {item.Title}  </Text>
                        </View>
                        <CheckBox
                            tintColors={{ true: '#076F65', false: '#076F65' }}
                            value={selectedAsgs.includes(item)}
                            onValueChange={() => toggleAsgSelection(item)}
                        />
                    </View>


                </>

            } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />

            <Text style={{ color: '#076F65', alignSelf: 'center' }}>  Quiz </Text>
            <FlatList data={Quizs} renderItem={({ item }) =>

                <>

                    <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                            <Ions name="ios-document-outline" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => navigation.navigate('QuizSubmission', { data, val, name, item })}> {item.QuizTitle}  </Text>
                        </View>
                        <CheckBox
                            tintColors={{ true: '#076F65', false: '#076F65' }}
                            value={selectedQuizzes.includes(item)}
                            onValueChange={() => toggleQuizSelection(item)}
                        />
                    </View>
                </>

            } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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
        width: 355,
        marginTop: 8,
        height: 50,
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
        marginTop: -45,
        position: 'absolute',
        marginLeft: 318,

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
export default QuizAsg;