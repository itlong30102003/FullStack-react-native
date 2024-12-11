import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import firestore, { arrayUnion } from "@react-native-firebase/firestore";
import { IconButton } from "react-native-paper";
const Invoice=({navigation, route})=>{
    const {id} = route.params.item; 
    const APPOINTMENT_REPAIR = firestore().collection("APPOINTMENT_REPAIR")
    const [data, setData] = useState([]); 

    console.log(data[0])
    useEffect(() => {
        APPOINTMENT_REPAIR
            .where("id", "==", id)  
            .onSnapshot((response) => {
                const arr = [];
                response.forEach((doc) => {
                arr.push(doc.data());
                });
                setData(arr);
            });
    }, [id]); 
    return(
        <View>
            <View style={{flexDirection:"row-reverse",alignItems:"center"}}>
                <Text style={{left:15}}>{data[0]?.updatedAt?.toDate().toLocaleDateString()}</Text>
                <IconButton
                    icon="calendar"
                    iconColor={"red"}
                    size={20}
                />
            </View>
            <View style={{height:"auto",width:"100%",alignItems:"center",flexDirection:"row",marginTop:-10}}>
                <Image style={{ width: 50, height: 50, marginLeft:10 }} source={require("H:/react-native/FinalProject/image/IconRepair.png")}/>
                <View style={{flexDirection:'column'}} >
                    <Text>{data[0]?.CuaHang}</Text>
                    <Text>Thợ sửa chữa: {data[0]?.PhanCong}</Text>
                </View>
            </View>
            
           <View style={{width:"90%",height:"auto", alignSelf:"center",borderWidth:1,borderColor:"black",marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'left'}}>Công việc</Text>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'right'}}>Chi phí</Text>
                </View> 
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'left'}}></Text>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'right'}}> VND</Text>
                </View>
                {data[0]?.PhuTung?.map((item, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                        <Text style={{fontSize: 16,textAlign: 'left'}}>{item.Name}</Text>
                        <Text style={{fontSize: 16,textAlign: 'right'}}>{item.Price}</Text>
                    </View>
                ))}
                <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 20}}>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'left'}}>GENERAL REPAIR</Text>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'right'}}></Text>
                </View>
                {data[0]?.DichVu.map((item, index) => (
                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, margin: 10, textAlign: 'left'}}>{item.value}</Text>
                    <Text style={{fontSize: 16, margin: 10, textAlign: 'right'}}>{item.price} VND</Text>
                    </View>
                ))}
                <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 50}}>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'left'}}>Tổng Tiền:</Text>
                    <Text style={{fontSize:16,fontWeight:"bold",margin:10,textAlign:'right'}}>{data[0]?.TotalCost} VND</Text>
                </View>
            </View>

           
            <TouchableOpacity 
                style={{height:40,width:160,alignSelf:"center",backgroundColor:"red",justifyContent:'center',borderRadius:24, marginTop:30,marginBottom:20}}
            >
                <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',color:'white'}}>
                    In hóa đơn
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{height:40,width:160,alignSelf:"center",backgroundColor:"red",justifyContent:'center',borderRadius:24, marginBottom:50}}
            >
                <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center',color:'white'}}>
                    Thông báo nhận xe
                </Text>
            </TouchableOpacity>
        </View>
    )
} 
export default Invoice;