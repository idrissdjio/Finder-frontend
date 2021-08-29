import React, { useEffect, useState } from 'react';
import { Text, Button, Image, Platform, StyleSheet, TouchableWithoutFeedback, View, TextInput, ScrollView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from '../Utilities/Screen';
import colors from '../config/colors';
import AppTextInput from '../Utilities/AppTextInput';
import AppButton from '../Utilities/Button';
import { HOST } from '../Hosts/HOST_WITH_PORT';
import {currentUserID} from './AccountScreen'



function AddItemLost({route, navigation}) {

    const {currentID} = route.params
    // console.log(currentID)

    const [image, setImage] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState();
    const [category, setCategory] = useState('');

    function handlePost() {

        const formData = new FormData();

        formData.append("item_picture", {
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg'
        });
        formData.append("name_on_the_item", name);
        formData.append("description_of_item", description);
        formData.append('contact', contact);
        formData.append("city_item",city);
        formData.append("category_item", category);
        formData.append("user_profile", currentID);
        

        fetch(`${HOST}/searchapp/lost_items/?expand=category,city_lost`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'multipart/form-data'},
            body: formData
        }).then(response => response.json())
        .then(result => {
            // console.log(result)
            navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

 

    useEffect(() => {
        (async () =>{
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if
                (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions')
                }
            }
        })();
    }, []);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })


        if(!result.cancelled){
            setImage(result.uri)
            console.log(image)
        }
    }

    return (
        <ScrollView>
            <Screen style={styles.screen}>
                <TouchableWithoutFeedback onPress={pickImage}>
                    <View style={styles.imageContainer}>
                        {image && <Image source={{uri: image}} style={styles.imageContainer}/>}
                    </View>
                </TouchableWithoutFeedback>
                <AppTextInput icon="smart-card" onChangeText={name => setName(name)} value={name} placeholder="name on item..."/>
                <AppTextInput icon="card-account-details" onChangeText={description => setDescription(description)} value={description} placeholder="description..." multiline={true}/>
                <AppTextInput icon="contacts" onChangeText={contact => setContact(contact)} value={contact} placeholder="my contact..."/>
                <AppTextInput icon="city" onChangeText={city => setCity(city)} value={city} placeholder="Lost City..."/>
                <AppTextInput icon="calendar-month" onChangeText={date => setDate(date)} value={date} placeholder="Lost date..."/>
                <AppTextInput icon="contacts" onChangeText={category => setCategory(category)} value={category} placeholder="category: ID_CARD,book,phone..."/>
                <AppButton title="POST" color={colors.dodgerblue} onPress={handlePost}/>
            </Screen>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    icon: {
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: colors.background,
        borderRadius: 40,
    },
    screen: {
        padding: 5,
        backgroundColor: colors.logres
    }
})

export default AddItemLost;


// JSON.stringify({
//     item_picture: image,
//     name_on_the_item: name,
//     description_of_item: description,
//     contact: contact,
//     city_lost: 1,
//     date_lost: "2021-05-06T04:24:00Z",
//     category: 1,
//     create_on: '',
//     user_profile: 1,
//     category_item: category,
//     city_item: city
    
// })