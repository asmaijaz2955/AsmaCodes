import DocumentPicker from 'react-native-document-picker';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, Modal, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { PermissionsAndroid } from 'react-native'

import IP from '../ip';
const Student = ({ navigation }) => {
    const [search, onChangeText] = React.useState('Search');
    const [list, setList] = React.useState([]);
    //   class FlatListItem {
    //     constructor(Id, Name) {
    //       this.Id = Id;
    //       this.Name = Name;

    //     }
    //   }
    const [info, setInfo] = React.useState();
    const [SemesterNo, setSemsesterNo] = useState();

    const [Program, setProgram] = useState();

    async function sendExcelFileToApi() {
        console.log('innn');

        if (Platform.OS === 'android') {
            // Calling the permission function
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Example App Camera Permission',
                    message: 'Example App needs access to your camera',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Permission Granted
                proceed();
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            proceed();
        }


    }
    async function proceed() {
        try {
            // Allow the user to select an Excel file
            const excelFile = await DocumentPicker.pick({
                type: [DocumentPicker.types.xlsx],
            });

            console.log(excelFile);

            console.log(`http://${IP}/biit_lms_api/api/Admin/ImportStudents`);
            // Create a FormData object to send the file to the API
            const formData = new FormData()
            formData.append('file', {
                uri: excelFile[0].uri,
                type: excelFile[0].type,
                name: excelFile[0].name,
            });

            let url = `http://${IP}/biit_lms_api/api/Admin/ImportStudents`;
            // Send the request to the API endpoint
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',

                },

                body: formData,
            });

            // Handle the API response as required
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    const [refreshing, setRefreshing] = useState(false);
    const [changeCount, setChangeCount] = useState(0);
    const onRefresh = () => {
        setRefreshing(true);
        getStudentData();
        setRefreshing(false);
    };

    useEffect(() => {
        if (changeCount == 2 || changeCount == 1) {
            getStudentData();
        }
        if (changeCount == 3) {
            getStudentData();
            setChangeCount(0);
        }
    }, [changeCount])
    const getStudentData = async () => {
        setInfo('Spring-2023');
        console.log(info);
        console.log(SemesterNo);
        console.log(Program);
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/viewAllEnrollments?semesterNo=${SemesterNo}&program=${Program}&session=${info}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            const sortedData = [...data];
            sortedData.sort((a, b) => a.regNo.localeCompare(b.regNo)); // Sort by TeacherId

            setList(sortedData);
            console.log(data);


        } catch (error) {
            console.log(error);
        }
    };
    const [Session, setSession] = React.useState('Session');
    const [program, setprogram] = React.useState('Program');
    const [Semester, setSemester] = React.useState('Semester');
    const NewEnroll = async () => {
        console.log(Session);
        console.log(program);
        console.log(Semester);


        var raw = JSON.stringify({
            "SessionName": Session,
            "Program": program,
            "Semester": Semester

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
            let url = `http://${IP}/biit_lms_api/api/Admin/newEnrollment`
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

    const NUMBER_DATA = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
        { label: 'Five', value: 5 },
        { label: 'Six', value: 6 },
        { label: 'Seven', value: 7 },
        { label: 'Eight', value: 8 },

    ];
    function handleProgramChange(value, setSelectedValue) {
        setProgram(value);
        setChangeCount(changeCount + 1);
    }
    function handleSemsesterNoChange(value, setSelectedValue) {
        setSemsesterNo(value);
        setChangeCount(changeCount + 1);
    }
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#076F65', left: 100 }} onPress={() => setModalVisible(true)}>
                New Enrollment +
            </Text>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} keyboardVerticalOffset={100}>
                <View style={styles.container1}>

                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setSession} value={Session} />

                    </View>
                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setprogram} value={program} />

                    </View>
                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setSemester} value={Semester} />

                    </View>


                    <TouchableOpacity onPress={NewEnroll}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                </View>
            </Modal>
            {/* <Evil name="search" size={30} color='#076F65' style={styles.icon} /> */}

            <View style={{ flexDirection: 'row' }}>

                <Fonta name="file-excel-o" size={40} color='#076F65' style={styles.icona} onPress={sendExcelFileToApi} />

            </View>
            <Picker
                style={styles.inputvii} selectedValue={SemesterNo}
                onValueChange={(value) => handleSemsesterNoChange(value, SemesterNo)}>
                {NUMBER_DATA.map((item) => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
            <Picker style={styles.inputvix} selectedValue={Program} onValueChange={(value) => handleProgramChange(value, Program)}>
                <Picker.Item label="BSCS" value="BCS" />
                <Picker.Item label="BSIT" value="BIT" />
                <Picker.Item label="MCS" value="MCS" />
                <Picker.Item label="BSSE" value="BSE" />
                <Picker.Item label="BAI" value="BAI" />
            </Picker>
            {/* <FlatList data={list} renderItem={({ item }) =>

                <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

                        <Font name="chalkboard-teacher" size={30} color='#076F65' style={styles.icon1} />
                        <Text style={{ alignItems: 'flex-start', color: '#076F65' }} >{item.Regno} {item.Name}

                        </Text>

                    </View>
             

                </View>
            } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} /> */}
            <FlatList data={list} renderItem={({ item }) => {
                // console.log('Item', item.allocations)
                return (
                    <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>
                            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }}> {item.stdName}</Text>

                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Picker style={styles.picker} mode="dropdown">
                                    {
                                        item.allCourses.map((allCourses, index) => {
                                            console.log('allocation', allCourses)
                                            return (

                                                <Picker.Item key={index} label={` ${allCourses.CourseName}`} value={allCourses.CourseName} style={styles.pickerItem} />
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

            {/* <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ant name="edit" size={30} color='#076F65' onPress={() => navigation.navigate('EditCourse', { flatListItem: item })} />
              <Ant name="delete" size={30} color='#076F65' onPress={() => CourseDelete(item.CourseCode)}  />
            </View> */}

        </View>




    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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
    picker: {
        width: 150,
        height: 40,
        borderRadius: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF'
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
        alignSelf: 'center',
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

    inputv: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        width: 270,
        marginTop: 10,
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: "#FFFFFF",
        borderColor: '#076F65',
        marginLeft: 7,

    },
    inputvii: {
        width: 130,
        marginTop: 10,
        height: 40,
        left: 10,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#076F65',


    },
    inputvix: {
        width: 130,
        marginTop: -60,
        height: 40,
        left: 210,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#076F65',


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
        marginRight: 20,
        fontWeight: 'bold',
        backgroundColor: '#B3DED6',
        borderColor: '#B3DED6',
        alignSelf: 'center'
    },

    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 230
    },
    icone: {
        // marginLeft:170,
        // position: 'absolute',
        left: 30

    },
    icona: {
        // marginLeft:170,
        marginTop: 25,

        position: 'absolute',
        marginLeft: 160
    },
    iconp: {
        // marginLeft:170,
        marginTop: -47,
        position: 'absolute',
        marginLeft: 320
    },
    text: {
        alignSelf: 'center',
        top: 8,
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 21,
        marginLeft: 50,

    },


});
export default Student;