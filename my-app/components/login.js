import React from "react"
import { useEffect, useState } from "react"
import { View, TouchableOpacity, Button, Text, StyleSheet, KeyboardAvoidingView, Image } from "react-native"
import { TextInput, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import AuthContext from "./context"


const Login = () => {
    const image = { uri: "https://www.wowamazing.com/wp-content/uploads/2015/11/young-man-elderly-woman-visiting-1080937-print.jpg" }
    const [isrequired, setIsrequired] = useState(true)
    const navigation = useNavigation()
    const { signIn, exist, isValid } = React.useContext(AuthContext)

    const [User, setUser] = useState({ email: "", password: "" })


    const Signup = () => {
        navigation.navigate("signup")
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={image} style={styles.image} />


            <TextInput
                autoFocus="true"
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={(email) => setUser({ ...User, email: email })}
                value={User.email}
            >
            </TextInput>
            <TextInput
                secureTextEntry="true"
                placeholder="password"
                onChangeText={(password) => setUser({ ...User, password: password })}
                value={User.password}
            ></TextInput>
            {!exist && <Text style={{ color: "red" }}>User doesn't exist </Text>}
            {!isValid && <Text style={{ color: "red" }}>All fields required</Text>}

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    { User ? signIn(User) : setValid(false) }

                }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={{ color: "blue" }}> You dont have account ? Signup </Text>


            <TouchableOpacity
                style={styles.button}
                onPress={Signup}
            >
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView >
    )

}

export default Login


const styles = StyleSheet.create({
    container: {
        flex: 1,
        

    },

    button: {
        height: 50,
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