import React, { useState, useEffect } from "react"
import { View, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
const Display = ({ arr }) => {
    const navigation = useNavigation()


    return (

        <ScrollView >
            {arr.map((item, index) => {
                return (
                    <View
                        style={styles.rowContainer}
                        key={index}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("message", { phone: item.phone })
                            }}
                        >

                            <Text style={styles.name}>
                                {item.phone}
                            </Text>

                        </TouchableOpacity>
                        <Text style={styles.description}>
                            {item.email}
                        </Text>


                    </View>

                )
            })}
        </ScrollView>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});
export default Display