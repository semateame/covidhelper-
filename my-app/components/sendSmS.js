import React, { useEffect, useState } from "react"
import { View, Button } from "react-native"
import * as SMS from 'expo-sms';

const Sendmessage = ({ route: { params } }) => {
    const { phone } = params
    const num = phone.toString()
    console.log(typeof (num));

    const messageHandler = async () => {
        try{
        const { result } = await SMS.sendSMSAsync(
            num,
            'Hi'
        );
        }
        catch(e){
            console.log(e);
        }
    }
    return (
        <View>
            <Button
                title="Sendmessage"
                onPress={messageHandler}
            />


        </View>
    )
}

export default Sendmessage