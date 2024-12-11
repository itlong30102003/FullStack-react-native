import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {IconButton, Text } from 'react-native-paper';
import RouteHomeTechnician from './RouteHomeTechnician';


const Tab = createBottomTabNavigator();
const TabTechnician=({navigation})=>{
    return(
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: 'white', 
                    height: 70, 
                    paddingBottom: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 12, 
                    color:"red"
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={RouteHomeTechnician}
                options={{
                    headerShown:false,
                    tabBarIcon: () => (
                        <IconButton
                            icon="home"
                            color="black" // Đặt màu icon là đen
                            size={24} // Đặt kích thước icon là 24
                        />
                    ),
                    title:"home"
                }}
            />
        </Tab.Navigator>
    )
}
export default TabTechnician;