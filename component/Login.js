import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../context";
import auth from '@react-native-firebase/auth';
const Login=({navigation})=>{
    //use store
    const [controller, dispatch] = useMyContextController();
    //get info User form store
    const {userLogin} = controller
    const [email, setEmail] = useState("itlong30102003@gmail.com")
    const [password, setPassword] = useState("123456")
    const [showPassword, setShowPassword] = useState(false)
    
    const checkEmail = ()=> {
        var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return regex.test(email)
    }

    const checkPassword  = ()=>password.length >=6
    
    const handleLogin = () =>{
       login(dispatch,email,password) 
    }
    useEffect(()=>{
        if(userLogin===null)
            navigation.navigate("login")
        else if(userLogin.role ==="technician")
        {
            console.log('technician login')
            navigation.navigate("tabtechnician")
        }
        else if(userLogin.role ==="customer")
        {
            console.log('customer login')
            navigation.navigate("tabcustomer")
        }
            
    },[userLogin]);
    // Xử lý quên mật khẩu
    const handleForgotPassword = () => {
        if (!checkEmail()) {
            Alert.alert("Email không hợp lệ");
            return;
        }   
        auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert(`Email khôi phục mật khẩu đã được gửi tới ${email}`);
            })
            .catch(error => {
                console.log(error);
                Alert.alert("Có lỗi xảy ra, vui lòng thử lại");
            });
    };
    
    return(
        <View style={style.container}>
            <Text 
            style={{color:"black",
                fontSize: 24,
                fontWeight:"bold",
                textAlign:'center',
                paddingBottom:20,}}
            >Let's Sign You In</Text>
            <Text 
            style={{color:"gray",
                fontSize: 20,
                textAlign:'center',
                paddingBottom:30,}}
            >Wellcome back</Text>
            
            <Text style={{marginLeft:10}}>Email</Text>
            <TextInput
                value={email}
                placeholder="Input Email"
                mode="outlined"
                style={style.textInput}
                onChangeText={setEmail}
                left={<TextInput.Icon icon = {'email'}/>}
            />
            <HelperText type="error" visible={!checkEmail()}>
                Sai dia chi email
            </HelperText>

            <Text style={{marginLeft:10}}>Password</Text>
            <TextInput 
                value={password}
                placeholder="Input Password"
                style={style.textInput}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                mode="outlined"
                left={<TextInput.Icon icon={'key'}/>}
                right={<TextInput.Icon icon={"eye"} onPress={()=>setShowPassword(!showPassword)}/>}
            />
            <Button style={{alignItems:"flex-end"}}mode="text" onPress={handleForgotPassword}>
                Forgot Password?
            </Button>
            <HelperText type="error" visible={!checkPassword()}>
                Password co it nhat 6 ky tu
            </HelperText>
            
            
            
            <Button disabled={!checkEmail() || !checkPassword()} mode="contained-tonal" 
                onPress={handleLogin} 
            >
                Login
            </Button>
            
            <View style={style.register}>
                <Text>You don't have account!</Text>
                <Button
                    onPress={()=> navigation.navigate("register")}
                
                >Register new account</Button>
            </View>
            
        </View>
    )
}
export default Login
const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding: 10,
    },
    textInput:{
        marginLeft:10,
        marginRight:10,
        height:50,
        width:'95%'
    },
    register:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'

    },

})