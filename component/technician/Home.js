import { Image, TouchableOpacity, View, Text, FlatList } from "react-native";
import { Avatar } from "react-native-paper";
import { useMyContextController } from "../../context";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';

const Home = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    const [AppointmentRepair, setAppointmentRepair] = useState([]);
    const [AppointmentRepairData, setAppointmentRepairData] = useState([]);
    const APPOINTMENT_REPAIR = firestore().collection("APPOINTMENT_REPAIR");

    useEffect(() => {
        APPOINTMENT_REPAIR.onSnapshot(
            response => {
                var arr = [];
                response.forEach((doc) => {
                    arr.push({
                        id: doc.id,     
                        ...doc.data(),   
                    });
                });
                setAppointmentRepair(arr);
                setAppointmentRepairData(arr);
            }
        );
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 5,
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'space-between', // Đảm bảo phần tử được phân bổ đều
                }}
                onPress={() => navigation.navigate("DetailAppointmentRepair", {item: item})}              
            >
                {/* Image Icon */}
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={{ width: 50, height: 50 }} source={require("H:/react-native/FinalProject/image/IconRepair.png")} />
                </View>

                {/* Xe Information */}
                <View style={{ flexDirection: "column", flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Xe.TenXe}</Text>
                    <Text>{new Date(item.ThoiGian?.seconds * 1000).toLocaleString()}</Text>
                </View>

                {/* Status */}
                <View style={{ alignItems: 'flex-end' }}>
                    {item.Completed ?
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#00AC31" }}>Completed</Text>
                        :
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#989898" }}>Pending</Text>
                    }
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        // Lọc danh sách theo người phụ trách (PhanCong)
        setAppointmentRepairData(
            AppointmentRepair.filter(item =>
                item.PhanCong === userLogin.fullName
            )
        );
    }, [userLogin.fullName, AppointmentRepair]);
    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* Employee Information */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{
                    width: "92%", height: 180, backgroundColor: '#D9D9D9', borderRadius: 16, alignSelf: "center", marginTop: 10,
                    padding: 15, justifyContent: 'space-between'
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF3300' }}>Thông tin nhân viên</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Image size={40} source={{ uri: userLogin.avatar }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: "red" }}>Trình độ: Level {userLogin.lever}</Text>
                </View>
                <Text style={{ fontSize: 14, color: '#000000' }}>{userLogin.fullName}</Text>
                <Text style={{ fontSize: 10, color: '#000000' }}>{userLogin.email}</Text>
            </TouchableOpacity>

            {/* Appointment List */}
            <View style={{ width: "92%", backgroundColor: '#D9D9D9', borderRadius: 16, alignSelf: "center", marginTop: 10 }}>
                <Text style={{
                    fontSize: 18, fontWeight: "bold", color: '#000000', alignSelf: 'center', marginTop: 20
                }}>Lịch phân công</Text>
                <Text style={{
                    fontSize: 12, color: '#000000', margin: 10, textAlign: 'center'
                }}>Chọn để xem thông tin chi tiết và cập nhật tình trạng công việc.</Text>

                <FlatList
                    data={AppointmentRepairData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default Home;