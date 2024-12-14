import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import IP from '../ip';
import { completeHandlerIOS } from 'react-native-fs';
const SesmeterCourse = ({ navigation }) => {

  const [list, setList] = React.useState([]);
  const [lst, setLst] = React.useState([]);
  const [info, setInfo] = React.useState();
  const [onoff, setOnOff] = React.useState(0);

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

    console.log(info.Name);
    console.log(selectedV);
    console.log(selectedValue);
    console.log(lst);
    //    const datestr=info.start_date;
    // const datearr=datestr.Split('-');
    // const year=datearr[0];
    // console.log(year);
    var raw = JSON.stringify({
      "SessionName": info.Name,
      "semestersCourses": [
        {
          "Semester": selectedV,
          "Program": selectedValue,
          "CourseCode":
            lst

        }
      ]
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
      let url = `http://${IP}/biit_lms_api/api/Admin/addSemesterCourses`
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
  handleSelectItem = (cc) => {
    setLst([...lst, cc]);
    console.log(lst);
    if (lst.length > 6) {
      setLst([]);
    }
  }

  const [selectedValue, setSelectedValue] = useState('BCS');
  const [selectedV, setSelectedV] = useState(1);
  return (
    <View style={styles.container}>
      {/* <Text style={{fontSize:14,fontWeight:'bold'}}>Session Details :{info.Name} {year}</Text> */}
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 18 }}>Program</Text>
        <Picker style={styles.inputv} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="BSCS" value="BCS" />
          <Picker.Item label="BSIT" value="BIT" />
          <Picker.Item label="MCS" value="MCS" />
          <Picker.Item label="BSSE" value="BSSE" />
          <Picker.Item label="BAI" value="BAI" />
        </Picker></View>

      <Text style={{ marginLeft: 230, fontWeight: 'bold', fontSize: 18, marginTop: -75 }}>Sesmeter</Text>

      <Picker
        style={styles.inputvii} selectedValue={selectedV}
        onValueChange={(itemValue, itemIndex) => setSelectedV(itemValue)}
      >
        {NUMBER_DATA.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>

      {/* 

      <FlatList data={list} renderItem={({ item }) => (
        <Text style={styles.inputvi} onPress={() => handleSelectItem(item.CourseCode)}>{item.CourseCode}  {item.Name} {item.ShortName} {item.CreditHours}
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ant name="delete" size={30} color='#076F65' onPress={() => deleteCode(item.CourseCode)} />
          </View>
        </Text>



      )}
      /> */}
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

      <TouchableOpacity style={styles.button} onPress={AddOfferCourse}><Text style={styles.text}>Start</Text></TouchableOpacity>

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
export default SesmeterCourse;