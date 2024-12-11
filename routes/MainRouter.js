import { Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../component/Login";
import Register from "../component/Register";
import TabCustomer from "../component/customer/TabCustomer";
import TabTechnician from "../component/technician/TabTechnician";

const Stack = createStackNavigator()
const MainRouter=({navigation})=>{
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="register" component={Register}/>
            <Stack.Screen name="tabcustomer" component={TabCustomer}/>
            <Stack.Screen name="tabtechnician" component={TabTechnician}/>
        </Stack.Navigator>
    )
}
export default MainRouter;