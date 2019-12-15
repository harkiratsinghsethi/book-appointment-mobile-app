import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    FlatList,
    TouchableHighlight,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ImageBackground,
    Animated,
    TouchableOpacity,
    Alert
} from 'react-native';
// import { StackNavigator } from 'react-navigation';
// import { StackNavigator } from 'react-navigation-stack';

import searchSeller from "./components/searchSeller";
// const App = () => {
//     var greeting = 'Welcome to React';
//     return (
//         <div>
//             <h1>{greeting}</h1>
//         </div>
//     );
// };

// static navigationOptions =
//     {
//         title: 'MainActivity',
//     };
//

FunctionToOpenSecondActivity = () => {
    // this.props.navigation.navigate('SearchSeller');
    // Alert.alert('Simple Button pressed')

}

class MainContainer extends Component {
    static navigationOptions = {
        title: 'Welcome',

    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground
                source={require('./images/bgimage.jpeg')}
                style={styles.bgImage}>
                {/*<Image*/}
                    {/*style={{width: 50, height: 50}}*/}
                    {/*source={require('./images/profile.png')}/>*/}
                {/*<Image*/}
                    {/*style={{width: 50, height: 50}}*/}
                    {/*source={require('./images/setting.png')}/>*/}
                <View style={styles.buttonSection}>
                    <Button style={styles.button}
                            title="Book Appointment"
                            onPress={() => navigate('SearchSeller')}
                    />

                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    button: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSection: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
    ,
    bgImage: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#00BCD4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});
export default MainContainer;
// export default Project = StackNavigator(
//     {
//         First: { screen: MainContainer },
//
//         Second: { screen: searchSeller }
//     });
//
