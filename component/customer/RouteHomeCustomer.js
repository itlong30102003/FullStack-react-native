import {  Button,TextInput, TouchableOpacity, View } from "react-native";
import { Icon, IconButton, Text } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../../context";
import Home from "./Home";
import { useState } from "react";
import Profile from "./Profile";
import AddNewVehicle from "./AddNewVehicle";
import EditProfile from "./EditProfile";
import { MaterialIcons } from 'react-native-vector-icons'
import VehicleDetail from "./VehicleDetail";
import AppointmentRepair from "./AppointmentRepair";

const Stack = createStackNavigator();
const RouteHomeCustomer = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handleMagnifyIcon = () => {
        setSearchVisible(!searchVisible);
        console.log('Click')
    };

    const handleSearch = () => {
        // Thực hiện tìm kiếm với searchText
        console.log("Search text:", searchText);
        setSearchVisible(false);
    };

    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerLeft: () => null,
                    headerRight: () => null,
                    title: searchVisible ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput 
                                style={{ 
                                    backgroundColor: "white",
                                    borderRadius: 24, 
                                    paddingHorizontal: 10, 
                                    height: 40, 
                                    width: "90%" 
                                }} 
                                placeholder="Search..." 
                                value={searchText} 
                                onChangeText={setSearchText}
                            />
                            <IconButton
                                icon="magnify" 
                                size={24}
                                iconColor="white"
                                onPress={handleSearch} 
                                style={{ padding: 0 }}
                            />
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: "white", flex: 1,fontSize:18 }}>Wellcome, {userLogin.fullName}</Text>
                            <IconButton
                                icon="magnify" 
                                size={24}
                                iconColor="white"
                                onPress={handleMagnifyIcon} 
                                style={{ padding: 0 }}
                            />
                        </View>
                    ),
                    headerTitleStyle: { color: "white" },
                    headerStyle: { backgroundColor: "black" },
                }}
            />
            <Stack.Screen 
                name="Profile" 
                component={Profile}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            iconColor="white"
                            onPress={() => navigation.goBack()} 
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Thông tin cá nhân
                        </Text>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="pencil" // Icon cây bút cho nút chỉnh sửa
                            size={24}
                            iconColor="red"
                            onPress={() => navigation.navigate('EditProfile')} // Điều hướng đến màn hình chỉnh sửa hồ sơ
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center', // Căn giữa tiêu đề
                })}
            />
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfile}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            iconColor="white"
                            onPress={() => navigation.goBack()} 
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            Thông tin cá nhân
                        </Text>
                    ),
                    headerRight: () => (
                        <IconButton
                            icon="close" 
                            size={24}
                            iconColor="red"
                            onPress={() => navigation.goBack()} 
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center', // Căn giữa tiêu đề
                })}
            />
            <Stack.Screen 
                name="AddNewVehicle" 
                component={AddNewVehicle}
                options={{
                    headerTitleStyle: { color: "white" },
                    headerStyle: { backgroundColor: "black" },
                }}
            />
            <Stack.Screen 
                name="VehicleDetail" 
                component={VehicleDetail}
                options={{
                    headerTitleStyle: { color: "white" },
                    headerStyle: { backgroundColor: "black" },
                }}
            />
            <Stack.Screen 
                name="AppointmentRepair" 
                component={AppointmentRepair}
                options={{
                    headerTitleStyle: { color: "white" },
                    headerStyle: { backgroundColor: "black" },
                }}
            />
        </Stack.Navigator>
    );
};

export default RouteHomeCustomer;