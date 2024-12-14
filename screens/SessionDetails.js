import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, Modal, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import IP from '../ip';
import { completeHandlerIOS } from 'react-native-fs';
const SessionDetails = ({ navigation }) => {

    const [list, setList] = React.useState([]);
    const [lst, setLst] = React.useState([]);
    const [info, setInfo] = React.useState();
    const [onoff, setOnOff] = React.useState(0);

    const [Session, setSession] = React.useState('Session');
    const [Code, setCode] = React.useState('Course Code');
    const [Cname, setCname] = React.useState(' Course Name');
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
            setInfo(data);


        } catch (error) {
            console.log(error);
        }
    };
    const [modalVisible, setModalVisible] = React.useState(false);
    async function deleteCode(code) {

        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/deleteSessionCourses?session=${info.Name}&courseId=${code}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
        // navigating();
    };
    const SessionCourse = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },


            };
            let url = `http://${IP}/biit_lms_api/api/Admin/getSessionCourses?session=${info.Name}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setList(data);
        } catch (error) {
            console.log(error);
        }

    };
    const AddOfferCourse = async () => {

        //    const datestr=info.start_date;
        // const datearr=datestr.Split('-');
        // const year=datearr[0];
        // console.log(year);
        var raw = JSON.stringify({
            "session": Session,
            "ccode": Code,
            "cname": Cname
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
            let url = `http://${IP}/biit_lms_api/api/Admin/SessionCourseAdd`
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
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        if (renderCount < 2) {
            // Run your code here
            GetSession();
            SessionCourse();
            setRenderCount(renderCount + 1);
        }



    }, [info]);

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



    return (
        <View style={styles.container}>
            <TouchableOpacity style={{}} onPress={() => setModalVisible(true)}><Text style={{ color: '#076F65', marginLeft: 300, fontWeight: 'bold' }}>Add +</Text></TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                keyboardVerticalOffset={100}>
                <View style={styles.container1}>

                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setSession} value={Session} />

                    </View>
                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setCode} value={Code} />

                    </View>
                    <View style={styles.inputview}>
                        <TextInput style={styles.input} onChangeText={setCname} value={Cname} />

                    </View>

                    <TouchableOpacity onPress={AddOfferCourse}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                </View>
            </Modal>

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
                            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => handleSelectItem(item.CourseCode)}>
                                {item.CourseCode} {item.Name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ant name="delete" size={30} color='#076F65' onPress={() => deleteCode(item.CourseCode)} />
                        </View>
                    </View>
                )}
            />



        </View>



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
    inputvii: {
        width: 150,
        marginTop: 7,
        height: 40,
        left: 200,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#076F65',


    },
    input: {
        marginTop: 10,
        color: '#076F65',
        fontWeight: 'bold', alignItems: 'center'
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
        borderWidth: 1,
        borderColor: '#076F65',
        justifyContent: 'space-between'


    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute', // set position to fixed
        // top: 0, // set top position to 0
        // left: 0, // set left position to 0
        // right: 0, // set right position to 0
        // bottom: 0, // set bottom position to 0
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

    textstyle: {
        color: '#076F65',
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
        fontWeight: 'bold',
        color: "#FFFFFF"
    },



});
export default SessionDetails;