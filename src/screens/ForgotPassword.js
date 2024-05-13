import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { activeBgColor, activeTextColor, inActiveBgColor, inActiveTextColor, logo } from "../../android/app/src/constants";
import { FormControl, Input, Stack, Toast, WarningOutlineIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
const ForgotPassword = () => {
    const [activeTab, setActiveTab] = useState('students');
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const handleForgotPassword = async () => {
       try{
        await auth().sendPasswordResetEmail(email)
        Toast.show({
            title:'SUCCESS',
            description: "Password Reset Link sent your registered Email Id",
            placement:'bottom',
            variant:'solid'
        })
        navigation.navigate('Login')
       } catch(err){
        Toast.show({
            title:'ERROR',
            description: err.message,
            placement:'bottom',
            variant:'solid'
        })
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
                <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => handleForgotPassword()} style={{ padding: 12, borderWidth: 1, borderRadius: 8, borderColor: activeBgColor, backgroundColor: activeBgColor }}>
                        <View>
                            <Text style={{ textAlign: 'center', color: activeTextColor }}>FORGOT PASSWORD</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ForgotPassword