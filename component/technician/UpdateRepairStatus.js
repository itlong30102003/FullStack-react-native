import { Image, TouchableOpacity, View , Text, FlatList} from "react-native"
import { IconButton,Checkbox, TextInput } from "react-native-paper"
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useEffect, useState } from "react";
import SelectMultiple from 'react-native-select-multiple';
import { ScrollView } from 'react-native-virtualized-view';
const UpdateRepairStatus=({navigation, route})=>{
    const { item } = route.params;
    const APPOINTMENT_REPAIR = firestore().collection("APPOINTMENT_REPAIR");
    const SERVICES = firestore().collection("SERVICES"); 
    const DEVICES = firestore().collection("DEVICES"); 

    const vehicle = item?.Xe;
    const ThoiGian = new Date(item?.ThoiGian?.seconds * 1000);
    const [service, setService] = useState(item?.DichVu || []);
    const khuyenMai = item?.KhuyenMai;
    const phanCong = item?.PhanCong;
    const cuaHang = item?.CuaHang;
    const appointmentBy = item?.Appointment_By;
    const [availableServices, setAvailableServices] = useState([]);  // Dữ liệu dịch vụ từ Firestore
    const [selectedServices, setSelectedServices] = useState([]);
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

    const sumCostService = () => {
        let sum = 0;
        service.forEach(item => {
            sum += item.price; // Cộng dồn giá trị của price
          });
        return sum;
      };
    
    const onSelectionsChange = (selectedItems) => {
        const updatedItems = selectedItems.map((selected) => {
            const matchedItem = availableServices.find(item => item.value === selected.value);
            return { value: selected.value, price: matchedItem?.price || 0 };
        });
        setService(updatedItems);
    };
    // cập nhật trạng thái bảo trì
    const updateCompletedStatus = (status) => {
        
        const updatedData = APPOINTMENT_REPAIR.doc(item?.id);

        updatedData.update({
            Completed: status,
        })
            .then(() => {
                console.log(item?.Completed)
                
                navigation.navigate("UpdateRepairStatus",{item :{...item,Completed : status}})
                alert("Trạng thái sửa chữa đã được cập nhật!");
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật trạng thái:", error);
                alert("Có lỗi xảy ra khi cập nhật trạng thái!");
            });
    };


    //thêm danh sách devices
    const [searchText, setSearchText] = useState('');
    const [allDevices, setAllDevices] = useState([]);
    const [allDevicesData, setAllDevicesData] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);
    useEffect(()=>{
        DEVICES.onSnapshot(
            response =>{
                var arr = []
                response.forEach(doc => arr.push(doc.data()))
                setAllDevices(arr)
                setAllDevicesData(arr)
            }
        )
    },[])

    const renderItem = ({item})=>{

        const handleSelectDevice = () => {
            // Kiểm tra xem thiết bị đã tồn tại trong selectedDevices chưa
            const existingDevice = selectedDevices.find(device => device.Name === item.Name);
            if (!existingDevice) {
                // Nếu chưa có, thêm thiết bị vào selectedDevices
                setSelectedDevices([...selectedDevices, item]);
            } else {
                // Có thể hiển thị thông báo hoặc xử lý khi thiết bị đã tồn tại
                alert('Thiết bị này đã được chọn.');
            }
        };

        return(
            <TouchableOpacity 
            style={{flexDirection: 'row',
                borderWidth: 1,
                height: "auto", 
                borderRadius: 10,
                margin: 5,
                justifyContent: 'space-between',
                alignItems:'center',
                padding: 10
            }}
                onPress={handleSelectDevice}
            >
                {((item.Image)&&(<Image source={{uri: item.Image}} style={{width:50,height:50}}/>))}
                <Text >{item.Name}</Text>
                <Text style={{fontWeight:'bold'}}>{item.Price} VND</Text>
            </TouchableOpacity>
        )
    }
    useEffect(()=>{
        setAllDevicesData(allDevices.filter( s=> s.Name.includes(searchText)))
    }, [searchText])

    const handleDeleteDevice = (deviceName) => {
        if (!deviceName) return;
        // Lọc và tạo danh sách mới với các thiết bị không bị xóa
        const updatedDevices = selectedDevices.filter(device => device.Name !== deviceName);
        // Kiểm tra nếu có sự thay đổi trong danh sách (sự kiện xóa thành công)
        if (updatedDevices.length !== selectedDevices.length) {
            setSelectedDevices(updatedDevices);
            alert('Đã xóa thiết bị thành công!');
        } else {
            alert('Không tìm thấy thiết bị để xóa.');
        }
    };
    const sumCostDevices = () => {
        let sum = 0;
        selectedDevices.forEach(device => {
            sum += device.Price; // Cộng dồn giá trị của Price (giá của phụ tùng)
        });
        return sum;
    };
    
    const handleInvoice = () => {
        const totalCost = sumCostService() + sumCostDevices();

        const updatedData = firestore().collection("APPOINTMENT_REPAIR").doc(item.id)
        updatedData.update({
            id: item.id,
            DichVu: service,
            PhuTung: selectedDevices,
            TotalCost: totalCost,// Thêm trường chi phí tổng
            updatedAt: firestore.FieldValue.serverTimestamp() 
        })
        .then(() => {
            navigation.navigate("Invoice", { item : item });
            alert("Lịch hẹn đã được cập nhật thành công!");
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật lịch hẹn:", error);
            alert("Có lỗi xảy ra khi cập nhật lịch hẹn!");
        });
    };
    return(
        <ScrollView>
            <View style={{height: 30,width: "90%",margin: 10,flexDirection: "row", justifyContent: "space-between",}}>
                <TouchableOpacity 
                    style={{ flexDirection: "row", alignItems: "center",justifyContent: "center",}}
                    onPress={() => updateCompletedStatus(false)}
                >
                    <IconButton 
                        icon="cog" 
                        size={24} 
                        iconColor={item?.Completed ? "grey" : "red"}
                        style={{marginRight: -8,}} 
                    />
                    <Text style={{color: item?.Completed ? "grey" : "red", fontSize: 16, textAlign: "center",}} >Đang sửa</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{ flexDirection: "row", alignItems: "center",justifyContent: "center",}}
                    onPress={() => updateCompletedStatus(true)}
                >
                    <IconButton 
                        icon="check" 
                        size={24} 
                        iconColor={item?.Completed ? "green" : "grey"}  
                        style={{marginRight: -8,}} 
                    />
                    <Text style={{color: item?.Completed ? "green" : "grey", fontSize: 16, textAlign: "center",}} >Hoàn Thành</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', marginLeft: 20, height: 200,width: "100%",marginTop:20}}>
                <View>
                    <View style={{width:140,height:140,backgroundColor:'#D9D9D9',borderRadius:70,alignSelf:"center",alignItems:'center',justifyContent:'center'}}>
                        <Image style={{width:70,height:70}} source={require("H:/react-native/FinalProject/image/imageMoto.png")}/>
                    </View>
                    <Text style={{fontSize:18,alignItems:'flex-start',color:"#989898",fontWeight:"bold",marginLeft:20}}>{vehicle.BSX}</Text>
                </View>
                <View style={{flexDirection: 'column',justifyContent:'flex-start',marginLeft: 50,marginTop:15, }}>
                    <Text style={{fontSize:18,color:"black",fontWeight:"bold"}}>{vehicle.TenXe}</Text>
                    <Text style={{fontSize:18,color:"black",fontWeight:"bold"}}>Mẫu xe: {vehicle.MauXe}</Text>
                    <Text style={{fontSize:18,color:"black",fontWeight:"bold"}}>Loại xe: {vehicle.LoaiXe}</Text>
                    <Text style={{fontSize:18,color:"black",fontWeight:"bold"}}>Màu sắc: {vehicle.Color}</Text>
                </View>
            </View>

            <View style={{margin:20}}>
                <Text style={{fontSize:16,fontWeight:"bold"}}> Loại dịch vụ</Text>
            </View>
            <View style={{width:"90%",height:"auto",borderRadius:14,borderWidth:1,alignSelf:"center" ,backgroundColor: 'white',}}>
                <View style={{margin:20}}>
                    <Text style={{fontSize:14,fontWeight:"bold",textAlign:"center"}}> Chọn loại dịch vụ</Text>
                    <Text style={{fontSize:12,textAlign:"center"}}> Bạn có thể chọn nhiều loại dịch vụ trong một lịch hẹn</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <SelectMultiple
                        items={availableServices}
                        selectedItems={service}
                        onSelectionsChange={onSelectionsChange}
                    />  
                </View>            
            </View>
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop:10, marginLeft:20 }}>Chi phí dịch vụ: {sumCostService()} VND</Text>
            </View>

            <View style={{marginTop:50,marginLeft:20}}>
                <Text style={{fontSize:16,fontWeight:"bold"}}> Thêm phụ tùng thay thế</Text>
            </View>
            <View style={{ margin: 20 ,marginBottom:20 , backgroundColor:"#D9D9D9", borderRadius:12}}>
                <TextInput
                    style={{margin: 10,backgroundColor:"#D9D9D9" }}
                    placeholder="Nhập thiết bị cần tìm kiếm"
                    value={searchText}
                    right={<TextInput.Icon icon = {'magnify'}/>}
                    onChangeText={setSearchText}
                />
                <FlatList
                data={allDevicesData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            </View>

            <View style={{marginTop:50,marginLeft:20}}>
                <Text style={{fontSize:16,fontWeight:"bold"}}> Danh sách tùng thay thế</Text>
            </View>
            <View style={{ margin: 20, backgroundColor: "#D9D9D9", borderRadius: 12 }}>
                {selectedDevices.length > 0 ? (
                    selectedDevices.map((device) => (
                        <View key={device.Name} 
                            style={{flexDirection: 'row',
                                borderWidth: 1,
                                height: "auto", 
                                borderRadius: 10,
                                margin: 5,
                                justifyContent: 'space-between',
                                alignItems:'center',
                                padding: 10
                            }}
                        >
                            {((device.Image)&&(<Image source={{uri: device.Image}} style={{width:50,height:50}}/>))}
                            <Text>{device.Name}</Text>
                            <IconButton
                                icon="delete"
                                iconColor="red"
                                size={20}
                                onPress={() => handleDeleteDevice(device.Name)}
                            />
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', margin: 10 }}>Chưa có thiết bị nào được chọn</Text>
                )}
            </View>
            <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop:10, marginLeft:20 ,marginBottom:20}}>Chi phí phụ tùng thay thế: {sumCostDevices()} VND</Text>
            </View>


            <TouchableOpacity 
                style={{height:40,width:160,alignSelf:"center",backgroundColor:"red",justifyContent:'center',borderRadius:24, marginBottom:50}}
                onPress={handleInvoice}
            >
                <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',color:'white'}}>
                    Xuất hóa đơn
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default UpdateRepairStatus;