import React, {useState} from 'react';
import { Button, Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import AppTextInput from '../Utilities/AppTextInput';
import AppButton from '../Utilities/Button';
import Screen from '../Utilities/Screen'
import colors from '../config/colors'
import {HOST} from '../Hosts/HOST_WITH_PORT'

function RegisterScreen({navigation}) {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [name, setName] = useState('')
    const [location, setLocation] = useState("");
    const [userID, setUserID] = useState()

    function handleRegister() {

        if(password==newPassword){   

            fetch(`${HOST}/account/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    name: name,
                    location: location,
                    profile_picture: null,
                    password: password,
                })
            }).then(resp => resp.json())
            .then(response => {
                setUserID(response['id'])
                currentUserID = userID;
                // console.log(currentUserID)
                navigation.navigate('Login')
            })
            .catch(error => console.log(error))
        }
        else {
            console.log('password incorrect!')
        }

        
    }

    return (
        // <ScrollView>
            <Screen style={styles.screen}>
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.png')} style={styles.logoimage}/>
                    <Text style={styles.logotext}>find loss stuff here</Text>
                </View>
                <View style={styles.fields}>
                    <AppTextInput icon="phone" onChangeText={phone => setPhone(phone)} value={phone} placeholder="phone number"/>
                    <AppTextInput icon="contacts" onChangeText={name => setName(name)} value={name} placeholder="full name"/>
                    <AppTextInput icon="home-map-marker"  onChangeText={location => setLocation(location)} value={location} placeholder="current location"/>
                    <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={password => setPassword(password)} value={password} placeholder="password"/>
                    <AppTextInput icon="lock" secureTextEntry textContentType='password' onChangeText={newPassword => setNewPassword(newPassword)} value={newPassword} placeholder="confirm password"/>
                    <AppButton title="Register"  color='dodgerblue' onPress={handleRegister}/>
                    <View style={styles.downview}>
                        <Text style={styles.login} onPress={() => navigation.navigate('Login')}>Login here</Text>
                    </View>
                </View>
            </Screen>
        // {/* </ScrollView>  */}
        
    );
}

const styles = StyleSheet.create({
    downview: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    header: {
        marginTop: '2%'
    },
    logoimage: {
        height: 70,
        width: 70,
        marginBottom: 10,
        alignSelf: 'center',
    },
    logotext: {
        fontWeight: 'normal'
    },
    fields: {
        width: '100%',
        position: 'absolute',
        top: 150,
    },
    login: {
        // paddingLeft: '70%',
        paddingTop: 10,
        fontSize: 18,
    },
    screen: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.logres,
        // backgroundColor: '#F0EBCC'
    }
})

// export let currentUserID;

export default RegisterScreen;