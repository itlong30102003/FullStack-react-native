import { Image, ImageBackground, TouchableOpacity, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { useMyContextController } from "../../context"

const Home=({navigation})=>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <View style={{flex:1}}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('Profile')}
                style={{width:"92%",height:180,backgroundColor:'#D9D9D9',borderRadius:16,alignSelf:"center",marginTop:10}}>
                <Text style={{fontSize:20,fontWeight:'bold', color:'#FF3300', padding:15}}>Thông tin khách hàng</Text>
                <Avatar.Image size={40} source={{uri: userLogin.avatar}} style={{marginLeft:15}}/>
                <Text style={{fontSize:14, color:'#000000', margin:15 }}>{userLogin.fullName}</Text>
                <Text style={{fontSize:10, color:'#000000', marginLeft:15 }}>{userLogin.email}</Text>
            </TouchableOpacity>

            <View style={{width:"92%",height:370,backgroundColor:'#D9D9D9',borderRadius:16,alignSelf:"center",marginTop:10}}>
                <View style={{width:"96%",height:220,backgroundColor:'#FFFFFF',borderRadius:14,alignSelf:"center",marginTop:6,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{width:200,height:200}} source={require("H:/react-native/FinalProject/image/imageMoto.png")}/>
                </View>
                <Text style={{fontSize:16, color:'#000000', alignSelf:'center' }}>Vui lòng thêm phương tiện của bạn</Text>
                <Text style={{fontSize:12, color:'#000000', marginLeft:15,textAlign:'center',marginRight:15 }}>Thêm biển số xe của bạn để xem thông tin bảo hành , thông tin bảo trì , nhắc nhở lịch bảo trì và thông tin khuyến mãi</Text>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('AddNewVehicle')}
                    style={{
                        backgroundColor: "#000000",
                        width: 300,
                        height: 45,
                        alignSelf: 'center',
                        margin: 15,
                        borderRadius: 8,
                        alignItems: 'center',  
                        justifyContent: 'center', 
                    }}
                    >
                    <Text 
                        style={{
                        color: '#ffffff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center', 
                        }}
                    >
                        Thêm xe mới
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}
export default Home;