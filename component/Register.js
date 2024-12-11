import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, HelperText, Text, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState("Tran Duc Long");
    const [email, setEmail] = useState("itlong30102003@gmail.com");
    const [password, setPassword] = useState("123456");
    const [passwordConfirm, setPasswordConfirm] = useState("123456");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const checkFullName = () => fullName.length > 0;
    const checkEmail = () => {
        var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    };
    const checkPassword = () => password.length >= 6;
    const checkPasswordConfirm = () => password === passwordConfirm;

    // Firestore collection reference
    const cUSERS = firestore().collection("USERS");

    const createNewAccount = () => {
        cUSERS.doc(email).get()
            .then((u) => {
                if (u.exists) {
                    Alert.alert(`Tài khoản ${email} đã tồn tại`);
                } else {
                    auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            cUSERS.doc(email)
                                .set({
                                    fullName,
                                    email,
                                    avatar:"",
                                    phone:"",
                                    gender:"",
                                    address:"",
                                    lever: "0",
                                    birthday: new Date(),
                                    role: "customer"
                                })
                                .then(() => navigation.navigate("login"));
                        })
                        .catch((e) => console.log(e));
                }
            });
    };

    return (
        <View style={style.container}>
            <Text style={{color:"black",
                fontSize: 24,
                fontWeight:"bold",
                textAlign:'center',
                paddingBottom:20,}}
            >Create New Account</Text>
            <Text 
            style={{color:"gray",
                fontSize: 20,
                textAlign:'center',
                paddingBottom:30,}}
            >Create an account to continue</Text>
            
            

            <Text style={{marginLeft:10}}>Email</Text>
            <TextInput 
                value={email}
                placeholder="Input Email"
                mode="outlined"
                style={style.textInput}
                onChangeText={setEmail}
                left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!checkEmail()}>
                Sai địa chỉ email
            </HelperText>

            <Text style={{marginLeft:10}}>Full Name</Text>
            <TextInput 
                value={fullName}
                placeholder="Input FullName"
                mode="outlined"
                style={style.textInput}
                onChangeText={setFullName}
                left={<TextInput.Icon icon="account"/>}
            />
            <HelperText type="error" visible={!checkFullName()}>
                Full Name không được để trống
            </HelperText>
            
            <Text style={{marginLeft:10}}>Password</Text>
            <TextInput 
                value={password}
                placeholder="Input Password"
                style={style.textInput}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                mode="outlined"
                left={<TextInput.Icon icon="key" />}
                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
            />
            <HelperText type="error" visible={!checkPassword()}>
                Password có ít nhất 6 ký tự
            </HelperText>
            <Text style={{marginLeft:10}}>Confirm Password</Text>
            <TextInput 
                value={passwordConfirm}
                placeholder="Input Password Confirm"
                style={style.textInput}
                onChangeText={setPasswordConfirm}
                secureTextEntry={!showPasswordConfirm}
                mode="outlined"
                left={<TextInput.Icon icon="key" />}
                right={<TextInput.Icon icon="eye" onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} />}
            />
            <HelperText type="error" visible={!checkPasswordConfirm()}>
                Password Confirm không trùng
            </HelperText>
            
            <Button 
                onPress={createNewAccount}
                disabled={!checkEmail() || !checkPassword() || !checkFullName() || !checkPasswordConfirm() } 
                mode="contained-tonal"
            >
                Sign Up
            </Button>

            <View style={style.login}>
                <Text>Do you have an account?</Text>
                <Button onPress={() => navigation.navigate("login")}>
                    Login
                </Button>
            </View>
        </View>
    );
};

export default Register;

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#f5f5f5",
    },
    textInput:{
        marginLeft:10,
        marginRight:10,
        height:50,
        width:'95%'
    },
    login:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'

    },
});
