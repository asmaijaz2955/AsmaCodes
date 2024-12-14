
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Alert, Radio, Linking, Text, Modal, View, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, ScrollView, SafeAreaView, useCallback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import IP from '../ip';
import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
const StdC = ({ navigation, route }) => {
    const [search, onChangeText] = React.useState('Search');
    const [list, setList] = React.useState([]);
    const { data, val } = route.params;
    const [quizDataMcqs, setQuizDataMcqs] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    // console.log('val....', val);
    const [datafile, setDatafile] = React.useState([]);
    const [vale, setvale] = React.useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [wkdata, setWkdata] = React.useState();
    const [linkdata, setLinkData] = React.useState([]);
    const [quizdata, setQuizData] = React.useState();
    const [asgdata, setAsgData] = React.useState();
    const [fileQuiz, setFileQuiz] = useState(null);
    const [fileAsg, setFileAsg] = useState(null);
    const [timeremain, setTimeRemain] = React.useState();
    useEffect(() => {
        week();
        GetLecture();
        GetQuiz();
        GetAsg();
        GetLinks();
        fetchQuizData();
    }, [wkdata]);
    const handleAnswerSelection = (questionNo, selectedOption) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionNo]: selectedOption
        }));
        console.log(selectedAnswers);
    };
    // const handleAnswerSelection = (questionNo, selectedOption) => {
    //     const question = quizDataMcqs.Questions.find(question => question.QuestionNo === questionNo);
    //     const isCorrect = question.Correct === selectedOption;

    //     setSelectedAnswers(prevAnswers => ({
    //         ...prevAnswers,
    //         [questionNo]: {
    //             selectedOption,
    //             isCorrect
    //         }
    //     }));
    // };
    const handleSubmitQuiz = () => {
        let totalCorrect = 0;

        quizDataMcqs.Questions.forEach(question => {
            const selectedOption = selectedAnswers[question.QuestionNo];
            if (selectedOption && question.Correct === selectedOption) {
                totalCorrect++;
            }
        });

        const quizResult = {
            ...quizDataMcqs,
            selectedAnswers,
            totalCorrect
        };

        console.log(quizResult);
        Alert.alert(
            'Quiz Result',
            `Total Correct Answers: ${quizResult.totalCorrect}/${quizResult.Questions.length}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Reset the selected answers and close the modal
                        setSelectedAnswers({});
                        setModalMcqsQuiz(false);
                    }
                }
            ]
        );
    };

    const fetchQuizData = async () => {
        // let id = data.CourseAllocation[0].TeacherId;
        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;
        let code = val.CourseCode;
        let name = val.Name;
        console.log('MCQs....', code, name, session, program, semester, section);
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
            let url = `http://${IP}/biit_lms_api/api/Student/GetMCQsQuiz?courseCode=${code}&courseName=${name}&session=${session}&program=${program}&semester=${semester}&section=${section}&weekNo=${wkdata}`;
            const response = await fetch(
                url,
                requestOptions,
            );
            const data = await response.json();
            setQuizDataMcqs(data);
            console.log('mcqsvvvvv', data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleBack = () => {
        setSelectedWeek(null);
    };
    const openYouTubeLink = (link) => {
        const youtubeLink = link;
        Linking.openURL(youtubeLink);
    };
    const handleWeekPress = (week) => {
        console.log(week);
        setWkdata(week);
        if (wkdata != null) {
            setSelectedWeek(week);
            console.log(wkdata);

        }
    };

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
    const [refreshing, setRefreshing] = useState(false);
    const [SubmitStatus, setSubmitStatus] = React.useState('Not Yet Submit');
    const onRefresh = () => {
        setRefreshing(true);
        week();

        setRefreshing(false);

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
                setSubmitStatus('Submit For Grading');
            } else {
                // Permission Denied
                alert('CAMERA Permission Denied');
            }
        } else {
            selectFileQuiz();
            setSubmitStatus('Submit For Grading');
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
    const [QuizInfo, setQuizInfo] = React.useState();
    const [AsgInfo, setAsgInfo] = React.useState();
    const [asgAttempted, setAsgAttempted] = useState(false);
    const [quizAttempted, setQuizAttempted] = useState(false);
    const [ModalQuizFile, setModalFileQuiz] = React.useState(false);
    const [ModalQuizMcqs, setModalMcqsQuiz] = React.useState(false);
    const [ModalAsgFile, setModalFileAsg] = React.useState(false);

    async function GetLecture() {
        // let id = data.CourseAllocation[0].TeacherId;
        console.log('val.......lec....', val);
        const cname = val.CourseCode;
        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;

        console.log('lecc', cname, session, wkdata, program, semester, section);

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
    async function GetLinks() {
        // let id = data.CourseAllocation[0].TeacherId;

        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;
        console.log('val......links.....', val);
        const cname = val.CourseCode;
        console.log('links', val.CourseCode, session, wkdata, program, semester, section);
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
    async function GetAsg() {
        // let id = data.CourseAllocation[0].TeacherId;

        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;

        console.log(vale.CourseCode, session, wkdata, program, semester, section);
        console.log('val.....Asg......', val);
        const cname = val.CourseCode;
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
                setAsgInfo(data);

            }
        } catch (error) {
            console.log(error);
        }
    };
    async function GetQuiz() {
        // let id = data.CourseAllocation[0].TeacherId;
        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;

        console.log(vale.CourseCode, session, wkdata, program, semester, section);
        console.log('val......Quiz .....', val);
        const cname = val.CourseCode;
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
                setQuizInfo(data);
                console.log('Quiz Info .......', QuizInfo);
                if (quizAttempted == false) {
                    const currentDate = new Date(); // Current time
                    const dueDate = new Date(QuizInfo.DueDate); // Example due date

                    const remainingTime = dueDate.getTime() - currentDate.getTime();

                    // Convert remaining time to desired units (hours, minutes, seconds)
                    const remainingSeconds = Math.floor(remainingTime / 1000) % 60;
                    const remainingMinutes = Math.floor(remainingTime / 1000 / 60) % 60;
                    const remainingHours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
                    const remainingDays = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

                    setTimeRemain(`${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUploadQuiz = async () => {
        // setLoading(true);


        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;
        let cname = val.Name;
        let code = val.CourseCode;
        const currentDateTime = new Date();
        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(currentDateTime.getDate()).padStart(2, '0');
        let hours = currentDateTime.getHours();
        const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

        // Determine AM/PM and adjust hours accordingly
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`;
        console.log(formattedDateTime);



        console.log(cname, code, session, program, semester, section);
        try {



            const formData = new FormData();
            formData.append('QuizId', QuizInfo.Id);
            formData.append('Sid', data.RegNo);
            formData.append('cCode', code);
            formData.append('cName', cname);
            formData.append('Session', session);
            formData.append('Semester', semester);
            formData.append('Section', section);
            formData.append('Program', program);
            formData.append('SubmitDate', formattedDateTime.toString());
            if (fileQuiz && fileQuiz.length > 0) {

                formData.append('files', {
                    uri: fileQuiz[0].uri,
                    type: fileQuiz[0].type,
                    name: fileQuiz[0].name,
                });
            }


            try {

                const response = await fetch(`http://${IP}/biit_lms_api/api/Student/SubmitQuizFile`, {
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
            setQuizAttempted(true);

            // console.log('backend ', result);
        }
        catch (error) {
            console.log('error log', error);
        }

    };
    const handleUploadAsg = async () => {
        // setLoading(true);
        let session = 'Spring-2023';
        let program, semester, section;
        program = data.Program;
        semester = data.Semester;
        section = data.Section;
        let cname = val.Name;
        let code = val.CourseCode;
        const currentDateTime = new Date();
        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
        const day = String(currentDateTime.getDate()).padStart(2, '0');
        let hours = currentDateTime.getHours();
        const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

        // Determine AM/PM and adjust hours accordingly
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amOrPm}`;
        console.log(formattedDateTime);
        console.log(cname, code, session, program, semester, section);
        try {
            const formData = new FormData();
            formData.append('AssignmentId', AsgInfo.Id);
            formData.append('Sid', data.RegNo);
            formData.append('cCode', code);
            formData.append('cName', cname);
            formData.append('Session', session);
            formData.append('Semester', semester);
            formData.append('Section', section);
            formData.append('Program', program);
            formData.append('SubmitDate', formattedDateTime.toString());
            if (fileQuiz && fileQuiz.length > 0) {

                formData.append('files', {
                    uri: fileQuiz[0].uri,
                    type: fileQuiz[0].type,
                    name: fileQuiz[0].name,
                });
            }


            try {

                const response = await fetch(`http://${IP}/biit_lms_api/api/Student/SubmitAssignmentFile`, {
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
            setAsgAttempted(true);

            // console.log('backend ', result);
        }
        catch (error) {
            console.log('error log', error);
        }

    };
    return (
        <View style={styles.container}>

            <View style={styles.inputv}>
                <Text style={styles.input}> {data.Name}             </Text>
                <Fonta name="user-circle-o" size={45} color='#076F65' style={styles.icon} />
            </View>



            <Text style={{ color: '#076F65', alignSelf: 'center' }}>   Course Name : {val.Name}  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ShowStudentAttendance', { data, val })}>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   <Ions name="md-archive-outline" size={30} color='#076F65' style={styles.icon} />  Attendance Report  </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{ color: '#076F65', alignSelf: 'center' }}>   <Ions name="md-documents-outline" size={30} color='#076F65' style={styles.icon} onPress={() => navigation.navigate('StudentAsgReport', { data, val })} /> Quiz & Assignment Report </Text>
            </TouchableOpacity>
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

                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>YouTube Links</Text>
                        {linkdata.map((link, index) => (
                            <Text key={index} style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => openYouTubeLink(link)}>
                                <Ant name="youtube" size={20} color='red' marginRight='4' marginTop='2' style={styles.icon1} />
                                {link}
                            </Text>
                        ))}
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Quiz</Text>
                        <Text style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => navigation.navigate('PDFQuiz', { quizdata })}>
                            <Ant name="file1" size={20} color='#076F65' marginRight='2' style={styles.icon1} />
                            {quizdata}
                        </Text>
                        <TouchableOpacity onPress={() => setModalMcqsQuiz(true)} >
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Attempt MCQs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalFileQuiz(true)} >
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Attempt</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={ModalQuizFile}
                        onRequestClose={() => setModalFileQuiz(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            {!quizAttempted ? (
                                <View>
                                    <Text style={{ color: '#076F65', fontSize: 14, alignSelf: 'center' }}>{QuizInfo.QuizTitle}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>Due Date :{QuizInfo.DueDate}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>Time Reamining :4 Days ,20 Hrs ,50 min </Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>SubmitStatus :{SubmitStatus}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14, alignSelf: 'center' }} onPress={sendFileQuiz}>File Quiz</Text>

                                </View>
                            ) : (
                                <Text style={styles.message}>Quiz Attempted. No changes can be made.</Text>
                            )}
                            <TouchableOpacity onPress={handleUploadQuiz}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Upload</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalFileQuiz(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 30, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={ModalQuizMcqs}
                        onRequestClose={() => setModalMcqsQuiz(false)}
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.container1}>
                            {!quizAttempted ? (
                                <View>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>{quizDataMcqs.QuizTitle}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>{quizDataMcqs.Description}</Text>
                                    {quizDataMcqs.Questions.map((question) => (
                                        <View key={question.QuestionNo}>
                                            <Text style={{ color: '#076F65', fontSize: 14 }}>{question.Question}</Text>
                                            <RadioButton.Group
                                                value={selectedAnswers[question.QuestionNo]}
                                                onValueChange={(value) => handleAnswerSelection(question.QuestionNo, value)}
                                            >
                                                <RadioButton.Item label={question.Option1} value={question.Option1} />
                                                <RadioButton.Item label={question.Option2} value={question.Option2} />
                                                <RadioButton.Item label={question.Option3} value={question.Option3} />
                                                <RadioButton.Item label={question.Option4} value={question.Option4} />
                                            </RadioButton.Group>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.message}>Quiz Attempted. No changes can be made.</Text>
                            )}
                            <TouchableOpacity onPress={handleSubmitQuiz}>
                                <Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalMcqsQuiz(false)}>
                                <Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 30, marginTop: -31 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={ModalAsgFile}
                        onRequestClose={() => setModalFileAsg(false)} keyboardVerticalOffset={100}>
                        <View style={styles.container1}>

                            {!asgAttempted ? (
                                <View>
                                    <Text style={{ color: '#076F65', fontSize: 14, alignSelf: 'center' }}>{AsgInfo.Title}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>Due Date :{AsgInfo.DueDate}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>Time Reamining :4 Days ,20 Hrs ,50 min </Text>
                                    <Text style={{ color: '#076F65', fontSize: 14 }}>SubmitStatus :{SubmitStatus}</Text>
                                    <Text style={{ color: '#076F65', fontSize: 14, alignSelf: 'center' }} onPress={sendFileQuiz}>File Assignment</Text>

                                </View>
                            ) : (
                                <Text style={styles.message}>Assignment Attempted. No changes can be made.</Text>
                            )}
                            <TouchableOpacity onPress={handleUploadAsg}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 200 }}>Upload</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalFileAsg(false)}><Text style={{ color: '#076F65', fontWeight: 'bold', fontSize: 20, marginLeft: 30, marginTop: -31 }}>Cancel</Text></TouchableOpacity>

                        </View>
                    </Modal>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }} >Assignment</Text>
                        <Text style={{ color: '#076F65', fontSize: 10, fontWeight: 'bold', marginBottom: 7 }} onPress={() => navigation.navigate('PDFAsg', { asgdata })}>
                            <Ant name="file1" size={20} color='#076F65' style={styles.icon1} />
                            {asgdata}
                        </Text>
                        <TouchableOpacity onPress={() => setModalFileAsg(true)} >
                            <Text style={{ color: '#076F65', fontSize: 15, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>Attempt</Text>
                        </TouchableOpacity>
                    </View >


                    <TouchableOpacity onPress={handleBack} style={{ alignSelf: 'center' }}>
                        <Text style={{ color: '#076F65', fontSize: 14, marginTop: 20, fontWeight: 'bold' }}>Back</Text>
                    </TouchableOpacity>


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
        </View>



    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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
        color: '#076F65',
        marginLeft: 3,

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
    button: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',

        color: '#076F65',
    },
    icon: {
        // marginLeft:170,
        position: 'absolute',
        marginLeft: 305
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

        color: '#076F65',

    },

});
export default StdC;