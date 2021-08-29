import React, { useState, useEffect} from 'react';
import { Button, Image, Text, TouchableOpacity, StyleSheet, FlatList, View, ActivityIndicator, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Screen from '../Utilities/Screen';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import filter from 'lodash.filter';
import ItemDetails from './ItemDetails';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {HOST} from '../Hosts/HOST_WITH_PORT'



function FoundScreen({route, navigation}) {

    const {currentID} = route.params
    console.log(currentID)

    const Item = ({item}) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ItemDetails', {
            itemId: item.id,
            name_on_the_item: item.name_on_the_item,
            category_item: item.category_item,
            item_picture: item.item_picture,
            contact: item.contact,
            city_item: item.city_item,
            date_lost: item.date_lost,
            description_item: item.description_of_item,
            picking_location: item.picking_location,
        }) }>
            <View style={styles.items} >
                <Image source={{uri: item.item_picture}} style={styles.image}/>
                <Text style={styles.text}>{item.name_on_the_item}</Text>
                <Text style={styles.category}>{item.category_item}</Text>
            </View> 
        </TouchableWithoutFeedback>
    )


    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        fetch(`${HOST}/founderapp/postfound/?expand=category,city_lost`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(response => response.json())
        .then(results => {
            setData(results);
            setFullData(results);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false)
            setError(err);
        });
    }, []);


    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="dodgerblue"/>
            </View>
        )
    }

    if(error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18}}>
                    Error fetching data... Check your network connection!
                </Text>
            </View>
        );
    }


    function renderHeader() {

        const handleSearch = text => {
            const formattedQuery = text.toLowerCase();
            const filteredData = filter(fullData, item => {
                return contains(item, formattedQuery)
            });
            setData(filteredData);
            setQuery(text);
        }

        const contains = ({name_on_the_item, category_item}, query) => {

            if (name_on_the_item.includes(query) || category_item.includes(query)) {
                return true;
            }
            return false;
        };

        return (
            <View style={styles.filter}>
                <TextInput 
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={query}
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search"
                    style={styles.searchtext}/>
            </View>
        );
    }

    const renderItem = ({item}) => 
       <View style={styles.allItems}>
          <Item item={item}/> 
       </View> 

    
       

    return (    
        <Screen>
            <FlatList 
               ListHeaderComponent={renderHeader}
               data={data}
               renderItem={renderItem} 
               keyExtractor={item => item.id.toString()}
            />
            <TouchableWithoutFeedback style={styles.material} onPress={() => navigation.navigate('AddItemFound', {currentID: currentID})}>
                <MaterialCommunityIcons name="plus-circle-outline" size={70} color={colors.blue} style={styles.icon} />
            </TouchableWithoutFeedback>
        </Screen>
    );
}

const styles = StyleSheet.create({
    allItems: {
        backgroundColor: colors.logres,
        paddingHorizontal: '5%',
    },
    category: {
        fontStyle: 'italic'
    },
    filter: {
        backgroundColor: colors.white,
        padding: 10,
        marginVertical: 10,
        borderRadius: 20,
        marginHorizontal: "5%",
    },
    header: {
        padding: '3%',
        marginTop: 20,
        alignItems: 'center'
    },
    icon: {
        // backgroundColor: colors.white,
        paddingLeft: '40%',
        fontWeight: 'bold'
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: 'contain',
        flex: 1,
    },
    items: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30,
        backgroundColor: colors.white,
    },
    material: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    searchtext: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        fontWeight: 'bold',
    },
    text: {
        paddingTop: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
})

export default FoundScreen;
