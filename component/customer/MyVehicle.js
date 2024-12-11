import { useEffect, useState } from "react"
import { Image, Touchable, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Icon, IconButton, Text } from "react-native-paper"
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../../context";


const MyVehicle=({navigation})=>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;

    const [vehicle, setVehicle] = useState([])
    const [vehicleData,setVehicleData] = useState([])
    const VEHICLES = firestore().collection("VEHICLES")

    useEffect(()=>{
        VEHICLES.onSnapshot((response) => {
            const arr = [];
            response.forEach(doc => {
                if (doc.data().createBy === userLogin.fullName) {
                    arr.push(doc.data());
                }
            });
            setVehicle(arr);
            setVehicleData(arr);
        });
    }, []);

    const renderItem = ({item})=>{
        const {TenXe, BSX} = item 
        return(
            <TouchableOpacity 
                style={{flexDirection:'row',width:"90%",height:"auto",borderRadius:14,borderWidth:1,alignSelf:"center",marginTop:10 }}
                onPress={() => navigation.navigate("VehicleDetail", {item: item})}
            >
                <View style={{width:100,height:100,backgroundColor:'#D9D9D9',borderRadius:60,alignSelf:"center",margin:10,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width:60,height:60}} source={require("H:/react-native/FinalProject/image/imageMoto.png")}/>
                </View>
                <View style={{flexDirection: 'column', justifyContent:"center"}}>
                    <Text style={{fontSize:20,fontWeight:"bold",margin:5}}>{TenXe}</Text>
                    <Text style={{fontSize:20,fontWeight:"bold",margin:5}}>{BSX}</Text>
                </View>
            </TouchableOpacity>
        )
    }

   
    return(
        <View style={{flex:1}}>
            <FlatList
                data={vehicleData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <TouchableOpacity 
                onPress={()=>navigation.navigate("AddNewVehicle")}
                style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: 10, 
                }}
            >
                <IconButton icon="plus-circle-outline" iconColor="red" size={24}/>
                <Text style={{color:"red",fontSize:18}}>Thêm xe mới</Text>
            </TouchableOpacity>

        </View>
    )
}
export default MyVehicle;