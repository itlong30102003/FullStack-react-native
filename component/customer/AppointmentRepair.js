import { useEffect, useState } from "react";
import { Modal, Alert, ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { useMyContextController } from "../../context";
import firestore, { collection } from "@react-native-firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { IconButton } from "react-native-paper"; 
import SelectMultiple from 'react-native-select-multiple';

const AppointmentRepair = ({ navigation, route }) => {
    const [controller] = useMyContextController();
    const { userLogin } = controller;
    const VEHICLES = firestore().collection("VEHICLES");
    const APPOINTMENT_REPAIR = firestore().collection("APPOINTMENT_REPAIR");
    const SERVICES = firestore().collection("SERVICES");  // Dịch vụ từ Firestore

    const [vehicle, setVehicle] = useState({});
    const [CuaHang, setCuaHang] = useState("");
    const [ThoiGian, setThoiGian] = useState(new Date());
    const [service, setService] = useState([]);
    const [KhuyenMai, setKhuyenMai] = useState("");
    const [open, setOpen] = useState(false);
    const [seviceOpen, setSeviceOpen] = useState(false); 
    const [availableServices, setAvailableServices] = useState([]);  // Dữ liệu dịch vụ từ Firestore
    // Tải dịch vụ từ Firestore
    useEffect(() => {
        const unsubscribe = SERVICES.onSnapshot((querySnapshot) => {
            const servicesList = [];
            querySnapshot.forEach((doc) => {
                const serviceData = doc.data();
                servicesList.push({
                    label: serviceData.ServiceName,
                    value: serviceData.ServiceName,
                    price: serviceData.price,
                });
            });
            setAvailableServices(servicesList);  // Lưu vào state
            
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        const unsubscribe = VEHICLES.onSnapshot((response) => {
            response.forEach((doc) => {
                if (doc.data().BSX === route.params) {
                    setVehicle(doc.data());
                }
            });
        });
        return () => unsubscribe();
    }, [route.params]);

    const onSelectionsChange = (selectedItems) => {
        const updatedItems = selectedItems.map((selected) => {
            const matchedItem = availableServices.find(item => item.value === selected.value);
            return { value: selected.value, price: matchedItem?.price || 0 };
        });
        setService(updatedItems);
    };

    const isFormValid = () => {
        return CuaHang !== "" && ThoiGian !== "" && service.length > 0 && KhuyenMai !== "";
    };
    
    const handleAppointmentRepair = () => {
        if (!isFormValid()) {
            Alert.alert("Error", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        APPOINTMENT_REPAIR.add({
            // id: route.params.item.id, do là chưa thể có id khi mà tạo mới nên sẽ khong gọi được và cần add trước rồi mới thêm lại id dô để tiện cho các lần dùng sau
            Xe: vehicle, 
            CuaHang,
            ThoiGian,
            DichVu: service,
            KhuyenMai,
            PhanCong: "Chưa phân công",
            Completed: false,
            Appointment_By: userLogin.fullName,
            updatedAt: firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            APPOINTMENT_REPAIR.doc(docRef.id).update({ id: docRef.id });
            navigation.navigate("MyVehicle");
            Alert.alert("Đặt lịch hẹn dịch vụ thành công");
        })
        .catch(() => Alert.alert("Đặt lịch hẹn dịch vụ thất bại"));
    };

    return (
        <ScrollView>
            <View
                style={{
                    width: "90%",
                    height: "auto",
                    alignSelf: "center",
                    borderRadius: 16,
                    borderColor: "black",
                    borderWidth: 1,
                    backgroundColor: "#D9D9D9",
                    marginTop: 10,
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        margin: 10,
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "red",
                    }}
                >
                    Thông tin xe
                </Text>

                {Object.keys(vehicle).length > 0 ? (
                    <>
                        <Text style={{ textAlign: "left", marginLeft: 10, fontSize: 18, color: "black" }}>
                            Biển số xe: {vehicle.BSX}
                        </Text>
                        <Text style={{ textAlign: "left", marginLeft: 10, fontSize: 18, color: "black" }}>
                            Màu xe: {vehicle.Color}
                        </Text>
                        <Text style={{ textAlign: "left", marginLeft: 10, fontSize: 18, color: "black" }}>
                            Loại xe: {vehicle.LoaiXe}
                        </Text>
                        <Text style={{ textAlign: "left", marginLeft: 10, marginBottom: 10, fontSize: 18, color: "black" }}>
                            Tên xe: {vehicle.TenXe}
                        </Text>
                    </>
                ) : (
                    <Text style={{ textAlign: "center", margin: 10, fontSize: 18, color: "gray" }}>
                        Không có thông tin xe. Vui lòng thử lại!
                    </Text>
                )}
            </View>

            <View
                style={{
                    width: "90%",
                    height: "auto",
                    alignSelf: "center",
                    borderRadius: 16,
                    borderColor: "black",
                    borderWidth: 1,
                    backgroundColor: "#D9D9D9",
                    marginTop: 10,
                }}
            >
                <View>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 15 }}>Cửa hàng </Text>
                    <View
                        style={{
                            width: "91%",
                            height: 40,
                            backgroundColor: "#D9D9D9",
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            alignSelf: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Picker
                            selectedValue={CuaHang}
                            onValueChange={(itemValue) => setCuaHang(itemValue)}
                        >
                            <Picker.Item label="Đại lý Hồng Nhung #1 chi nhánh Tân Uyên." value="Đại lý Hồng Nhung #1 chi nhánh Tân Uyên." />
                            <Picker.Item label="Đại lý Hồng Nhung #2 chi nhánh Thủ Dầu Một." value="Đại lý Hồng Nhung #2 chi nhánh Thủ Dầu Một." />
                            <Picker.Item label="Đại lý Hồng Nhung #3 chi nhánh TP.HCM." value="Đại lý Hồng Nhung #3 chi nhánh TP.HCM." />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 15 }}>Chọn thời gian</Text>
                    <TouchableOpacity
                        style={{
                            width: "91%",
                            height: 40,
                            backgroundColor: "#D9D9D9",
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                        }}
                        onPress={() => setOpen(true)}
                    >
                        <Text>{ThoiGian.toLocaleString()}</Text>
                        <IconButton
                            icon="pencil"
                            size={20}
                            onPress={() => setOpen(true)}
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        mode="datetime"
                        open={open}
                        date={ThoiGian}
                        onConfirm={(date) => {
                            setOpen(false);
                            setThoiGian(date);
                        }}
                        onCancel={() => setOpen(false)}
                    />
                </View>

                <View>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 15 }}>Chọn dịch vụ</Text>
                    <TouchableOpacity
                        style={{
                            width: "91%",
                            height: "auto",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 8,
                            borderBottomWidth: 1,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 10,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>{service.map((item) => item.value).join(", ")}</Text>
                        {seviceOpen ? (
                            <IconButton
                                icon="check"
                                size={20}
                                onPress={() => setSeviceOpen(false)}
                            />
                        ) : (
                            <IconButton
                                icon="pencil"
                                size={20}
                                onPress={() => setSeviceOpen(true)}
                            />
                        )}
                    </TouchableOpacity>

                    <Modal
                        visible={seviceOpen}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setSeviceOpen(false)}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                        >
                            <View
                                style={{
                                    width: "90%",
                                    backgroundColor: "#D9D9D9",
                                    padding: 10,
                                    borderRadius: 14,
                                    alignItems: "left",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                        textAlign: "center",
                                    }}
                                >
                                    Chọn dịch vụ
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 10,
                                        textAlign: "center",
                                    }}
                                >
                                    Bạn có thể chọn nhiều dịch vụ trong một lịch hẹn
                                </Text>
                                <SelectMultiple
                                    style={{borderRadius:14}}
                                    items={availableServices}
                                    selectedItems={service}
                                    onSelectionsChange={onSelectionsChange}
                                />
                                
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent:'center',
                                        marginTop: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => setSeviceOpen(false)}
                                        style={{
                                            backgroundColor: "#989898",
                                            height: 35,
                                            width: 100,
                                            borderRadius: 24,
                                            justifyContent:"center", 
                                            margin:10
                                        }}
                                    >
                                        <Text style={{color: "white", fontSize:14, fontWeight:"bold", textAlign:"center"}}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setSeviceOpen(false)}
                                        style={{
                                            backgroundColor: "red",
                                            height: 35,
                                            width: 100,
                                            borderRadius: 24,
                                            justifyContent:"center", 
                                            margin:10
                                        }}
                                    >
                                        <Text style={{color: "white", fontSize:14, fontWeight:"bold", textAlign:"center"}}>Đồng ý</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 15 }}>Chọn khuyến mãi</Text>
                    <View style={{ width: "91%", height: 40, backgroundColor: "#D9D9D9", borderRadius: 8, borderBottomWidth: 1, alignSelf: "center", justifyContent: "center" }}>
                        <Picker
                            selectedValue={KhuyenMai}
                            onValueChange={(itemValue) => setKhuyenMai(itemValue)}>
                            <Picker.Item label="Giảm 10% cho khách hàng VIP" value="Giảm 10% cho khách hàng VIP" />
                            <Picker.Item label="Tặng 1 lần thay dầu miễn phí" value="Tặng 1 lần thay dầu miễn phí" />
                            <Picker.Item label="Miễn phí kiểm tra xe" value="Miễn phí kiểm tra xe" />
                        </Picker>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleAppointmentRepair}
                style={{
                    backgroundColor: "red",
                    height: 35,
                    width: 100,
                    borderRadius: 24,
                    alignSelf:'center',
                    justifyContent:"center", 
                    margin:10
                }}
            >
                <Text style={{color: "white", fontSize:14, fontWeight:"bold", textAlign:"center"}}>Đặt lịch</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AppointmentRepair;