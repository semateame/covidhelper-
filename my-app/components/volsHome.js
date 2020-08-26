import React, { useEffect, useState } from "react"
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native"

import { Switch } from 'react-native-paper';
import AuthContext from "./context"

const Volunteers = () => {
    // const { signOut } = React.useContext(AuthContext)
    const { id, token } = React.useContext(AuthContext)

    const [status, setstatus] = React.useState(false)
    const [location, setLocation] = useState(null);



    useEffect(() => {
        updateLocation()
    }, [status])

    const updateLocation = async () => {

        if (status) {
            let data = {
                id: id
            }

            try {
                await fetch(`https://covid-volunteers.herokuapp.com/location`, {
                    method: 'PATCH',
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)


                })
            }
            catch (e) {
                console.log(e)
            }

        }
        else {
            let data = {
                id: id,
                userstatus: 0
            }
            try {
                await fetch(`https://covid-volunteers.herokuapp.com/unsetlocation`, {
                    method: 'PATCH',
                    headers: {
                        'x-auth-token': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)


                })
            }
            catch (e) {
                console.log(e);
            }

        }

    }
    const _onToggleSwitch = () => {
        setstatus(!status)
    }



    return (
        <View>
            {/* <Text>
                This is Volunteers home
        </Text> */}

            {/* <TouchableOpacity
                onPress={() => setstatus(!status)}
                style={styles.button} >
                <Text style={styles.buttonText}> on/off </Text>

            </TouchableOpacity> */}
            <Switch
                value={status}
                onValueChange={_onToggleSwitch}
            />

        </View>
    )
}
export default Volunteers





//      const Switchs = () => {

//     const [isSwitchOn, setState] = useState(false)


//     const _onToggleSwitch = () => setState(() => (!isSwitchOn));


//     return (
//         <Switch
//             value={isSwitchOn}
//             onValueChange={this._onToggleSwitch}
//         />
//     );

// }
const styles = StyleSheet.create({


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
    }
})