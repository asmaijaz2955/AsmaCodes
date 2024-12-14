import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import IP from '../ip';
const Teacher = ({ navigation }) => {
  const [search, onChangeText] = React.useState('Search');
  const [list, setList] = React.useState([]);
  class FlatListItem {
    constructor(Id, Name) {
      this.Id = Id;
      this.Name = Name;

    }
  }

  async function ExcelFileToApi() {

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

      });

      console.log(excelFile)

      //let uri = excelFile.uri.split(':')[1]
      console.log(`http://${IP}/biit_lms_api/api/Admin/ImportAllocations`)
      // Create a FormData object to send the file to the API
      //'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const formData = new FormData();
      formData.append('file', {
        uri: excelFile[0].uri,
        type: excelFile[0].type,
        name: excelFile[0].name,
      });

      let url = `http://${IP}/biit_lms_api/api/Admin/ImportAllocations`
      // Send the request to the API endpoint
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      });

      // Handle the API response as required
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTeacherData();

  }, [list])
  const getTeacherData = async () => {

    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      };
      let url = `http://${IP}/biit_lms_api/api/Admin/getTeacher`
      const response = await fetch(
        url,
        requestOptions,
      );
      const data = await response.json();
      // const sortedData = [...data];
      // sortedData.sort((a, b) => a.TeacherId.localeCompare(b.TeacherId)); // Sort by TeacherId

      setList(data);
      // console.log(data);


    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.inputv}>
        <TextInput style={styles.input} onChangeText={onChangeText} value={search} />
        <Evil name="search" size={30} color='#076F65' style={styles.icon} />
      </View>
      <View style={{ flexDirection: 'row' }}>

        <Fonta name="file-excel-o" size={40} color='#076F65' style={styles.icona} onPress={ExcelFileToApi} />

      </View>

      <FlatList data={list} renderItem={({ item }) =>

        <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

            <Font name="chalkboard-teacher" size={30} color='#076F65' style={styles.icon1} />
            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => navigation.navigate('Allocation', { flatListItem: item })} >{item.Name}  {item.Email}

            </Text>

          </View>
          {/* <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ant name="edit" size={30} color='#076F65' onPress={() => navigation.navigate('EditCourse', { flatListItem: item })} />
              <Ant name="delete" size={30} color='#076F65' onPress={() => CourseDelete(item.CourseCode)}  />
            </View> */}

        </View>
      } />
      <TouchableOpacity onPress={() => navigation.navigate("ViewAllocation")}>
        <Ions name="arrow-redo" size={40} color='#076F65' style={styles.iconp} />
      </TouchableOpacity>

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
    backgroundColor: '#FFFFFF',
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


});
export default Teacher;