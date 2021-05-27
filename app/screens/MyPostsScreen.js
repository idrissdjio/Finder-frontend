import React from 'react';
import { Button, Text } from 'react-native';
import Screen from '../Utilities/Screen';

function MyPostsScreen({navigation}) {
    return (
        <Screen>
            <Text>My Posts List</Text>
            <Button
                title="go back"
                onPress={() => navigation.push('MyPosts')}/>
            <Button title="come back" onPress={() => navigation.navigate('Home')} />
        </Screen>
    );
}

export default MyPostsScreen;