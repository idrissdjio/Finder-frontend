import React from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function Box({color="dodgerblue", text, onpress}) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor:color}]} onPress={onpress} >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        height: 140,
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 60,
    },
    text: {
        fontSize: 30,
        fontStyle: 'italic',
        color: '#fff',
        fontWeight: 'bold'
    },
})

export default Box;