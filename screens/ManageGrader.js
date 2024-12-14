
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Modal, Linking, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Io from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import IP from '../ip';
const ManageGrader = ({ navigation, route }) => {
    const { data } = route.params;
    const [Quizs, setQuizs] = useState([]);
    const [Grader, setGrader] = useState([]);
    const [Asgs, setAsgs] = React.useState([]);
    const [name, setName] = React.useState();
    const [selectedValue, setSelectedValue] = useState('');

    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
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

    useEffect(() => {

        GetGrader();
        console.log(name);
    }, [name]);

    useEffect(() => {
        // if (selectedValue) {
        //     navigating(selectedValue);
        // }

        if (teacherData.length === 0) {
            GetSession();


        }
        console.log(data.TeacherId);

    }, [teacherData]);
    const [search, onChangeText] = React.useState('Search');
    const [info, setInfo] = React.useState(data.Id);
    const [courses, setCourses] = React.useState('Spring-2023');
    const [teacherData, setTeacherData] = React.useState([]);
    const GetSession = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GotMyCourses?id=${info}&session=${courses}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const dataM = await response.json();
            if (dataM != null) {

                console.log(dataM);
                setTeacherData(dataM);


                // setVal(teacherData.SemSection.Split(','));

            }

            console.log('data', teacherData);

            // setCourses(data);

        } catch (error) {
            console.log(error);
        }
    };
    const [renderCount, setRenderCount] = useState(0);
    const navigating = (val) => {
        console.log(val);
        navigation.navigate('TeachB', { data, val });
    };
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // getStudentData();
        setRefreshing(false);
    };
    const [selectedClass, setSelectedClass] = useState(null);

    const handleClassSelect = (value) => {
        if (value != null) {
            setSelectedValue(value);
            navigation.navigate('TeachB', { data, value });
        }

    };
    const AddGrader = async () => {


        console.log(selectedValue.RegNo, data.Id, selectedValue.Type, name.CourseName, name.CourseCode);
        let id = data.Id;
        let reg = selectedValue.RegNo;
        let type = selectedValue.Type;

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },


            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetGraderCourse?tid=${id}&sid=${selectedValue.RegNo}&ccode=${name.CourseCode}&type=${selectedValue.Type}&cname=${name.CourseName}`
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
    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={{ color: "#076F65" }}> {data?.Name}           </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#076F65', left: 100 }} onPress={AddGrader}>
                Assign To Course +
            </Text>
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
            <FlatList data={teacherData.allocate} renderItem={({ item }) => {
                // console.log('Item', item.allocations)
                return (
                    <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => setName(item)} >

                                {item.CourseName}</Text>

                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>

                                <Picker style={styles.picker} mode="dropdown" selectedValue={selectedValue}
                                    onValueChange={(val, itemIndex) =>
                                        navigation.navigate('TeachB', { data, val, name })
                                    } >
                                    {
                                        item.classes.map((classes, index) => {
                                            const semSections = classes.SemSection.split(',');
                                            return semSections.map((section, index) => (
                                                // console.log('classes', classes.SemSection.Split(','))


                                                <Picker.Item key={index} label={`${classes.Program}, ${section.trim()}`}
                                                    value={`${classes.Program} ${section.trim()}`} style={styles.pickerItem} />
                                            ));
                                        })
                                    }
                                </Picker>
                                <View style={styles.pickerArrow} />

                            </View>
                        </View>
                    </View>
                );
            }} />

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
export default ManageGrader;