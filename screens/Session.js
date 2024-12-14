import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
const Session = ({ navigation }) => {

  const [list, setList] = React.useState([]);
  const [lst, setLst] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  handleSelectItem = (cc) => {
    setLst([...lst, cc]);
    console.log(lst);
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const AddSession = async () => {
    console.log(selectedValue);
    var raw = JSON.stringify({
      "name": selectedValue,
      "start_date": selectedDate,
      // "end_date": selectedDateEnd,
      "mid_week": midwk,
      "final_week": finalwk,
      "current_status": checked,
      "total_week": weekno,
      "courses": lst
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
      let url = `http://${IP}/biit_lms_api/api/Admin/addSessionCourses`
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
  const [checked, setChecked] = useState(false);

  const handleCheckBoxToggle = () => {
    setChecked(!checked);
  };
  const handleConfirm = (date) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    hideDatePicker();
  };
  const handleConfirma = (date) => {
    setSelectedDateEnd(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    hideDatePicker();
  };

  const getCourse = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(selectedDate);
    // console.log(selectedDateEnd);
    getCourse();
    //  console.log(selectedItem);
  }, [])
  const [selectedValue, setSelectedValue] = useState('');
  const [weekno, setWeekNo] = React.useState();
  const [midwk, setMidwk] = React.useState();
  const [finalwk, setFinalwk] = React.useState();
  return (
    <View style={styles.container}>
      <Picker style={styles.inputv} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Fall" value="Fall-2023" />
        <Picker.Item label="Spring" value="Spring-2023" />
        <Picker.Item label="Summer" value="Summer-2023" />
      </Picker>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Icon name="calendar" size={30} color='#076F65' />
        <Text style={{ color: '#076F65', marginLeft: -13 }}>{'Start Date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.inputx}>
        <CheckBox
          value={checked}
          onValueChange={handleCheckBoxToggle}
          tintColors={{ true: '#076F65', false: '#076F65' }}
        />
        <Text style={{ color: '#076F65' }}>Status</Text>
      </View>

      <TouchableOpacity onPress={AddSession}>
        <Ant name="plussquareo" size={40} color='#076F65' style={styles.iconp} />
      </TouchableOpacity>
      <View>
        <TextInput style={styles.inputview} onChangeText={setWeekNo} value={weekno} />
        <Text style={{ marginTop: -30, marginLeft: 5, fontWeight: 'bold', color: '#076F65' }}> Week No</Text>
        <TextInput style={styles.inputview} onChangeText={setMidwk} value={midwk} />
        <Text style={{ marginTop: -30, marginLeft: 5, fontWeight: 'bold', color: '#076F65' }}> Mid Week</Text>
        <TextInput style={styles.inputview} onChangeText={setFinalwk} value={finalwk} />
        <Text style={{ marginTop: -30, marginLeft: 5, fontWeight: 'bold', color: '#076F65' }}> Final Week</Text>
      </View>

      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View style={styles.inputvi}>
            <TouchableOpacity onPress={() => handleSelectItem(item.CourseCode)}>
              <Text style={{ color: '#076F65' }} >{item.CourseCode}  {item.Name}  {item.CreditHours}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SessionDetails")}>
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

  inputv: {
    width: 120,
    marginTop: 10,
    height: 40,
    left: -10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#076F65',
    color: '#FFFFFF"'


  },
  inputvi: {
    flexDirection: 'row',
    width: 350,
    marginTop: 14,
    marginLeft: 2,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: '#076F65',
    justifyContent: 'space-between'

  },
  input: {
    width: 100,
    marginTop: -50,
    height: 40,
    left: 170,
    fontSize: 14,
    fontWeight: 'bold',

  },
  inputview: {

    flexDirection: 'row',
    borderWidth: 1,
    width: 200,
    marginTop: 12,
    height: 50,
    marginLeft: 90,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: '#076F65',
    color: '#076F65',
    // alignSelf:'center'
  },
  inpute: {
    width: 100,
    marginTop: -40,
    height: 40,
    left: 200,
    fontSize: 14,
    fontWeight: 'bold',

  },
  inputx: {
    width: 100,
    marginTop: -40,
    height: 40,
    left: 270,
    fontSize: 14,
    fontWeight: 'bold',


  },
  iconp: {
    // marginLeft:170,
    marginTop: -43,
    position: 'absolute',
    marginLeft: 320
  },
});
export default Session;