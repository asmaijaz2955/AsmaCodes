
import { StyleSheet, Text, View, Image, useState, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const DatacellDashBoard = ({ navigation }) => {
    const navigating = () => {
        navigation.navigate('DataCellCourse')
    };
    const navigatings = () => {
        navigation.navigate('SessionCourseDataCell')
    };
    const navigatingt = () => {
        navigation.navigate('Teacher')
    };
    const navigatingse = () => {
        navigation.navigate('OfferedCourse')
    };
    const navigatingss = () => {
        navigation.navigate('Student')
    };
    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigating()}>

                    {/* <Image style={styles.images} source={require('../pics/cc.png')} /> */}
                    <Icon name="newspaper-outline" size={100} color='#076F65' style={styles.images} />
                    <Text style={styles.text}>Course</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigatings()} style={styles.touch}>
                    {/* <Image style={styles.images} source={require('../pics/ss.png')} /> */}
                    <Icon name="ios-receipt-outline" size={100} color='#076F65' style={styles.images1} />
                    <Text style={styles.text1}>Session</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigatingss()}>

                    <Icons name="alarm-panel-outline" size={100} color='#076F65' style={styles.images2} />
                    {/* <Image style={styles.images} source={require('../pics/s.png')} /> */}
                    <Text style={styles.text}>Enrollment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigatingse()}>
                    {/* <Image style={styles.images} source={require('../pics/sesmeter.png')} /> */}
                    <Icons name="clipboard-text-multiple-outline" size={100} color='#076F65' style={styles.images4} />
                    <Text style={styles.text6}>Offered Course</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    images: {
        top: 10,
        left: 11,
        width: 150,
        height: 150,
    },
    text: {
        marginTop: 5,
        top: -38,
        fontSize: 25,
        left: 14,
        fontWeight: 'bold',
        color: '#076F65'
    },
    text6: {
        marginTop: 5,
        top: -38,
        fontSize: 25,
        left: 14,
        fontWeight: 'bold',
        color: '#076F65'
    },
    images1: {
        top: 10,
        left: 11,
        width: 150,
        height: 150,
    },
    text1: {
        marginTop: 5,
        top: -38,
        fontSize: 25,
        left: 15,
        fontWeight: 'bold',
        color: '#076F65'
    },
    images2: {
        top: 10,
        left: 27,
        width: 150,
        height: 150,
    },
    text2: {
        marginTop: 5,
        top: -38,
        fontSize: 25,
        left: 0,
        fontWeight: 'bold',
        color: '#076F65'
    },
    images3: {
        top: 10,
        left: 25,
        width: 150,
        height: 150,
    },
    images4: {
        top: 10,
        left: 74,
        width: 150,
        height: 150,
    },
    content: {
        flexDirection: "row",
    },
    content1: {
        alignItems: 'center'
    },
    touch: {
        marginLeft: 70,
    }

});
export default DatacellDashBoard;