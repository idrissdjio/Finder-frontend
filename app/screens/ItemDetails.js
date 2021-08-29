import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native'
import colors from '../config/colors';

const item = {
    imageSource: require('../../assets/me.png'),
    name_on_the_item: 'Chris kenfack',
    description_item: 'a tall nigga with a brown hair, blue eyes, bearless a tall nigga with a brown hair, blue eyes, bearless',
    contact: '677582015',
    date_lost: '2021-03-04T12:33:00Z',
    create_on: '2021-05-10T14:53:40.397711Z',
    city_item: 'Bertoua',
    category_item: 'ID_CARD',
}

function ItemDetails({route, navigation}) {

    // const itemId = JSON.stringify(navigation)
    // print(itemId)

    const API_ENDPOINT = 'http://192.168.56.1:8000'

    const {itemId, category_item, name_on_the_item, item_picture, description_item, city_item, date_lost, contact, picking_location=''} = route.params
    console.log(item_picture)


    return (
        <ScrollView>
            <View style={styles.items} >
                <Image source={{uri: item_picture}} style={styles.image}/>
                <Text style={styles.text}><Text style={styles.textAttribute}>Name on Item:  </Text>{name_on_the_item}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>Category:  </Text>{category_item}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>description:   </Text>{description_item}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>City Lost: </Text>{city_item}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>contact:   </Text>{contact}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>Lost date: </Text>{date_lost}</Text>
                <Text style={styles.text}><Text style={styles.textAttribute}>Picking Location: </Text>{picking_location}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    category: {
        fontStyle: 'italic'
    },
    image: {
        width: "100%",
        height: 300,
        // resizeMode: 'contain',
        marginBottom: 20,
        borderRadius: 20,
    },
    items: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30,
        backgroundColor: colors.white,
        padding: 10,
    },
    text: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: colors.logres,
        width: '100%',
        marginBottom: 8,
        borderRadius: 10,
    },
    textAttribute: {
        fontWeight: 'normal',
        fontStyle: "italic",
        color: colors.blue
        // marginLeft: 20
    }
})

export default ItemDetails;