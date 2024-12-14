
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
const StdA = ({ navigation, route }) => {
    const [search, onChangeText] = React.useState('Search');
    const [list, setList] = React.useState([]);
    const { data } = route.params;
    //   class FlatListItem {
    //     constructor(Id, Name) {
    //       this.Id = Id;
    //       this.Name = Name;

    //     }
    //   }
    const [info, setInfo] = React.useState();
    const [regno, setRegno] = React.useState();
    const [prog, setProgram] = React.useState();
    const [ses, setSemester] = React.useState();
    const GetSession = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/currentSession`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setInfo(data.Name);


        } catch (error) {
            console.log(error);
        }
    };
    // const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        if (list.length === 0) {
            console.log(data);
            //     // Run your code here
            GetSession();
            console.log(info);
            setRegno(data.RegNo);
            setProgram(data.Program);
            setSemester(data.Semester);
            getCourseForm();
            console.log(regno);
            console.log(ses);
            console.log(prog);

        }

    });
    const getCourseForm = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Student/EnrollmentForm?stdId=${regno}&semester=${ses}&session=${info}&program=${prog}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            setList(data);


            // console.log(data);


        } catch (error) {
            console.log(error);
        }
    };
    const [selectedItems, setSelectedItems] = useState([]);
    const navigating = () => {
        console.log(data)
        console.log(list)
        navigation.navigate('StdB', { data, list });
    };
    const handleCheckStudentToggle = (item) => {
        const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item);

        if (selectedIndex >= 0) {
            // the item was already selected, so remove it from the list
            setSelectedItems((prevSelectedItems) =>
                prevSelectedItems.filter((selectedItem) => selectedItem !== item)
            );
        } else {
            // add the new item to the list of selected items
            setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={{ color: '#076F65' }}> {data.Name}             </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} onPress={getCourseForm} />
            </View>
            {/* <View style={{ flexDirection: 'row' }}>

                <Fonta name="file-excel-o" size={40} color='#076F65' style={styles.icona} onPress={sendExcelFileToApi} />

            </View> */}

            <FlatList
                data={list}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.inputvi,
                            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Font name="chalkboard-teacher" size={30} color="#076F65" style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: "#076F65" }}>
                                {item.CourseCode} {item.Name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', color: "#076F65" }}>
                            <CheckBox
                                value={selectedItems.includes(item)}
                                onValueChange={() => handleCheckStudentToggle(item)}
                                tintColors={{ true: '#076F65', false: '#076F65' }}
                            />
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={navigating}><Text style={styles.text}>Submit</Text></TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("ViewAllocation")}>
                <Ions name="arrow-redo" size={40} color='#076F65' style={styles.iconp} />
            </TouchableOpacity> */}

        </View>




    );
};
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
    button: {
        marginTop: -70,
        backgroundColor: '#076F65',
        marginBottom: 200,
        marginLeft: 180,
        borderRadius: 32,
        width: 170,
        height: 50,
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
    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 305
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
        marginTop: -47,
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


});
export default StdA;