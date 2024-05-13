import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { activeBgColor, activeTextColor, inActiveBgColor, inActiveTextColor } from "../../android/app/src/constants";
import { FormControl, Input, Stack, Toast } from "native-base";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";


const Register = () => {
    const [activeTab, setActiveTab] = useState('s');
    const InitialRegisterInfo = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    }         
    const [registerInfo, setRegisterInfo] = useState(InitialRegisterInfo)

    const updateRegisterInfo = (name, val) => {
        setRegisterInfo({
            ...registerInfo,
            [name]: val
        })
    }

    const handleRegister = async () => {
        try {
            if (registerInfo.email != '' && registerInfo.password != "") {
                const status = await auth().createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);
                const uid = status.user.uid
                await firestore()
                    .collection('user')
                    .add(registerInfo)
                Toast.show({
                    title: 'SUCCESS',
                    description: "Account created successfully",
                    placement: 'bottom',
                    variant: 'solid'
                })
            } else {
                Toast.show({
                    title: 'ERROR',
                    description: registerInfo.email == '' ? "Email required" : "Password Required",
                    placement: 'bottom',
                    variant: 'solid'
                })
            }
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                Toast.show({
                    title: 'ERROR',
                    description: "That email address is already in use!",
                    placement: 'bottom',
                    variant: 'solid'
                })

            }

            if (err.code === 'auth/invalid-email') {
                Toast.show({
                    title: 'ERROR',
                    description: "That email address is invalid!",
                    placement: 'bottom',
                    variant: 'solid'
                })
            }

            console.error(err);
        }

    }
    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
                <View>
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>First Name</FormControl.Label>
                            <Input type="text" placeholder="First Name" onChangeText={(val) => updateRegisterInfo("firstName", val)} />
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>Last Name</FormControl.Label>
                            <Input type="text" placeholder="Last Name" onChangeText={(val) => updateRegisterInfo("lastName", val)} />
                        </Stack>
                    </FormControl>
                 
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>Mobile Number</FormControl.Label>
                            <Input type="text" placeholder="Mobile Number" onChangeText={(val) => updateRegisterInfo("mobileNumber", val)} />
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>Email</FormControl.Label>
                            <Input type="text" keyboardType="email-address" placeholder="Email Id" onChangeText={(val) => updateRegisterInfo("email", val)} />
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" placeholder="password" onChangeText={(val) => updateRegisterInfo("password", val)} />
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack mx="4" my="4">
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input type="password" placeholder="confirm password" onChangeText={(val) => updateRegisterInfo("confirmPassword", val)} />
                        </Stack>
                    </FormControl>
                    <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                        <TouchableOpacity style={{ padding: 12, borderWidth: 1, borderRadius: 8, borderColor: activeBgColor, backgroundColor: activeBgColor }} onPress={() => handleRegister()}>
                            <View>
                                <Text style={{ textAlign: 'center', color: activeTextColor }}>REGISTER</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        </ScrollView>
    )
}

export default Register