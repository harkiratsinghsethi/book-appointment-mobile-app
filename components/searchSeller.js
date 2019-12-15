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
    TouchableHighlight,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

function Item({id, title, selected, onSelect}) {
    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
                styles.item,
                {backgroundColor: selected ? '#6e3b6e' : '#f9c2ff'},
            ]}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
let arrayholder = [];

export default class searchSeller extends Component {
    state = {
        text: '',
        data: [],
        isLoading: false
    };


    componentDidMount() {
        console.log('in did')
        // this.setState({loading: true});
        fetch('https://workoutapi-heroku.herokuapp.com/api/getSellerDetails')
            .then(resp => resp.json())
            .then(respJson => {
                console.log(respJson)
                this.setState({
                    data: respJson,
                    loading: true
                });
                arrayholder = respJson;

            })
            .catch((error) => {
                console.error(error);
            });
    }

    static navigationOptions =
        {
            title: 'Search Seller',
        };

    SearchFilterFunction(text) {
        console.log(text);
        //passing the inserted text in textinput
        console.log(arrayholder);
        const newData = arrayholder.filter((item) => {
            //applying filter for the inserted text in search bar
            const itemData = item.seller_product.toString() ? item.seller_product.toString().toUpperCase() : ''.toUpperCase();
            const textData = text.toString().toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log(newData);
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            data: newData,
            text: text,
        });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (<View style={styles.container}>
            <LinearGradient colors={['#abb9d6','#abb9d6','#abb9d6']} style={{flex: 1}}>
                {this.state.loading ? <Text></Text> : <Text>Loading...</Text>}
                <ScrollView>

                    <TextInput
                        style={styles.textInputStyle}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Search Here"
                    />
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={({item, separators}) => (
                            <TouchableHighlight
                                onPress={() => navigate('BookAppointmentScreen', {
                                    seller_id: item.seller_id
                                })}
                            >
                                <View style={styles.flatview}>
                                    <Text style={styles.name}>{item.seller_id}</Text>
                                    <Text style={styles.name}>{item.seller_product}</Text>
                                </View>
                            </TouchableHighlight>
                        )}

                    />

                    {/*<FlatList*/}
                    {/*data={DATA}*/}
                    {/*renderItem={({item}) => (*/}
                    {/*<Item*/}
                    {/*id={item.id}*/}
                    {/*title={item.title}*/}
                    {/*// selected={!!selected.get(item.id)}*/}
                    {/*// onSelect={onSelect}*/}
                    {/*/>*/}
                    {/*)}*/}
                    {/*keyExtractor={item => item.id}*/}
                    {/*// extraData={selected}*/}
                    {/*/>*/}
                </ScrollView>
            </LinearGradient>

        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',

        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 5,
        borderRadius: 2,
        borderWidth: 1
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 18,


    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    }
});
