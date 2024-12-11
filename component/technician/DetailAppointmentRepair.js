import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import firestore, { collection } from "@react-native-firebase/firestore";
const DetailAppointmentRepair = ({navigation, route})=>{
    const VEHICLES = firestore().collection("VEHICLES");
    const [vehicle, setVehicle] = useState({});
    const ThoiGian =  new Date(route.params.item.ThoiGian?.seconds * 1000);
    useEffect(() => {
        // Lấy thông tin từ route.params.item.Xe
        const vehicleData = route.params?.item?.Xe;
        if (vehicleData) {
            setVehicle(vehicleData);
        }
    }, [route.params]);

    
    return(
        <ScrollView>
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
            <View>
                <View
                    style={{
                        width: "91%",
                        height: 60,                            
                        backgroundColor: "#D9D9D9",
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize:16,marginLeft:10}}>
                        Đại lý:
                    </Text>
                    <Text style={{fontSize:16,marginLeft:10}}>
                        {route.params.item.CuaHang}
                    </Text>
                </View>
                <View
                    style={{
                        width: "91%",
                        height: 60,                            
                        backgroundColor: "#D9D9D9",
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize:16,marginLeft:10}}>
                        Thời gian nhận xe:
                    </Text>
                    <Text style={{fontSize:16,marginLeft:10}}>
                        {ThoiGian.toLocaleString()}
                    </Text>
                </View>
                <View
                    style={{
                        width: "91%",
                        height: 60,                            
                        backgroundColor: "#D9D9D9",
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize:16,marginLeft:10}}>
                        Dịch vụ yêu cầu:
                    </Text>
                    <Text style={{fontSize:16,marginLeft:10}}>
                        {route.params.item.DichVu.map(dichVu => dichVu.value).join(', ')}
                    </Text>
                </View>
                <View
                    style={{
                        width: "91%",
                        height: 60,                            
                        backgroundColor: "#D9D9D9",
                        borderBottomWidth: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                >   
                    <Text style={{fontSize:16,marginLeft:10}}>
                        Khuyến Mãi:
                    </Text>
                    <Text style={{fontSize:16,marginLeft:10}}>
                        {route.params.item.KhuyenMai}
                    </Text>
                </View>
                
                <TouchableOpacity 
                    style={{ height:40,width:180,backgroundColor:"red", borderRadius:24,justifyContent:"center", alignSelf:"center",marginTop:20}}
                    onPress={()=>navigation.navigate("UpdateRepairStatus",{item: route.params.item})}
                >
                    <Text style={{color:"white",fontSize:16,textAlign:'center',fontWeight:"bold"}}>Cập nhật tình trạng</Text>
                </TouchableOpacity>
            </View>
        </ScrollView> 
    )

}
export default DetailAppointmentRepair