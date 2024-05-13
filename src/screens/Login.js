import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { activeBgColor, activeTextColor } from "../../android/app/src/constants";
import { FormControl, Input, Stack, Toast, WarningOutlineIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const handleLogin = async () => {
        try {
            const status = await auth().signInWithEmailAndPassword(email, password);
            const userId = status.user.uid;
            const data = await firestore().collection('user').where("uid", "==", userId).get()
            console.log(data._docs)
            if (userId) {
                await AsyncStorage.setItem('userId', userId);
                navigation.navigate("Dashboard", { userId })
            } else {
                Toast.show({
                    title: 'ERROR',
                    description: "Invalid credentials",
                    placement: 'bottom',
                    variant: 'solid'
                })
            }

        } catch (err) {
            Toast.show({
                title: 'ERROR',
                description: err.message,
                placement: 'bottom',
                variant: 'solid'
            })
        }
    }

    useEffect(() => {
        isLoggedIn()
    },[])

    const isLoggedIn = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId !== null) {
                navigation.navigate("Dashboard", { userId })
            }
            return false
          } catch (e) {
            return false
          }
    }
    return (
        <View style={{ padding: 16 }}>
            <View>
                <FormControl isRequired>
                    <Stack mx="4" my="4">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input type="text" keyboardType="email-address" placeholder="Email Id" onChangeText={(val) => setEmail(val)} />
                        <FormControl.HelperText>
                            Must be valid email.
                        </FormControl.HelperText>
                    </Stack>
                </FormControl>
                <FormControl isRequired>
                    <Stack mx="4" my="4">
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" placeholder="password" onChangeText={(val) => setPassword(val)} />
                        <FormControl.HelperText>
                            Must be atleast 6 characters.
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => handleLogin()} style={{ padding: 12, borderWidth: 1, borderRadius: 8, borderColor: activeBgColor, backgroundColor: activeBgColor }}>
                        <View>
                            <Text style={{ textAlign: 'center', color: activeTextColor }}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Register') }} style={{ marginVertical: 24 }}>
                <Text style={{ textAlign: 'center', color: 'black' }}>Dont Have Account? Register Here</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} style={{ marginVertical: 24 }}>
                <Text style={{ textAlign: 'center', color: 'black' }}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login