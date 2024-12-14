
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';



import IP from '../ip';
const TeachA = ({ navigation, route }) => {
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
    // const [list, setLisct] = React.useState([]);
    const { data } = route.params;
    const [info, setInfo] = React.useState(data.Id);
    const [courses, setCourses] = React.useState('Spring-2023');
    const [teacherData, setTeacherData] = React.useState([]);
    // const [regno, setRegno] = React.useState();
    // const [prog, setProgram] = React.useState();
    // const [ses, setSemester] = React.useState();


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

    const [selectedValue, setSelectedValue] = useState(null);


    const [name, setName] = React.useState();


    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={{ color: "#076F65" }}> {data.Name}             </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>
            <View style={{ marginBottom: 15, marginTop: 10, marginLeft: -70 }} >
                <Fonta name="graduation-cap" size={45} color='#076F65' style={styles.iconx} />
                <Text style={{ color: '#076F65', marginLeft: 209, marginTop: 7 }} onPress={() => navigation.navigate('ManageGrader', { data })}>ManageGrader
                </Text>
            </View>

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






        </View >

    )
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }, dropdownContainer: {
        flex: 1,
        marginLeft: 10,
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
    iconx: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 150,
        marginTop: -5,
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
});
export default TeachA;