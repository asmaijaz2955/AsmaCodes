
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Modal, Linking, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icone from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Io from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
// import moment from 'moment';


const JrLecturer = ({ navigation, route }) => {
    const { data, val, name } = route.params;
    // console.log('PARAMS', name)
    const [datafile, setDatafile] = React.useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [fileQuiz, setFileQuiz] = useState(null);
    // Function to handle file selection for File1
    async function sendFile1() {

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
                selectFile1();
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            selectFile1();
        }


    }
    async function sendFile2() {

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
                selectFile2();
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            selectFile2();
        }


    }
    async function sendFile3() {

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
                selectFile3();
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            selectFile3();
        }


    }
    const selectFile1 = async () => {

        try {
            const excelFile = await DocumentPicker.pick({

            });

            console.log(excelFile)


            setFile1(excelFile);

        } catch (error) {
            console.log(error);
        }
    };

    async function sendFileQuiz() {

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
                selectFileQuiz();
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            selectFileQuiz();
        }


    }
    const selectFileQuiz = async () => {

        try {
            const excelFile = await DocumentPicker.pick({

            });

            console.log(excelFile)


            setFileQuiz(excelFile);
            console.log('fieQuiz', fileQuiz);

        } catch (error) {
            console.log(error);
        }
    };
    let fileinfo = [];
    // Function to handle file selection for File2
    const selectFile2 = async () => {

        try {
            const excelFile = await DocumentPicker.pick({

            });

            console.log(excelFile)


            setFile2(excelFile);

        } catch (error) {
            console.log(error);
        }
    };
    const selectFile3 = async () => {

        try {
            const excelFile = await DocumentPicker.pick({

            });

            console.log(excelFile)


            setFile3(excelFile);

        } catch (error) {
            console.log(error);
        }
    };
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalQuiz, setModalQuiz] = React.useState(false);
    const [modalAsg, setModalAsg] = React.useState(false);
    const [modalLinks, setModalLinks] = React.useState(false);
    const [modalFileQuiz, setModalFileQuiz] = React.useState(false);
    const [wkdata, setWkdata] = React.useState();
    const [links1, setLinks1] = React.useState(null);
    const [links2, setLinks2] = React.useState(null);
    const [links3, setLinks3] = React.useState(null);
    async function GetLecture() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, wkdata, program, semester, section);
        let cname = name.CourseCode;
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetLectureNotes?weekInfo=${wkdata}&ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");


                fileinfo = Object.entries(data).reduce((acc, [key, value]) => {
                    if (key.startsWith("File") && value !== null && value !== "") {
                        acc.push(value);
                    }
                    return acc;
                }, []);
                console.log(fileinfo);
                setDatafile(data);
                setvale(fileinfo);

            }
        } catch (error) {
            console.log(error);
        }
    };
    const AddMcqs = async () => {
        let id = data.Id;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;
        const formattedDate = formatDate(selectedDate);
        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(id, name.CourseCode, name.CourseName, wkdata, session, tmarks, title, program, semester, section, selectedDate, Desp);
        console.log(apiQuestion);

        var raw = JSON.stringify({
            "teacherId": id,
            "courseCode": name.CourseCode,
            // "end_date": selectedDateEnd,
            "courseName": name.CourseName,
            "sessionName": session,
            "semester": semester,
            "program": program,
            "section": section,
            "quizTitle": title,
            "description": Desp,
            "totalMarks": tmarks,
            "dueDate": formattedDate,
            "weekNo": wkdata,
            "questions": apiQuestion
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
            let url = `http://${IP}/biit_lms_api/api/Teacher/CreateMcqsQuiz`
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
    const [title, setTitle] = React.useState('Title');
    const [weekInfo, setWeekInfo] = React.useState('Week');
    const [tmarks, setTmarks] = React.useState('TMarks');
    const [Desp, setDesp] = React.useState('Description');
    const [vale, setvale] = React.useState([]);
    const [quizdata, setQuizData] = React.useState();
    const [asgdata, setAsgData] = React.useState();
    const [count, setCount] = React.useState(0);
    const handleUpload = async () => {
        // setLoading(true);

        // let id = data.CourseAllocation[0].TeacherId;
        let id = data.Id;
        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(id, name.CourseCode, name.CourseName, session, title, wkdata, program, semester, section);
        try {
            const formData = new FormData();
            formData.append('TeacherId', '');
            formData.append('cCode', name.CourseCode);
            formData.append('cName', name.CourseName);

            formData.append('Session', session);
            formData.append('Semester', semester);
            formData.append('Section', section);
            formData.append('Progam', program);
            formData.append('Title', title);
            formData.append('weekInfo', wkdata);
            if (file1 && file1.length > 0) {
                formData.append('File1', {
                    uri: file1[0].uri,
                    type: file1[0].type,
                    name: file1[0].name,
                });
            }

            if (file2 && file2.length > 0) {
                formData.append('File2', {
                    uri: file2[0].uri,
                    type: file2[0].type,
                    name: file2[0].name,
                });
            }

            if (file3 && file3.length > 0) {
                formData.append('File3', {
                    uri: file3[0].uri,
                    type: file3[0].type,
                    name: file3[0].name,
                });
            }
            const url = `http://${IP}/biit_lms_api/api/Teacher/uploadLessonPlans`

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            const result = await response.json();
            console.log('backend ', result);
        } catch (error) {
            console.log('error log', error);
        }

    };
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    const handleUploadQuiz = async () => {
        // setLoading(true);
        // let id = data.CourseAllocation[0].TeacherId;
        let id = data.Id;
        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        let cname = name.CourseName;
        let code = name.CourseCode;
        console.log('I AM HERE');
        // const formattedDate = moment(selectedDate).format('lll');
        const formattedDate = formatDate(selectedDate);
        console.log(id, cname, code, session, tmarks, title, wkdata, program, semester, section, title, Desp, GraderFor);
        try {


            // formdata.append("cCode", "CS497");
            // formdata.append("Title", "Quiz#1");
            // formdata.append("Description", "Quiz#1 of Week 1");
            // formdata.append("TotalMarks", "20");
            // formdata.append("DueDate", "2022-09-27, Tuesday");
            // formdata.append("Type", "File");
            const formData = new FormData();
            formData.append('TeacherId', id);
            formData.append('cCode', name.CourseCode);
            formData.append('cName', name.CourseName);
            formData.append('Session', session);
            formData.append('Semester', semester);
            formData.append('Section', section);
            formData.append('Program', program);
            formData.append('QuizTitle', title);
            formData.append('Description', Desp);
            formData.append('TotalMarks', tmarks);

            formData.append('DueDate', formattedDate.toString());
            formData.append('isFile', true);



            // if (GraderFor == null) {
            //     formdata.append('isForGrader', false);
            // } else {

            formData.append('isForGrader', GraderFor);


            // formData.append('isForGrader', GraderFor.toString());
            // }
            formData.append('WeekNo', wkdata);


            console.log('file----------------------quiz', JSON.stringify(fileQuiz))
            // formdata.append("Files", fileQuiz[0]);
            if (fileQuiz && fileQuiz.length > 0) {
                // const file = fileQuiz[0];
                formData.append('files', {
                    uri: fileQuiz[0].uri,
                    type: fileQuiz[0].type,
                    name: fileQuiz[0].name,
                });
            }
            console.log(formData);
            console.log(fileQuiz);

            try {

                const response = await fetch(`http://${IP}/biit_lms_api/api/Teacher/addQuizFile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                const json = await response.json();
                console.log('response data', json);
            } catch (error) {
                console.log('error of API', error)
            }

            // console.log('backend ', result);
        }
        catch (error) {
            console.log('error log', error);
        }

    };

    async function GetQuiz() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, wkdata, program, semester, section);
        let cname = name.CourseCode
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetQuizFile?weekInfo=${wkdata}&ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");
                setQuizData(data.QuizFile);






            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUploadAsg = async () => {
        // setLoading(true);
        // let id = data.CourseAllocation[0].TeacherId;
        let id = data.Id;
        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        setCount(4 + 1);
        let cname = name.CourseName;
        let code = name.CourseCode;
        console.log('I AM HERE');
        // const formattedDate = moment(selectedDate).format('lll');
        const formattedDate = formatDate(selectedDate);
        console.log(id, cname, code, session, tmarks, title, wkdata, program, semester, section, title, Desp, GraderFor);
        try {


            // formdata.append("cCode", "CS497");
            // formdata.append("Title", "Quiz#1");
            // formdata.append("Description", "Quiz#1 of Week 1");
            // formdata.append("TotalMarks", "20");
            // formdata.append("DueDate", "2022-09-27, Tuesday");
            // formdata.append("Type", "File");
            const formData = new FormData();
            formData.append('id', '6');
            formData.append('TeacherId', id);
            formData.append('cCode', name.CourseCode);
            formData.append('cName', name.CourseName);
            formData.append('Session', session);
            formData.append('Semester', semester);
            formData.append('Section', section);
            formData.append('Program', program);
            formData.append('QuizTitle', title);
            formData.append('Description', Desp);
            formData.append('TotalMarks', tmarks);

            formData.append('DueDate', formattedDate.toString());



            // if (GraderFor == null) {
            //     formdata.append('isForGrader', false);
            // } else {

            formData.append('isForGrader', GraderFor);


            // formData.append('isForGrader', GraderFor.toString());
            // }
            formData.append('WeekNo', wkdata);


            console.log('file----------------------quiz', JSON.stringify(fileQuiz))
            // formdata.append("Files", fileQuiz[0]);
            if (fileQuiz && fileQuiz.length > 0) {
                // const file = fileQuiz[0];
                formData.append('files', {
                    uri: fileQuiz[0].uri,
                    type: fileQuiz[0].type,
                    name: fileQuiz[0].name,
                });
            }
            console.log(formData);
            console.log(fileQuiz);

            try {

                const response = await fetch(`http://${IP}/biit_lms_api/api/Teacher/addAsgFile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                const json = await response.json();
                console.log('response data', json);
            } catch (error) {
                console.log('error of API', error)
            }

            // console.log('backend ', result);
        }
        catch (error) {
            console.log('error log', error);
        }

    };

    async function GetAsg() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, wkdata, program, semester, section);
        let cname = name.CourseCode
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetAsgFile?weekInfo=${wkdata}&ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();

            if (data != null) {


                console.log(data, "get data of weekk");
                setAsgData(data.AssignFile);

            }
        } catch (error) {
            console.log(error);
        }
    };
    const [search, onChangeText] = React.useState('Search');
    const [linkdata, setLinkData] = React.useState([]);

    const [list, setList] = React.useState([]);

    const [info, setInfo] = React.useState();

    const GetSession = async () => {

        setInfo(data.Id);
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Admin/getTeacherAllocations?TeacherId=${info}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            console.log(data);
            setAllocations(data);


        } catch (error) {
            console.log(error);
        }
    };
    const AddLinks = async () => {

        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, name.CourseName, session, title, wkdata, program, semester, section);
        let alllinks = [links1, links2, links3];
        var raw = JSON.stringify({
            "weekNo": wkdata,
            "tId": data.Id,
            // "end_date": selectedDateEnd,
            "cCode": name.CourseCode,
            "cName": name.CourseName,
            "sess": session,
            "prog": program,
            "sem": semester,
            "section": section,
            "links": alllinks
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
            let url = `http://${IP}/biit_lms_api/api/Teacher/UploadYoutubeLinks`
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


    useEffect(() => {
        console.log(val);
        console.log(name.CourseName);
        console.log(name.CourseCode);

        week();
        GetLecture();
        GetQuiz();
        GetAsg();
        GetLinks();

    }, [wkdata]);
    async function week() {

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetSessionWeeks`
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
    async function GetLinks() {
        // let id = data.CourseAllocation[0].TeacherId;

        const da = val;
        const parts = da.split(" ");
        let session = 'Spring-2023';
        let program, semester, section;

        if (parts.length >= 2) {
            program = parts[0];
            semester = parts[1];

            if (semester.length >= 2) {
                section = semester[1];
                semester = semester[0];
            }
        }
        console.log(name.CourseCode, session, wkdata, program, semester, section);
        let cname = name.CourseCode
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            };
            let url = `http://${IP}/biit_lms_api/api/Teacher/GetLinks?weekInfo=${wkdata}&ccode=${cname}&ses=${session}&sec=${section}&sem=${semester}&pro=${program}`
            const response = await fetch(
                url,
                requestOptions,
            );
            const datal = await response.json();

            if (datal != null) {


                console.log(datal, "get data of linkss....................");
                const links = Object.entries(datal).reduce((acc, [key, value]) => {
                    if (key.startsWith('Link')) {
                        acc.push(value);
                    }
                    return acc;
                }, []);
                console.log("links  .............", links);
                setLinkData(links);
                console.log('data of link', linkdata);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        week();
        setRefreshing(false);
    };
    const handleBack = () => {
        setSelectedWeek(null);
    };
    const openYouTubeLink = (link) => {
        const youtubeLink = link;
        Linking.openURL(youtubeLink);
    };
    const [questions, setQuestions] = useState([]);
    const [modalVisibleMcqs, setModalVisibleMcqs] = useState(false);
    const [questionNo, setQuestionNo] = useState(1);
    const [questionText, setQuestionText] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correct, setCorrect] = useState('');
    const [apiQuestion, setApiQuestion] = useState([]);
    const handleAddQuestion = () => {
        const newQuestion = {
            questionNo,
            questionText,
            options: [option1, option2, option3, option4]

        };
        const qty = {

            questionNo,
            questionText,
            option1, option2, option3, option4,
            correct
        }
        setApiQuestion([...apiQuestion, qty]);
        setQuestions([...questions, newQuestion]);
        setQuestionNo(questionNo + 1);
        setQuestionText('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        // setCorrectOption('');
        setModalVisibleMcqs(false);
    };
    const handleWeekPress = (week) => {
        console.log(week);
        setWkdata(week);
        if (wkdata != null) {
            setSelectedWeek(week);
            console.log(wkdata);
            GetLecture();
        }
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        // setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        setSelectedDate(date);
        hideDatePicker();
    };
    const [checked, setChecked] = useState(false);

    const [GraderFor, setIsGraderFor] = useState(false);
    const [ModalMcqsQuiz, setModalMcqsQuiz] = useState(false);
    const handleCheckBoxToggle = () => {
        setChecked(!checked);
    };
    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={{ color: "#076F65" }}> {data?.Name}           </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {name?.CourseName}    </Text>
            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Section :{val}  </Text>

            <TouchableOpacity>
                <Text style={{ color: '#076F65', alignSelf: 'center' }} onPress={() => navigation.navigate('AttendanceSheet', { data, val, name })}>   <Ions name="md-archive-outline" size={30} color='#076F65' style={styles.icon} />  Attendance   </Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 15, marginTop: 10, marginLeft: -70 }} >

                <Text style={{ color: '#076F65', marginLeft: 209, marginTop: 7, fontSize: 20 }} onPress={() => navigation.navigate('Final', { data, val, name })}>Final Evaluation
                </Text>
            </View>
            {selectedWeek ? (
                // <WeekView week={selectedWeek} onBack={handleBack} />
                <View style={{ flex: 1, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10 }}>


                    <View style={{ alignSelf: 'center', }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold' }}>Lecture Notes</Text>
                        {vale.map((fileName, index) => (
                            <Text key={index} style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => navigation.navigate('PDFScreen', { fileName })}>
                                <Ant name="file1" size={20} color='#076F65' style={styles.icon1} />
                                {fileName}
                            </Text>
                        ))}
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Add +</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>YouTube Links</Text>
                        {linkdata.map((link, index) => (
                            <Text key={index} style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => openYouTubeLink(link)}>
                                <Ant name="youtube" size={20} color='red' marginRight='4' marginTop='2' style={styles.icon1} />
                                {link}
                            </Text>
                        ))}
                        <TouchableOpacity onPress={() => setModalLinks(true)} >
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Add +</Text>
                        </TouchableOpacity></View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Quiz</Text>
                        <Text style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => navigation.navigate('PDFQuiz', { quizdata })}>
                            <Ant name="file1" size={20} color='#076F65' marginRight='2' style={styles.icon1} />
                            {quizdata}
                        </Text>
                        <TouchableOpacity onPress={() => setModalQuiz(true)}>
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Add +</Text>
                        </TouchableOpacity></View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalLinks}
                        onRequestClose={() => setModalLinks(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setLinks1} value={links1} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setLinks2} value={links2} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setLinks3} value={links3} />

                            </View>
                            <TouchableOpacity onPress={() => { AddLinks() }}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalLinks(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalQuiz}
                        onRequestClose={() => setModalQuiz(false)}
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Quiz</Text>
                                <View style={{ marginRight: 45 }} >
                                    <Fonta name="file-text" size={25} color='#076F65' style={styles.iconx} onPress={() => setModalFileQuiz(true)} />
                                    <Text style={{ color: '#076F65', alignSelf: 'center', fontWeight: 'bold', fontSize: 10, marginTop: 23 }}>File</Text>
                                </View>
                                <View style={{ marginRight: 45, marginLeft: 50, marginTop: -40 }}>
                                    <Io name="point-of-sale" size={32} color='#076F65' style={styles.iconx} onPress={() => setModalMcqsQuiz(true)} />
                                    <Text style={{ color: '#076F65', alignSelf: 'center', fontWeight: 'bold', fontSize: 10, marginRight: -30, marginTop: 27 }}>MCQs</Text>
                                </View>

                                <TouchableOpacity onPress={() => setModalQuiz(false)}>
                                    <Text style={styles.modalCloseButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalAsg}
                        onRequestClose={() => setModalAsg(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setTitle} value={title} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setDesp} value={Desp} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setTmarks} value={tmarks} />

                            </View>


                            <View style={styles.checkboxRow}>

                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={GraderFor}
                                        onValueChange={setIsGraderFor}
                                        tintColors={{ true: '#076F65', false: '#076F65' }}
                                    />
                                    <Text style={styles.checkboxText}>isGraderFor</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.inputx} onPress={showDatePicker}>
                                <Icon name="calendar" size={30} color='#076F65' />
                                <Text style={{ color: '#076F65', marginLeft: -13 }}>{'  Date'}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <Text style={{ color: '#076F65', fontSize: 14 }} onPress={sendFileQuiz}>File Asg</Text>


                            <TouchableOpacity onPress={() => { handleUploadAsg() }}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalAsg(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={ModalMcqsQuiz}
                        onRequestClose={() => setModalMcqsQuiz(false)}
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ScrollView >
                                    <View style={styles.inputview}>
                                        <TextInput style={styles.input} onChangeText={setTitle} value={title} />

                                    </View>
                                    <View style={styles.inputview}>
                                        <TextInput style={styles.input} onChangeText={setDesp} value={Desp} />

                                    </View>
                                    <View style={styles.inputview}>
                                        <TextInput style={styles.input} onChangeText={setTmarks} value={tmarks} />

                                    </View>
                                    <TouchableOpacity style={styles.inputx} onPress={showDatePicker}>
                                        <Icon name="calendar" size={30} color='#076F65' />
                                        <Text style={{ color: '#076F65', marginLeft: -13 }}>{'  Date'}</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />

                                    <View>

                                        <View >

                                            {questions.map((question) => (
                                                <View key={question.questionNo}>
                                                    <Text style={{ color: '#076F65' }}>{`Question ${question.questionNo}`}</Text>
                                                    <Text style={{ color: '#076F65' }}>{question.questionText}</Text>
                                                    {question.options.map((option, index) => (



                                                        <Text key={index} style={{ color: '#076F65' }} onPress={() => setCorrectOption(option)}>{index + 1} {option}</Text>


                                                    ))}

                                                </View>

                                            ))}

                                        </View>
                                        <TouchableOpacity onPress={() => setModalVisibleMcqs(true)}>
                                            <Text style={{ color: '#076F65', marginLeft: 110 }}>Add MCQS</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={AddMcqs}>
                                            <Text style={{ color: '#076F65', marginLeft: 125 }} >Add </Text>
                                        </TouchableOpacity>


                                    </View>

                                    <TouchableOpacity onPress={() => setModalMcqsQuiz(false)}>
                                        <Text style={styles.modalCloseButton}>Cancel</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    <Modal animationType="slide"
                        transparent={true}
                        visible={modalVisibleMcqs}
                        onRequestClose={() => setModalVisibleMcqs(false)}
                        keyboardVerticalOffset={100}>
                        <View style={styles.modalContainer}>

                            <TextInput
                                placeholder="Question Text"
                                value={questionText}
                                onChangeText={setQuestionText}
                                style={{ color: '#076F65' }}
                            />
                            <TextInput
                                placeholder="Option 1"
                                value={option1}
                                onChangeText={setOption1}
                                style={{ color: '#076F65' }}
                            />
                            <TextInput
                                placeholder="Option 2"
                                value={option2}
                                onChangeText={setOption2}
                                style={{ color: '#076F65' }}
                            />
                            <TextInput
                                placeholder="Option 3"
                                value={option3}
                                onChangeText={setOption3}
                                style={{ color: '#076F65' }}
                            />
                            <TextInput
                                placeholder="Option 4"
                                value={option4}
                                onChangeText={setOption4}
                                style={{ color: '#076F65' }}
                            />
                            <TextInput
                                placeholder="Correct Option "
                                value={correct}
                                onChangeText={setCorrect}
                                style={{ color: '#076F65' }}
                            />
                            <TouchableOpacity onPress={handleAddQuestion}>
                                <Text>Add Question</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisibleMcqs(false)}>
                                <Text>Close</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }} >Assignment</Text>
                        <Text style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => navigation.navigate('PDFAsg', { asgdata })}>
                            <Ant name="file1" size={20} color='#076F65' style={styles.icon1} />
                            {asgdata}
                        </Text>
                        <TouchableOpacity onPress={() => setModalAsg(true)}>
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Add +</Text>
                        </TouchableOpacity>
                    </View >
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalFileQuiz}
                        onRequestClose={() => setModalFileQuiz(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setTitle} value={title} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setDesp} value={Desp} />

                            </View>
                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setTmarks} value={tmarks} />

                            </View>


                            <View style={styles.checkboxRow}>

                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={GraderFor}
                                        onValueChange={setIsGraderFor}
                                        tintColors={{ true: '#076F65', false: '#076F65' }}
                                    />
                                    <Text style={styles.checkboxText}>isGraderFor</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.inputx} onPress={showDatePicker}>
                                <Icon name="calendar" size={30} color='#076F65' />
                                <Text style={{ color: '#076F65', marginLeft: -13 }}>{'  Date'}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <Text style={{ color: '#076F65', fontSize: 14 }} onPress={sendFileQuiz}>File Quiz</Text>


                            <TouchableOpacity onPress={() => { handleUploadQuiz() }}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalFileQuiz(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>

                    <TouchableOpacity onPress={handleBack} style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 14, marginTop: 20, fontWeight: 'bold' }}>Back</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            <View style={styles.inputview}>
                                <TextInput style={styles.input} onChangeText={setTitle} value={title} />

                            </View>




                            <Text style={{ color: '#076F65', fontSize: 14 }} onPress={sendFile1}>File 1</Text>
                            <Text style={{ color: '#076F65', fontSize: 14 }} onPress={sendFile2}>File 2</Text>
                            <Text style={{ color: '#076F65', fontSize: 14 }} onPress={sendFile3}>File 3</Text>

                            <TouchableOpacity onPress={handleUpload}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Add</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 50, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>

                </View>
            ) : (
                <FlatList data={list} renderItem={({ item }) =>

                    <>

                        <View style={[styles.inputvi, { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }]}>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: 'center' }}>

                                <Ions name="ios-mail-outline" size={30} color='#076F65' style={styles.icon1} />
                                <Text style={{ alignItems: 'flex-start', color: '#076F65' }} onPress={() => handleWeekPress(item.WeekNo)}> {item.WeekNo}     {item.WeekStart}</Text>
                            </View>


                        </View>
                    </>

                } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
            )}
            <TouchableOpacity onPress={() => navigation.navigate("QuizAsg", { data, val, name })}>
                <Ions name="arrow-redo" size={40} color='#076F65' style={styles.iconp} />
            </TouchableOpacity>
        </View>

    )
}







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
        alignSelf: 'center'

    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxText: {
        color: '#076F65',
        marginLeft: 5,
    },
    inputy: {
        width: 100,
        marginTop: -40,
        height: 40,
        left: 270,
        fontSize: 14,
        fontWeight: 'bold',


    },
    container2: {
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
        marginTop: -70,
        backgroundColor: '#076F65',
        marginBottom: 200,
        marginLeft: 180,
        borderRadius: 32,
        width: 170,
        height: 50,
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
        width: 360,
        marginTop: 10,
        height: 50,
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
    inputx: {
        width: 100,
        marginTop: 2,
        height: 40,
        left: 130,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',

    },
    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 305
    },
    iconx: {
        // marginLeft:170,
        position: 'absolute',

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
    weekItemContainer: {
        padding: 12,
        backgroundColor: '#f0f0f0',
        marginBottom: 8,
        borderRadius: 8,
    },
    weekText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    weekViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        color: '#076F65',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
    },
    modalCloseButton: {
        color: '#076F65',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 110
    },

});
export default JrLecturer;