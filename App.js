import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import DashboardAdmin from './screens/DashboardAdmin';
import Course from './screens/Course';
import Session from './screens/Session';
import Teacher from './screens/Teacher';
import OfferedCourse from './screens/OfferedCourse';
import Allocation from './screens/Allocation';
import ViewAllocation from './screens/ViewAllocation';
import Student from './screens/Student';
import StdA from './screens/StdA';
import StdB from './screens/StdB';
import StdC from './screens/StdC';
import TeachA from './screens/TeachA';
import TeachB from './screens/TeachB';
import DataCellCourse from './screens/DataCellCourse';
import SessionCourseDataCell from './screens/SessionCourseDataCell';
import DatacellDashBoard from './screens/DatacellDashBoard'
import SessionDetails from './screens/SessionDetails';
import PDFScreen from './screens/PDFScreen'
import AttendanceSheet from './screens/AttendanceSheet ';
import AttendanceShow from './screens/ShowAttendance';
import GraderList from './screens/GraderList';
import AssignToTeacher from './screens/AssignToTeacher';
import PDFQuiz from './screens/PDFQuiz';
import PDFAsg from './screens/PDFAsg';
import ShowStudentAttendance from './screens/ShowStudentAttendance';
import QuizAsg from './screens/QuizAsg';
import AssignmentSubmission from './screens/AssignmentSubmission';
import QuizSubmission from './screens/QuizSubmission';
import ManageGrader from './screens/ManageGrader';
import QuizReport from './screens/QuizReport';
import AsgReport from './screens/AsgReport';
import GraderDashBoard from './screens/GraderDashBoard';
import StudentAsgReport from './screens/StudentAsgReport';
import GraderChecking from './screens/GraderChecking';
import GraderQuizCheck from './screens/GraderQuizCheck';
import GraderAsgCheck from './screens/GraderAsgCheck';
import Final from './screens/Final';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        headerStyle: {
          backgroundColor: '#076F65', // added # symbol
        },
        headerTintColor: '#FFFFFF', // added # symbol
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }} >

        <Stack.Screen name="PDFScreen" component={PDFScreen} />
        <Stack.Screen name="ShowStudentAttendance" component={ShowStudentAttendance} />
        <Stack.Screen name="PDFQuiz" component={PDFQuiz} />
        <Stack.Screen name="PDFAsg" component={PDFAsg} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} />
        <Stack.Screen name="Course" component={Course} />
        <Stack.Screen name="Session" component={Session} />
        <Stack.Screen name="DatacellDashBoard" component={DatacellDashBoard} />
        <Stack.Screen name="DataCellCourse" component={DataCellCourse} />
        <Stack.Screen name="SessionCourseDataCell" component={SessionCourseDataCell} />
        <Stack.Screen name="Teacher" component={Teacher} />
        <Stack.Screen name="OfferedCourse" component={OfferedCourse} />
        <Stack.Screen name="Allocation" component={Allocation} />
        <Stack.Screen name="ViewAllocation" component={ViewAllocation} />
        <Stack.Screen name="Student" component={Student} />
        <Stack.Screen name="StdA" component={StdA} />
        <Stack.Screen name="StdB" component={StdB} />
        <Stack.Screen name="StdC" component={StdC} />
        <Stack.Screen name="TeachA" component={TeachA} />
        <Stack.Screen name="TeachB" component={TeachB} />
        <Stack.Screen name="AttendanceSheet" component={AttendanceSheet} />
        <Stack.Screen name="AttendanceShow" component={AttendanceShow} />
        <Stack.Screen name="SessionDetails" component={SessionDetails} />
        <Stack.Screen name="GraderList" component={GraderList} />
        <Stack.Screen name="AssignToTeacher" component={AssignToTeacher} />
        <Stack.Screen name="ManageGrader" component={ManageGrader} />
        <Stack.Screen name="QuizAsg" component={QuizAsg} />
        <Stack.Screen name="QuizSubmission" component={QuizSubmission} />
        <Stack.Screen name="AssignmentSubmission" component={AssignmentSubmission} />
        <Stack.Screen name="QuizReport" component={QuizReport} />
        <Stack.Screen name="AsgReport" component={AsgReport} />
        <Stack.Screen name="GraderDashBoard" component={GraderDashBoard} />
        <Stack.Screen name="StudentAsgReport" component={StudentAsgReport} />
        <Stack.Screen name="GraderChecking" component={GraderChecking} />
        <Stack.Screen name="GraderAsgCheck" component={GraderAsgCheck} />
        <Stack.Screen name="GraderQuizCheck" component={GraderQuizCheck} />
        <Stack.Screen name="Final" component={Final} />
        {/* <Stack.Screen name="AddSessionCourse" component={AddSessionCourse} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
