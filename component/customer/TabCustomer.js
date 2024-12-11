import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RouteHomeCustomer from './RouteHomeCustomer';
import MyVehicle from './MyVehicle';
import Map from './Map';
import Notifications from './Notifications';
import {IconButton, Text } from 'react-native-paper';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const TabCustomer = ({navigation}) => {
    return (
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
                component={RouteHomeCustomer}
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
            <Tab.Screen
                name="MyVehicle"
                component={MyVehicle}
                options={{
                    tabBarIcon: () => (
                        <IconButton
                            icon={() => (
                                <Image 
                                source={require('H:/react-native/FinalProject/icon/iconMoto.png')} 
                                style={{ width: 24, height: 24 }} // Đặt kích thước cho icon
                                />
                            )}
                            color="black" // Đặt màu icon là đen
                            size={24} // Đặt kích thước icon là 24
                        />
                    ),
                    title: 'My Vehicle',

                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            iconColor="white"
                            onPress={() => navigation.navigate('Home')} 
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Xe của tôi
                        </Text>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="account-circle" 
                            size={34}
                            iconColor="white"
                            onPress={() => navigation.navigate('Profile')} 
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center', // Căn giữa tiêu đề
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: () => (
                        <IconButton
                            icon="google-maps"
                            color="black" // Đặt màu icon là đen
                            size={24} // Đặt kích thước icon là 24
                        />
                    ),
                    title: 'Map',

                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            iconColor="white"
                            onPress={() => navigation.navigate('Home')} 
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Google Map
                        </Text>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="account-circle" 
                            size={34}
                            iconColor="white"
                            onPress={() => navigation.navigate('Profile')} 
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center', // Căn giữa tiêu đề
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: () => (
                        <IconButton
                            icon="bell"
                            color="black" // Đặt màu icon là đen
                            size={24} // Đặt kích thước icon là 24
                        />
                    ),
                    title: 'Notifications',

                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            iconColor="white"
                            onPress={() => navigation.navigate('Home')} 
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Notifications
                        </Text>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="account-circle" 
                            size={34}
                            iconColor="white"
                            onPress={() => navigation.navigate('Profile')} 
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center', // Căn giữa tiêu đề
                }}
            />
        </Tab.Navigator>
    );
};

export default TabCustomer;
