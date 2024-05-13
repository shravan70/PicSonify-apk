import { Text, TouchableOpacity, View } from "react-native"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { activeBgColor, activeTextColor } from "../../android/app/src/constants";
import { useEffect, useState } from "react";
import { Image } from "native-base";
import { pathOr } from 'ramda'
import axios from "axios";
import { BASE_URL } from "../config";
import Tts from 'react-native-tts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Dashboard = (props) => {

    const [response, setResponse] = useState({});
    const [processing, setProcessing] = useState(false)
    const [caption, setCaption] = useState("")
    const navigation = useNavigation()
    const handleCamera = async () => {
        const result = await launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeExtra: true,
            includeBase64: true
        }, setResponse);
    }

    useEffect(() => {
        const image = pathOr("", ['assets', '0', 'base64'], response)
        if (image != "") {
            setCaption("")
            imageCaptioning(image)
        }

    }, [response])
    const imageCaptioning = async (image) => {
        try {
            setProcessing(true)
            Tts.speak("Please wait..., Identifying the object");
            const result = await axios.post(BASE_URL + '/predict', { image })
            setProcessing(false)
            setCaption(result.data.caption)
            Tts.speak(result.data.caption);
        } catch (err) {
            alert(err.message)
            setProcessing(false)
            Tts.speak("Please wait..., Error occured.. Retry after sometime");
            setCaption("Error occured.. Retry")
        }
    }
    return (
        <View style={{ padding: 16 }}>
            <View style={{ marginVertical: 24 }}>
                <View style={{ marginHorizontal: 24, marginTop: 24 }}>
                    <TouchableOpacity style={{ padding: 12, borderWidth: 1, borderRadius: 8, borderColor: activeBgColor, backgroundColor: activeBgColor }} onPress={() => handleCamera()}>
                        <View>
                            <Text style={{ textAlign: 'center', color: activeTextColor }}>Open Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center' }}>
                        {pathOr("", ['assets', '0', 'base64'], response) && (

                            <Image source={{ uri: `data:image/jpeg;base64,${pathOr("", ['assets', '0', 'base64'], response)}` }} style={{ width: '80%', height: '80%' }} />


                        )}
                    </View>
                    {processing && (
                        <Text style={{ color: 'black', textAlign: 'center' }}>Prediction In Progress. Please Wait ....</Text>
                    )}
                    {caption && (
                        <Text style={{ color: 'black', textAlign: 'center' }}>{caption}</Text>
                    )}
                    <TouchableOpacity style={{ padding: 12, borderWidth: 1, borderRadius: 8, borderColor: activeBgColor, backgroundColor: activeBgColor }} onPress={async() => {await AsyncStorage.removeItem('userId'); navigation.navigate('Login')}}>
                        <View>
                            <Text style={{ textAlign: 'center', color: activeTextColor }}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Dashboard