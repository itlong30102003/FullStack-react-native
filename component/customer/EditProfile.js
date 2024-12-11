import { Alert, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import { useMyContextController } from "../../context"
import { useEffect, useState } from "react";
import firestore, { doc } from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const EditProfile=({navigation})=>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    const isValidDate = (date) => !isNaN(new Date(date).getTime());
    const [avatar, setAvatar] = useState(userLogin ? userLogin.avatar : "");
    const [fullName, setFullName] = useState(userLogin ? userLogin.fullName : "");
    const [phone, setPhone] = useState(userLogin ? userLogin.phone : "");
    const [birthday, setBirthday] = useState(new Date(userLogin.birthday.seconds * 1000));
    const [gender, setGender] = useState(userLogin ? userLogin.gender : "");
    const [address, setAddress] = useState(userLogin ? userLogin.address : "");
    const [email, setEmail] = useState(userLogin ? userLogin.email : "");
    const [open, setOpen] = useState(false)
    

    const handleAlert = () => {
        Alert.alert(
            "Email không thể sửa đổi",
            "Vui lòng liên hệ quản trị viên nếu bạn muốn thay đổi email.",
            [{ text: "OK" }] // Nút xác nhận
        );
    };

    const updateProfile = () => {
        if (userLogin) {
          const userRef = firestore().collection("USERS").doc(userLogin.email);
          userRef.update({
            avatar,
            fullName,
            phone,
            birthday,
            address,
            gender
          })
          .then(() => {
            Alert.alert("Profile updated successfully!");
            navigation.navigate("Profile")
          })
          .catch((error) => {
            console.log(error);
            Alert.alert("Error updating profile, please try again.");
          });
        }
      };
    
    
    return(
        <View style={{flex:1}}>
            <View style={{width:'95%',height:580,backgroundColor:"#FFFFFF",borderColor:'#989898',borderWidth:1,alignSelf:"center",marginTop:10,borderRadius:16}}>
            <View style={{ position: 'relative', marginLeft: 25, marginTop: 15 }}>
                <Avatar.Image 
                    size={80} 
                    source={{ uri: avatar }} 
                />
                
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        left: 50,
                        top:50,
                        backgroundColor: '#000', 
                        borderRadius: 20, 
                        width: 35,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2, // Viền trắng
                        borderColor: '#FFF',
                    }} 
                    onPress={() => console.log('Change Avatar')}
                >
                    <MaterialIcons name="camera-alt" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>


                
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Họ và tên </Text>
                    <TextInput 
                        style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                        placeholder="Fullname"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Email</Text>
                    <TextInput 
                        style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                        value={email}
                        placeholder="Email is disabled"
                        onPressIn={handleAlert}
                    />
                </View>
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Giới tính </Text>
                    <View style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center',justifyContent:'center'}}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }>
                            <Picker.Item label="Nam" value="Nam" />
                            <Picker.Item label="Nữ" value="Nữ" />
                            <Picker.Item label="Khác" value="Khác" />
                        </Picker>
                    </View>
                </View>
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Phone</Text>
                    <TextInput 
                        style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                        placeholder="+84 "
                        value={phone}
                    />
                </View>
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15,}}>Ngày sinh</Text>
                    <TouchableOpacity
                        style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center',justifyContent:'center'}}
                        onPress={() => setOpen(true)}>
                        <Text> {birthday.toLocaleString()}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        mode="date"
                        open={open}
                        date={birthday}
                        onConfirm={(date) => {
                            setOpen(false)
                            setBirthday(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
                </View>
                <View >
                    <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Địa chỉ</Text>
                    <TextInput 
                        style={{width:"91%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                        placeholder="Địa chỉ"
                        value={address}
                    />
                </View>
            </View>

            <TouchableOpacity 
                onPress={updateProfile}
                style={{width:"95%", height:50, backgroundColor:"#FF3300",alignSelf:'center',borderRadius:8,justifyContent:"center",alignItems:'center',marginTop:10}}>
                <Text style={{fontSize:20, fontWeight:'bold',color:'#FFFFFF'}}>Lưu</Text>
            </TouchableOpacity>
        </View>
    )
}
export default EditProfile