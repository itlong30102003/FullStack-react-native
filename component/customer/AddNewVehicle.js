    import { useState } from "react"
    import { Alert, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
    import { Text } from "react-native"
    import { useMyContextController } from "../../context";
    import { Picker } from "@react-native-picker/picker";
    import { IconButton } from "react-native-paper";
    import firestore from "@react-native-firebase/firestore";

    const AddNewVehicle=({navigation})=>{

        const [controller, dispatch] = useMyContextController();
        const {userLogin} = controller;
        const VEHICLES = firestore().collection("VEHICLES")

        const [TenXe,setTenXe] = useState("");
        const [BSX,setBSX] = useState("");
        const [MauXe,setMauXe] = useState("");
        const [LoaiXe,setLoaiXe] = useState("");
        const [Color,setColor] = useState("");
         // Hàm kiểm tra xem các trường có rỗng không
        const isFormValid = () => {
            return TenXe !== "" && BSX !== "" && MauXe !== "" && LoaiXe !== "" && Color !== "";
        }
        const handleAddNewVehicle =()=>{
            if (!isFormValid()) {
                Alert.alert("Error", "Vui lòng điền đầy đủ thông tin");
                return;
            }
            VEHICLES.add({
                TenXe,
                BSX,
                MauXe,
                LoaiXe,
                Color,
                createBy: userLogin.fullName,
            })
                .then(() => {
                    navigation.navigate("MyVehicle");
                    Alert.alert("Thêm xe mới thành công");
                })
                .catch((e) => Alert.alert("Thêm xe mới thất bại"));
        }

        return(
            <ScrollView >
                <View style={{width:"90%",height:450,borderRadius:16,borderWidth:1,marginTop:10,alignSelf:'center'}}>
                    <Text style={{fontSize:20,fontWeight:"bold",color:'red',alignSelf:'center',margin:10}}>Điền thông tin cho xe của bạn</Text>
                    <View >
                        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}> Tên xe</Text>
                        <TextInput 
                            style={{width:"90%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                            placeholder="name vehicle"
                            value={TenXe}
                            onChangeText={setTenXe}
                        />
                    </View>
                    <View >
                        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}> Biển số xe</Text>
                        <TextInput 
                            style={{width:"90%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                            placeholder="name vehicle"
                            value={BSX}
                            onChangeText={setBSX}
                        />
                    </View>
                    <View >
                        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Mẫu xe </Text>
                        <View style={{width:"90%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center',justifyContent:'center'}}>
                            <Picker
                                selectedValue={MauXe}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMauXe(itemValue)
                                }>
                                <Picker.Item label="Xe số" value="Xe số" />
                                <Picker.Item label="Tay ga" value="Tay ga" />
                                <Picker.Item label="PKL" value="PKL" />
                            </Picker>
                        </View>
                    </View>
                    <View >
                        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}>Loại xe </Text>
                        <View style={{width:"90%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center',justifyContent:'center'}}>
                            <Picker
                                selectedValue={LoaiXe}
                                onValueChange={(itemValue, itemIndex) =>
                                    setLoaiXe(itemValue)
                                }>
                                <Picker.Item label="Honda" value="Honda" />
                                <Picker.Item label="Yamaha" value="Yamaha" />
                                <Picker.Item label="BMW" value="BMW" />
                                <Picker.Item label="Suzuki" value="Suzuki" />
                                <Picker.Item label="SYM" value="SYM" />
                                <Picker.Item label="Ducati" value="Ducati" />
                                <Picker.Item label="Khác" value="Khác" />
                            </Picker>
                        </View>
                    </View>
                    <View >
                        <Text style={{fontSize:20,marginTop:10,marginLeft:15}}> Màu sắc</Text>
                        <TextInput 
                            style={{width:"90%",height:40,backgroundColor:"#D9D9D9",borderRadius:8,borderWidth:1,alignSelf:'center'}}
                            placeholder="name vehicle"
                            value={Color}
                            onChangeText={setColor}
                        />
                    </View>                
                </View>
                <TouchableOpacity 
                    onPress={handleAddNewVehicle}
                    disabled={!isFormValid()} // Vô hiệu hóa nếu form không hợp lệ
                    style={{width:"90%", height:50,backgroundColor: isFormValid() ? "#FF3300" : "#cccccc",alignSelf:'center',borderRadius:8,flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, }}
                >
                    <IconButton icon="plus-circle-outline" iconColor="white" size={24}/>
                    <Text style={{color:"white",fontSize:18}}>Thêm xe mới</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
    export default AddNewVehicle