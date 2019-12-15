import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainContainer from "./MainContainer";
import searchSeller from "./components/searchSeller";
import BookAppointmentScreen from "./components/BookAppointmentScreen";
import ConfirmationPage from "./components/ConfirmationPage";

const MainNavigator = createStackNavigator({
    Home: {
        screen: MainContainer,
        navigationOptions: {
            header: null,
        }
    },
    SearchSeller: {screen: searchSeller},
    BookAppointmentScreen: {screen: BookAppointmentScreen},
    ConfirmationScreen: {screen: ConfirmationPage}
});

const Navigator = createAppContainer(MainNavigator);

export default Navigator;
