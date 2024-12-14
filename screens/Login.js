import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import IP from '../ip';
import CheckBox from '@react-native-community/checkbox';
import RNFS from 'react-native-fs';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';
import { request, PERMISSIONS } from 'react-native-permissions';
const Login = ({ navigation }) => {
  const [user, onChangeText] = React.useState('');
  const [pass, onChange] = React.useState('');
  const navigating = () => {
    navigation.navigate('DashboardAdmin')
  };

  const [userStudent, setUserStudent] = useState({});
  const [pdfPath, setPdfPath] = useState('')

  async function loginAdmin() {
    console.log(user);
    console.log(pass);
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

      };
      let url = `http://${IP}/biit_lms_api/api/Admin/Login?username=${user}&password=${pass}`
      const response = await fetch(
        url,
        requestOptions,
      );
      const data = await response.json();
      console.log(data);
      if (data == "Admin") {
        navigation.navigate('DashboardAdmin');
      }

      else if (data.Student == "Student") {
        navigation.navigate('StdA', { data });
        // Navigate to student dashboard
      } else if (data && data.Designation == "Assistant Professor") {
        navigation.navigate('TeachA', { data });
        // Navigate to teacher dashboard
      }
      else if (data && data.Designation == "Junior Lecturer") {
        navigation.navigate('JrLecturer', { data });
        // Navigate to teacher dashboard
      }
      else if (data == "DataCell") {
        navigation.navigate('DatacellDashBoard');
        // Navigate to teacher dashboard
      }
      else if (data.Grader == "Grader") {
        navigation.navigate('GraderDashBoard', { data });
      }



    } catch (error) {
      console.log(error);
    }
  };
  // class FlatListItem {
  //   constructor(regno, name, prog, ses) {
  //     this.regno = regno;
  //     this.name = name;
  //     this.prog = prog;
  //     this.ses = ses;

  //   }
  // }
  // async function loginStudent() {
  //   console.log(user);
  //   console.log(pass);
  //   try {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },

  //     };
  //     let url = `http://${IP}/biit_lms_api/api/Student/Login?reg=${user}&pass=${pass}`
  //     const response = await fetch(
  //       url,
  //       requestOptions,
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     // setUserStudent(data);
  //     // console(userStudent);
  //     // , { FlatListItem: userStudent }
  //     if (data != null) {

  //     }


  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // async function loginTeacher() {
  //   console.log(user);
  //   console.log(pass);
  //   try {
  //     const requestOptions = {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },

  //     };
  //     let url = `http://${IP}/biit_lms_api/api/Teacher/Login?id=${user}&password=${pass}`
  //     const response = await fetch(
  //       url,
  //       requestOptions,
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     if (data != null) {
  //       navigation.navigate('TeachA');
  //     }



  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const [userType, setUserType] = useState('');
  // function login() {
  //   if (Admin) {
  //     loginAdmin();
  //   } else if (Student) {
  //     loginStudent();
  //   }
  //   else if (Teacher) {
  //     loginTeacher();
  //   }
  // }

  // const [Admin, setAdmin] = useState(false);

  // const handleCheckAdminToggle = () => {
  //   setAdmin(!Admin);
  // };
  // const [Teacher, setTeacher] = useState(false);

  // const handleCheckTeacherToggle = () => {
  //   setTeacher(!Teacher);
  // };
  // const [Student, setStudent] = useState(false);

  // const handleCheckStudentToggle = () => {
  //   setStudent(!Student);
  // };


  return (
    <View style={styles.container}>


      {/* <View>
        <Button title="Student Login" onPress={() => setUserType('student')} />
        <Button title="Teacher Login" onPress={() => setUserType('teacher')} />
      </View> */}
      <Text style={styles.biitlms}>BIIT LMS</Text>
      <Image style={styles.images} source={require('../pics/login.png')} />
      <View style={styles.inputview}>
        <TextInput style={styles.input} onChangeText={onChangeText} value={user} />
        <Icon name="user" size={30} color='#076F65' style={styles.icon1} />
      </View>
      <View style={styles.inputview}>
        <TextInput style={styles.input} onChangeText={onChange} value={pass} />
        <Ant name="eye" size={30} color='#076F65' style={styles.icon1} />
      </View>
      {/* <View style={styles.inputx}>
        <CheckBox
          value={Admin}
          onValueChange={handleCheckAdminToggle}
          tintColors={{ true: '#076F65', false: '#d3d3d3' }}
        />
        <Text>Admin</Text>
      </View>
      <View style={styles.inputy}>
        <CheckBox
          value={Teacher}
          onValueChange={handleCheckTeacherToggle}
          tintColors={{ true: '#076F65', false: '#d3d3d3' }}
        />
        <Text>Teacher</Text>
      </View>
      <View style={styles.inputz}>
        <CheckBox
          value={Student}
          onValueChange={handleCheckStudentToggle}
          tintColors={{ true: '#076F65', false: '#d3d3d3' }}
        />
        <Text>Student</Text> */}
      {/* </View> */}
      <Text style={styles.textfor}>Forget Password ?</Text>
      <TouchableOpacity style={styles.button} onPress={loginAdmin}><Text style={styles.text}>Login</Text></TouchableOpacity>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  biitlms: {
    alignSelf: 'center',
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#076F65',
  },
  images: {
    alignSelf: 'center',
    width: 200,
    height: 200,
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
    backgroundColor: '#FFFFFF',
    borderColor: '#076F65',
    alignSelf: 'center'
  },
  input: {
    marginTop: 10,
    color: '#076F65'
  },
  icon1: {
    // marginLeft:170,
    position: 'absolute',
    right: 20
  },
  button: {
    marginTop: 15,
    backgroundColor: '#076F65',
    alignSelf: 'center',
    borderRadius: 32,
    width: 200,
    height: 50,
  },
  text: {
    alignSelf: 'center',
    top: 6,
    fontSize: 25,
    fontWeight: 'bold',
    color: "#FFFFFF"
  },
  inputx: {
    width: 100,
    marginTop: -0,
    height: 40,
    left: 38,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'


  },
  inputy: {
    width: 100,
    marginTop: -40,
    height: 40,
    left: 150,
    fontSize: 14,
    fontWeight: 'bold',


  },
  inputz: {
    width: 100,
    marginTop: -40,
    height: 40,
    left: 280,
    fontSize: 14,
    fontWeight: 'bold',


  },
  textfor: {
    marginTop: 5,
    marginLeft: 200,
    color: '#076F65'

  }

});
export default Login;