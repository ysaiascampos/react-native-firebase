import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Value } from 'react-native-reanimated';
import firebase from '../database/firebase';
const CreateUser = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value });
    }
    const safeNewUser = async () => {
        if(state.name.trim() ===""){
            alert('please provide a name');
            return;
        }
        if(state.email.trim() ===""){
            alert('please provide a email');
            return;
        }
        if(state.phone.trim() ===""){
            alert('please provide a phone');
            return;
        }
        try {
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone
            });
            props.navigation.navigate('UsersList');
        } catch (error) {
            throw(error);
        }
        
    }

    return ( 
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Button title="Safe User" onPress={() => safeNewUser() } />
            </View>
        </ScrollView>
    );
}
const styles =  StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'

    }
})
 
export default CreateUser;