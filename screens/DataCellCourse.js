import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, Modal, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';

import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import IP from '../ip';
const DataCellCourse = ({ navigation }) => {
    const [search, onChangeText] = React.useState('Search');

    const [list, setList] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(false);



    const getCourseData = async () => {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/getCourses`
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
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getCourseData();
        setRefreshing(false);
    };




    const navigatingc = () => {
        navigation.navigate('Course')
    };
    // const navigating = () => {
    //   navigation.navigate('EditCourse')
    // };
    // const navigatinge = () => {
    //   navigation.navigate('AddCourse')
    // };
    useEffect(() => {
        getCourseData();

    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <TextInput style={styles.input} onChangeText={onChangeText} value={search} />
                <Evil name="search" size={30} color='#076F65' style={styles.icon} />
            </View>


            <FlatList data={list} renderItem={({ item, index }) =>


                <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

                        <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
                        <Text style={{ alignItems: 'flex-start', color: '#076F65' }} >  {item.Name}

                        </Text>
                    </View>


                </View>


            } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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

    input: {
        marginTop: 10,
        color: '#076F65',
        fontWeight: 'bold', alignItems: 'center'
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
        top: 8,
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 21,
        marginLeft: 50,

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
        fontWeight: 'bold'
    },
    textfor: {
        marginTop: 5,
        marginLeft: 200
    }

});
export default DataCellCourse;