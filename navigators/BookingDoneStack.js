import {createStackNavigator} from 'react-navigation-stack';
import { Feather as Icon } from "@expo/vector-icons";

import BookingDoneScreen from '../screens/BookingDoneScreen';

const BookingDoneStack = createStackNavigator(
    {
      BookingDoneScreen: {
      screen: BookingDoneScreen,
        navigationOptions: {
          title: "BookingDoneScreen",
            header: null,
        }
      },
    },
    {
      initialRouteName: "BookingDoneScreen",
    }
  );
export default BookingDoneStack;
