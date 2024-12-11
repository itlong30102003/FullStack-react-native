import { ScrollView, TouchableOpacity, View } from "react-native"
import { Avatar, IconButton, Text } from "react-native-paper"
import { useMyContextController } from "../../context"
import { useEffect, useState } from "react";
import firestore, { doc } from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
const Profile=({navigation})=>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    console.log((userLogin.birthday).toLocaleString())
    return(
        <ScrollView>
            <TouchableOpacity 
                style={{width:"92%",height:180,backgroundColor:'#D9D9D9',borderRadius:16,alignSelf:"center",marginTop:10}}>
                <Text style={{fontSize:20,fontWeight:'bold', color:'#FF3300', padding:15}}>Thông tin nhân viên</Text>
                <View style={{width:"auto",height:"auto",flexDirection:"row",justifyContent:'space-between'}}>
                    <Avatar.Image size={40} source={{uri: userLogin.avatar}} style={{marginLeft:15}}/>

                    <Text style={{fontSize:18,fontWeight:'bold',alignSelf:"center",marginRight:20,color:"red"}}>Trình độ: Lever {userLogin.lever}</Text>
                </View>
                <Text style={{fontSize:14, color:'#000000', margin:15 }}>{userLogin.fullName}</Text>
                <Text style={{fontSize:10, color:'#000000', marginLeft:15 }}>{userLogin.email}</Text>
            </TouchableOpacity>
            <View style={{width:"92%", height:520, backgroundColor:'#FFFFFF',borderColor:'#989898',borderWidth:1, alignSelf:'center',borderRadius:16,marginTop:10}}>
                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Họ và tên</Text>
                    <Text style={{fontSize:14}}>{userLogin.fullName}</Text>
                </View>
                
                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Số điện thoại</Text>
                    <Text style={{fontSize:14}}>{userLogin.phone}</Text>
                </View>

                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Ngày sinh</Text>
                    <Text style={{fontSize:14}}>{new Date(userLogin.birthday.seconds * 1000).toLocaleString() }</Text>
                </View>

                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Giới tính</Text>
                    <Text style={{fontSize:14}}>{userLogin.gender}</Text>
                </View>

                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Email</Text>
                    <Text style={{fontSize:14}}>{userLogin.email}</Text>
                </View>

                <View style={{width:"90%",height:"auto",borderBottomColor:'#989898',borderBottomWidth:1,marginBottom:10,alignSelf:"center"}}>
                    <Text style={{marginTop:15,marginBottom:15,fontSize:15,fontWeight:'bold'}}>Địa chỉ</Text>
                    <Text style={{fontSize:14}}>{userLogin.address}</Text>
                </View>
            </View>
                
        </ScrollView>
    )
}
export default Profile