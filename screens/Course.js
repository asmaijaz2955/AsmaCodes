import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, Modal, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';

import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import IP from '../ip';
const Course = ({ navigation }) => {
  const [search, onChangeText] = React.useState('Search');

  const [list, setList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalOpenIndex, setModalOpenIndex] = useState(-1);
  async function sendExcelFileToApi() {

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
      console.log(`http://${IP}/biit_lms_api/api/Admin/LoadCourses`)
      // Create a FormData object to send the file to the API
      //'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const formData = new FormData();
      formData.append('file', {
        uri: excelFile[0].uri,
        type: excelFile[0].type,
        name: excelFile[0].name,
      });

      let url = `http://${IP}/biit_lms_api/api/Admin/LoadCourses`
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
  // class FlatListItem {
  //   constructor(CourseCode, Name, CreditHours, ShortName, PreReq) {
  //     this.CourseCode = CourseCode;
  //     this.Name = Name;
  //     this.CreditHours = CreditHours;
  //     this.ShortName = ShortName;
  //     this.PreReq = PreReq;
  //   }
  // }
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
  const [Ccode, setCcode] = React.useState('Course Code');
  const [name, setName] = React.useState('Name');
  const [CrHours, setCreditHours] = React.useState('Credit Hours');
  const [Shrtname, setShrtname] = React.useState('Short Name');
  const [Req, setReq] = React.useState('Pre Req');
  const [code, setcode] = React.useState();
  const [Name, setname] = React.useState();
  const [CrHrs, setCreditHrs] = React.useState();
  const [Shrt, setShrt] = React.useState();
  const [PReq, setPReq] = React.useState();
  const onRefresh = () => {
    setRefreshing(true);
    getCourseData();
    setRefreshing(false);
  };
  const CourseAdd = async () => {
    console.log(Ccode);
    console.log(name);
    console.log(CrHours);
    console.log(Req);
    const add = { CourseCode: Ccode, Name: name, CreditHours: CrHours, PreReq: Req }
    console.log(add.CourseCode, add.Name, add.CreditHours, add.PreReq)
    var raw = JSON.stringify([{
      "CourseCode": Ccode,
      "Name": name,
      "ShortName": Shrtname,
      "CreditHours": CrHours,

      "PreReq": Req

    }]);

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: raw

      };
      let url = `http://${IP}/biit_lms_api/api/Admin/addCourses`
      const response = await fetch(
        url,
        requestOptions,
      );
      const data = await response.json();
      console.log(data);
      navigating();
    } catch (error) {
      console.log(error);
    }

  };
  async function CourseDelete(code) {



    try {
      const response = await fetch(`http://${IP}/biit_lms_api/api/Admin/deleteCourse?cCode=${code}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error(error);
    }
    // navigatingc();
  };
  const CourseUpdate = async () => {
    // console.log(Ccode);
    // console.log(name);
    // console.log(CrHours);
    // console.log(Req);
    // const add = { CourseCode: Ccode, Name: name, CreditHours: CrHours, PreReq: Req }
    // console.log(add.CourseCode, add.Name, add.CreditHours, add.PreReq)
    var raw = JSON.stringify({
      "CourseCode": Ccode,
      "Name": name,
      "ShortName": Shrtname,
      "CreditHours": CrHours,

      "PreReq": Req
    });

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: raw

      };
      let url = `http://${IP}/biit_lms_api/api/Admin/updateCourse`
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
      <View style={{ flexDirection: 'row' }}>

        <Font name="file-excel-o" size={40} color='#076F65' style={styles.icona} onPress={sendExcelFileToApi} />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ant name="plussquareo" size={40} color='#076F65' style={styles.iconp} />
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} keyboardVerticalOffset={100}>
          <View style={styles.container1}>

            <View style={styles.inputview}>
              <TextInput style={styles.input} onChangeText={setCcode} value={Ccode} />

            </View>
            <View style={styles.inputview}>
              <TextInput style={styles.input} onChangeText={setName} value={name} />

            </View>
            <View style={styles.inputview}>
              <TextInput style={styles.input} onChangeText={setShrtname} value={Shrtname} />

            </View>
            <View style={styles.inputview}>
              <TextInput style={styles.input} onChangeText={setCreditHours} value={CrHours} />

            </View>

            <View style={styles.inputview}>
              <TextInput style={styles.input} onChangeText={setReq} value={Req} />

            </View>
            <TouchableOpacity onPress={CourseAdd}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

          </View>
        </Modal>
      </View>

      <FlatList data={list} renderItem={({ item, index }) =>


        <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
            <Text style={{ alignItems: 'flex-start', color: '#076F65' }} >  {item.Name}

            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ant name="edit" size={30} color='#076F65' onPress={() => setModalOpenIndex(index)} />


            <Ant name="delete" size={30} color='#076F65' onPress={() => CourseDelete(item.CourseCode)} />


          </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={modalOpenIndex === index} // only show the modal if modalOpenIndex matches the current item's index
            onRequestClose={() => setModalOpenIndex(-1)} keyboardVerticalOffset={100}>
            <View style={styles.container1}>

              <View style={styles.inputview}>
                <TextInput style={styles.input} defaultValue={item.CourseCode} onChangeText={setcode} value={code} />

              </View>
              <View style={styles.inputview}>
                <TextInput style={styles.input} defaultValue={item.Name} onChangeText={setname} value={Name} />

              </View>
              <View style={styles.inputview}>
                <TextInput style={styles.input} defaultValue={item.ShortName} onChangeText={setShrt} value={Shrt} />

              </View>
              <View style={styles.inputview}>
                <TextInput style={styles.input} defaultValue={item.CreditHours.toString()} onChangeText={setCreditHrs} value={CrHrs} />

              </View>

              <View style={styles.inputview}>
                <TextInput style={styles.input} defaultValue={item.PreReq} onChangeText={setPReq} value={PReq} />

              </View>
              <TouchableOpacity onPress={CourseUpdate}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Update</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalOpenIndex(-1)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginRight: 10, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

            </View>
          </Modal>

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
export default Course;