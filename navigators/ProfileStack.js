import {createStackNavigator} from 'react-navigation-stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

import AddHallScreen from '../screens/AddHallScreen';
import AddHallStep2Screen from '../screens/AddHallStep2Screen';
import AddHallStep3Screen from '../screens/AddHallStep3Screen';
import AddHallDoneScreen from '../screens/AddHallDoneScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import AddRoomDoneScreen from '../screens/AddRoomDoneScreen';

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                title: "ProfileScreen",
                header: null,
            }
        },
        EditProfileScreen:{
            screen: EditProfileScreen,
            navigationOptions: {
                title: "EditProfileScreen",
                header: null,
            }
        },
        ChangePasswordScreen:{
            screen:ChangePasswordScreen,
            navigationOptions: {
                title: "ChangePasswordScreen",
                header: null,
            }
        },
        AddHallScreen:{
            screen:AddHallScreen,
            navigationOptions: {
                title: "AddHallScreen",
                header: null,
            }
        },
        AddHallStep2Screen:{
            screen:AddHallStep2Screen,
            navigationOptions: {
                title: "AddHallStep2Screen",
                header: null,
            }
        },
        AddHallStep3Screen:{
            screen:AddHallStep3Screen,
            navigationOptions: {
                title: "AddHallStep3Screen",
                header: null,
            }
        },
        AddHallDoneScreen:{
            screen:AddHallDoneScreen,
            navigationOptions: {
                title: "AddHallDoneScreen",
                header: null,
            }
        },
        AddRoomScreen:{
            screen:AddRoomScreen,
            navigationOptions: {
                title: "AddRoomScreen",
                header: null,
            }
        },
        AddRoomDoneScreen:{
            screen:AddRoomDoneScreen,
            navigationOptions: {
                title: "AddRoomDoneScreen",
                header: null,
            }
        },

    },
    {
      initialRouteName: "Profile"
    }
  );

export default ProfileStack;