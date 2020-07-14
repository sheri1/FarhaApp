import {createStackNavigator} from 'react-navigation-stack';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';


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
    },
    {
      initialRouteName: "OrdersScreen",
    }
)
export default OrderStack;
