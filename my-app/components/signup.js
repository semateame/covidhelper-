import React from "react"
import { useState } from "react"
import { View, TouchableOpacity, Button, Text, StyleSheet, KeyboardAvoidingView, Image } from "react-native"
import { TextInput, Card } from 'react-native-paper';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import AuthContext from './context'

const Signup = () => {
    const image = { uri: "https://www.wowamazing.com/wp-content/uploads/2015/11/young-man-elderly-woman-visiting-1080937-print.jpg" }

    
    const navigation = useNavigation()
    const [user, setuser] = useState({
        email: "",
        password: "",
        phone: null,
        role: "",
        status: 0


    })
    const [isvalid, setIsvalid] = useState(true)
    const [isrequired, setisrequired] = useState(true)
    const [UserLocation, setLocation] = useState({})
    const [validphone, setphone] = useState(false)

    React.useEffect(() => {
        (async () => {
            try{
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
        catch(e){
            console.log(e);
        }
        })();
    }, []);


/** 
 * sends post request to the server 
*/
    const submitHandler = async () => {
        const userLocation = {
            latitude: UserLocation.coords.latitude,
            longitude: UserLocation.coords.longitude,
        }
        let data = { ...user, userLocation }

        try {
            let result = await fetch(`https://covid-volunteers.herokuapp.com/signup`, {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)


            })
            let res = await result.json()
            if (res.msg === "User already exists") {
                setIsvalid(false)

            }

            else if (res.msg === "All fields are required") {
                setisrequired(false)

            }
            else {

                navigation.navigate("login")
                setIsvalid(true)
                setisrequired(false)
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        }
    }





    return (

        <KeyboardAvoidingView style={styles.container}>
            <Image
                source={image}
                style={styles.image}
            >

            </Image>

            <TextInput
                autoFocus="true"
                placeholder="Email"
                onChangeText={(email) => setuser({ ...user, email: email })}
                value={user.email}
            >

            </TextInput>
            <TextInput
                secureTextEntry="true"
                placeholder="password"
                onChangeText={(password) => setuser({ ...user, password: password })}
                value={user.password}
            >

            </TextInput>
            <TextInput
                placeholder="Role"
                onChangeText={(role) => setuser({ ...user, role: role })}
                value={user.role}
            >

            </TextInput>
            <TextInput
                maxLength={10}
                placeholder="xxx-xxx-xxxx"
                onChangeText={(phone) => {
                    if (parseInt(phone) && phone.length == 10) {
                        setuser({ ...user, phone: phone })
                        setphone(true)
                    }
                    else setphone(false)
                }
                }
                value ={user.phone}
            >

            </TextInput>
            {!validphone && <Text style={{ color: "red" }}>Enter valid PhoneNumber</Text>}
            {!isvalid && <Text style={{ color: "red" }}>User already exists</Text>}
            {!isrequired && <Text style={{ color: "red" }}> All fields are required </Text>}
            <TouchableOpacity
                style={styles.button}
                onPress={submitHandler}
            >
                <Text style={styles.buttonText}> Signup</Text>

            </TouchableOpacity>

        </KeyboardAvoidingView>


    )
}

const styles = StyleSheet.create({
    container: {
          flex:1,
       // justifyContent: 'center',

    },

    button: {
        height: 50,
        // flexDirection: 'row',
        backgroundColor: 'purple',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#111',
        alignSelf: 'center'
    },
    image: {

        height: 200,
        width: 400,

    }

})
export default Signup