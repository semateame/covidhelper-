import React, { useState, useEffect } from "react"
import { View, Button, StyleSheet, Dimensions, SafeAreaView } from "react-native"
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import Display from "./displayvolunteers"
import { useNavigation } from '@react-navigation/native';
import AuthContext from "./context"

const Home = () => {

    const { token } = React.useContext(AuthContext)
    const navigation = useNavigation()

    const [place, setlocation] = useState(null);
    const [volLocation, setvolLocation] = useState([])
    const [refresh, setrefresh] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                }

                let location = await Location.getCurrentPositionAsync({});
                console.log("====>", location);
                setlocation(location);
            }
            catch (e) {
                console.log(e);
            }
        })();
    }, []);


    useEffect(() => {
        getvolLocation()
    }, [])

    /**
     * gets all the volunteers which are online 
     */
    const getvolLocation = async () => {
        try {
            let result = await fetch(`https://covid-volunteers.herokuapp.com/seach`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                }
            })
            let res = await result.json()

            setvolLocation(res)


        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>


            {place && <MapView
                showsUserLocation
                style={[styles.mapstyle, styles.box]}
                initialRegion={{
                    latitude: parseInt(place.coords.latitude),
                    longitude: parseInt(place.coords.longitude),
                    latitudeDelta: 1.922,
                    longitudeDelta: 1.421,
                }}
            >
                <Marker
                    draggable
                    coordinate={{
                        latitude: parseInt(place.coords.latitude),
                        longitude: parseInt(place.coords.longitude)
                    }}
                    title="MIU"
                    description="Masters in Software Development"
                    pinColor="blue"
                />
                {volLocation.map((item, index) => {
                    return (<  Marker
                        key={index}
                        onPress={() => {
                            navigation.navigate("message", { phone: item.phone })
                        }}
                        draggable
                        coordinate={{
                            latitude: parseInt(item.location.latitude),
                            longitude: parseInt(item.location.longitude)
                        }}
                        title="MIU"
                        description="Masters in Software Development"
                        pinColor="red"

                    />
                    )
                })}


            </MapView>
            }
            <Display arr={volLocation}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
                mapstyle: {
                width: 800,//Dimensions.get('window').width,
        height:400 //Dimensions.get('window').height
    }
})
export default Home
