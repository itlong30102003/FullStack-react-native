import { Image, Text, TouchableOpacity, View } from "react-native"
import { IconButton } from "react-native-paper"

const VehicleDetail=({navigation, route})=>{
    const vehicle = route.params.item
    return(
        <View style={{flex:1}}>
            <TouchableOpacity
                onPress={()=>navigation.navigate("AppointmentRepair",vehicle.BSX )}
                style={{flexDirection: 'row', alignItems: 'center',  margin: 10}}
            >
                <IconButton icon="calendar-plus" iconColor="red" size={24}/>
                <Text style={{color:"red",fontSize:14}}>Đặt dịch vụ</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginLeft: 20, height: 200,width: "100%"}}>
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
            <View style={{width:"75%", alignSelf:"center"}}>
                <Text style={{fontSize:16, fontWeight:"bold",textAlign:"center"}}>Thông tin bảo hiểm xe</Text>
                <Text style={{fontSize:16,textAlign:"center"}}>Xe của bạn chưa có thông tin bảo hiểm, vui lòng cập nhật để nhận thông báo nhắc nhở ngày hết hạn</Text>
                <TouchableOpacity style={{width:120,height:40,backgroundColor:'red',borderRadius:24,alignSelf:"center",margin:20,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:14,color:"white",fontWeight:"bold",textAlign:"center"}}>Tạo mới</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default VehicleDetail