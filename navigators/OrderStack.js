import {createStackNavigator} from 'react-navigation-stack';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ManagerOrdersScreen from '../screens/ManagerOrdersScreen';


const OrderStack = createStackNavigator(
    {
        OrdersScreen: {
            screen: OrdersScreen,
            navigationOptions: {
                title: "OrdersScreen",
                header: null,
            }
        },
     

        OrderDetailScreen: {
            screen: OrderDetailScreen,
            navigationOptions: {
                title: "OrderDetailScreen",
                header: null,
            }
        },
        
        ManagerOrdersScreen: {
            screen: ManagerOrdersScreen,
            navigationOptions: {
                title: "ManagerOrdersScreen",
                header: null,
            }
        },
    },
    {
      initialRouteName: "OrdersScreen",
    }
)
export default OrderStack;
