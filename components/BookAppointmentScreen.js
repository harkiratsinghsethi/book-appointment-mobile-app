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

export default class BookAppointmentScreen extends Component {
    constructor() {
        super();
        this.delayValue = 500;
        this.seller_id = 0;
        this.state = {
            appointmentSlots: [],
            animatedValue: new Animated.Value(0),
            navigator: '',
            loading: false,
            requestMsg: false
        };

    }


    startAnimation() {
        // console.log('start animation', this.state.animatedValue, this.delayValue);

        Animated.spring(this.state.animatedValue, {
            toValue: 1,
            tension: 40,
            useNativeDriver: true
        }).start();
    }

    componentDidMount() {
        console.log('testing back…');
        fetch(`https://workoutapi-heroku.herokuapp.com/api/getAvailableAppointments?seller_id=${this.seller_id}`)
            .then(resp => resp.json())
            .then(respJson => {
                this.setState({
                    appointmentSlots: respJson,
                    loading: true
                });
                // arrayholder = respJson;
                this.delayValue = 500;

                this.startAnimation();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillUpdate() {
        // console.log('will', this.state.requestMsg);
        // if (this.state.requestMsg) {
        //
        // }

    }

    _bookAppointmentSlot = (item) => {
        this.setState({loading: false})
        fetch(`https://workoutapi-heroku.herokuapp.com/api/bookAppointmentSlot?seller_id=${item.seller_id}&start_time=${item.seller_slot_start_time}&end_time=${item.seller_slot_end_time}`)
            .then(resp =>
                resp.json()
            )
            .then(respJson => {
                console.log(respJson);
                if (respJson.changedRows) {
                    // this.setState({requestMsg: true})
                    // this.state.requestMsg=true;
                    fetch(`https://workoutapi-heroku.herokuapp.com/api/getAvailableAppointments?seller_id=${this.seller_id}`)
                        .then(resp =>
                            resp.json()
                        )
                        .then(respJson => {
                            this.setState({
                                appointmentSlots: respJson,
                                loading: true,
                                requestMsg: true

                            });
                            // arrayholder = respJson;
                            this.delayValue = 500;

                            this.startAnimation();
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                    // this.setState({loading: true});

                    // this.state.navigator.navigate('ConfirmationScreen')
                    console.log('book slot')
                }
            })

    };
    _bookAppointmentConfirmation = (item) => {
        console.log('appointment', item);

        Alert.alert(
            'Are You Sure?',
            'Are You Sure?',
            [
                {text: 'Yes', onPress: () => this._bookAppointmentSlot(item)},
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed')
                }
            ],
            {cancelable: true},
        );
    };

    componentDidUpdate(prevProps) {
        this.delayValue = 500;

        // console.log('did update', this.state.animatedValue);
        this.startAnimation();

    }

    _renderItem = ({item}) => {
        this.delayValue = this.delayValue + 500;
        const translateX = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.delayValue, 1]
        });
        return (
            <Animated.View
                style={[style.GridViewBlockStyle, {transform: [{translateX}]}]}
            >
                <View>
                    <Text style={style.GridViewInsideTextItemStyle}
                          onPress={() => this._bookAppointmentConfirmation(item)}
                    > {`${item.seller_slot_start_time} - ${item.seller_slot_end_time}`}
                    </Text>

                </View>
            </Animated.View>
        )
    };

    render() {
        console.log(this.state.requestMsg)
        this.state.navigator = this.props.navigation;
        this.seller_id = this.props.navigation.state.params.seller_id;
        return (<View style={style.container}>
            <LinearGradient colors={['#abb9d6', '#3b5998', '#192f6a']} style={{flex: 1}}>
                <Text style={style.appointmentText}> Appointment Slots Available</Text>
                {this.state.loading ? <Text> </Text> : <Text style={style.appointmentText}> Loading. . .</Text>}
                <SafeAreaView>

                    <FlatList
                        data={this.state.appointmentSlots}

                        renderItem={this._renderItem}


                        numColumns={2}

                    />
                </SafeAreaView>
                {this.state.requestMsg === true ?
                    <Text style={style.appointmentText}> Request has been sent.</Text> : <Text> </Text>}

            </LinearGradient>
        </View>)
    }
}

const style = StyleSheet.create({
    container:
        {
            flex: 1,
        },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    appointmentText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 50,
        margin: 5,
        backgroundColor: '#000004'

    },
    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 2,
        fontSize: 12,
        justifyContent: 'center',

    }
});
