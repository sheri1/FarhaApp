import {createStackNavigator} from 'react-navigation-stack';
import { Feather as Icon } from "@expo/vector-icons";

import SearchScreen from '../screens/SearchScreen';

const SearchStack = createStackNavigator(
    {
      SearchScreen: {
      screen: SearchScreen,
        navigationOptions: {
          title: "SearchScreen",
            header: null,
        }
      },
    },
    {
      initialRouteName: "SearchScreen",
    }
  );
export default SearchStack;
