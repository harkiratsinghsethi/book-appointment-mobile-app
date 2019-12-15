import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    FlatList,
    Animated,
    TouchableHighlight,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const confirmationpage = () => {

    return (
            <View style={style.container}>
                <LinearGradient colors={['#abb9d6', '#3b5998', '#192f6a']} style={{flex: 1}}>
                    <Text style={style.appointmentText}> Request has been sent</Text>
                </LinearGradient>
            </View>)

};

export default confirmationpage;
const style = StyleSheet.create({
    container:
        {
            flex: 1,
        },

    appointmentText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    }
});
