import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IP from '../ip';
import Ions from 'react-native-vector-icons/Ionicons';
const Allocation = ({ navigation, route }) => {
  const { flatListItem } = route.params;
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  console.log(flatListItem);
  const navigating = () => {
    navigation.navigate('Course')
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
  const [changeCount, setChangeCount] = useState(0);
  useEffect(() => {
    if (changeCount == 2 || changeCount == 1) {
      getOfferedCourse();
    }
    if (changeCount == 3) {
      getOfferedCourse();
      setChangeCount(0);
    }
  }, [changeCount])
  const TeacherAllocation = async () => {
    let name = flatListItem.Name;
    console.log(name);
    var raw = JSON.stringify({

      "TeacherId": id,
      "TeacherName": name,
      "SessionName": Session,
      "allocations": [
        {
          "CourseCode": lst,
          "Program": Program,
          "Semester": SemesterNo,
          "Section": Section,
          "CourseName": Cname
        },

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
      let url = `http://${IP}/biit_lms_api/api/Admin/allocateCourses`
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

  const [SemesterNo, setSemsesterNo] = useState();
  const [Session, setSession] = useState();
  const [Program, setProgram] = useState();
  const [Section, setSection] = useState();
  const getOfferedCourse = async () => {
    setId(flatListItem.Id);
    setName(flatListItem.Name);
    console.log(id);
    console.log(name);
    console.log(SemesterNo);
    console.log(Session);
    console.log(Program);
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      };
      let url = `http://${IP}/biit_lms_api/api/Admin/getSemesterCourses?semesterNo=${SemesterNo}&program=${Program}&session=${Session}`
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

  const [list, setList] = React.useState([]);
  const [lst, setLst] = React.useState();
  const [Cname, setCName] = React.useState();
  handleSelectItem = (cc, ac) => {
    setLst(cc);
    setCName(ac);
    console.log(lst);
    console.log(Cname);
  }


  function handleSessionChange(value, setSelectedValue) {
    setSession(value);
    setChangeCount(changeCount + 1);
  }
  function handleProgramChange(value, setSelectedValue) {
    setProgram(value);
    setChangeCount(changeCount + 1);
  }
  function handleSemsesterNoChange(value, setSelectedValue) {
    setSemsesterNo(value);
    setChangeCount(changeCount + 1);
  }
  return (
    <View style={styles.container}>
      <Picker style={styles.inputv} selectedValue={Session} onValueChange={(value) => handleSessionChange(value, Session)}>
        <Picker.Item label="Fall-2023" value="Fall-2023" />
        <Picker.Item label="Spring-2023" value="Spring-2023" />
        <Picker.Item label="Summer-2023" value="Summer-2023" />
      </Picker>
      <View style={{ flexDirection: 'column' }}>
        <Picker style={styles.input} selectedValue={Section} onValueChange={(itemValue) => setSection(itemValue)}>
          <Picker.Item label="A" value="A" />
          <Picker.Item label="B" value="B" />
          <Picker.Item label="C" value="C" />
          <Picker.Item label="D" value="D" />
          <Picker.Item label="E" value="E" />
          <Picker.Item label="F" value="F" />
          <Picker.Item label="G" value="G" />
          <Picker.Item label="H" value="H" />
        </Picker></View>

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
      <FlatList data={list} renderItem={({ item }) =>
        <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

            <Icon name="library-books" size={30} color='#076F65' style={styles.icon1} />
            <Text style={{ alignItems: 'flex-start', color: '#076F65', }} onPress={() => handleSelectItem(item.CourseCode, item.Name)}> {item.CourseCode}  {item.Name}

            </Text>
          </View>
        </View>} />
      <TouchableOpacity style={styles.button} onPress={TeacherAllocation}><Text style={styles.text}>ADD</Text></TouchableOpacity>

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
    color: "#FFFFFF",
    backgroundColor: '#076F65',


  },
  input: {
    width: 130,
    marginTop: 10,
    height: 40,
    left: -10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#076F65',



  },
  inputvii: {
    width: 130,
    marginTop: -106,
    height: 40,
    left: 210,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#076F65',


  },
  inputvix: {
    width: 130,
    marginTop: 2,
    height: 40,
    left: 210,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#076F65',


  },
  inputvi: {
    flexDirection: 'row',
    width: 360,
    marginTop: 10,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderColor: '#076F65',
    borderWidth: 1,
    color: '#076F65',
    justifyContent: 'space-between'

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
    color: '#FFFFFF',
  },
  textfor: {
    marginTop: 5,
    marginLeft: 200
  }

});
export default Allocation;