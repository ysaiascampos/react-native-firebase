import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Value } from 'react-native-reanimated';
import firebase from '../database/firebase';

const UserDetail = (props) => {
    const inicialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    };
    const [user, setUser] = useState(inicialState);
    const [loading, setLoading] = useState(true);
    const getUserById = async id => {
        try {
            const dbRef = firebase.db.collection('users').doc(id);
            const doc = await dbRef.get();
            const user = doc.data();
            setUser({
                ...user,
                id: doc.id
            });
            
        } catch (error) {
            
        }
        setLoading(false);
    }
    useEffect(() => {
        getUserById(props.route.params.userId);
    },[])
    

    const handleChangeText = (name, value) => {
        setUser({...user, [name]: value });
    }
    const updateUser = async () => {
        
        try {
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
            await dbRef.set({
                name: user.name,
                email: user.email,
                phone: user.phone
            });
            setUser(inicialState);
            setLoading(true);
            props.navigation.navigate('UsersList');
        } catch (error) {
            
        }
    }
    const deleteUser = async () => {
        
        try {
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
            await dbRef.delete();
            props.navigation.navigate('UsersList');
        } catch (error) {
            
        }
    }
    const openConfirmationAlert = () => {
        Alert.alert('Remove The User', 'Are you sure?',[
            {text: 'Yes', onPress: () => deleteUser()},
            {text: 'No', onPress: () => console.log(false)}
        ]);
    }

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }
    
    return ( 
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Name User" 
                    onChangeText={(value) => handleChangeText('name', value)} 
                    value={user.name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Email User" 
                    onChangeText={(value) => handleChangeText('email', value)} 
                    value={user.email}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder="Phone User" 
                    onChangeText={(value) => handleChangeText('phone', value)} 
                    value={user.phone}
                />
            </View>
            <View style={styles.inputGroup}>
                <Button 
                    color="#19AC52"
                    title="Update User" 
                    onPress={() => updateUser() } />
            </View>
            <View style={styles.inputGroup}>
                <Button 
                    color="#E37399"
                    title="Delete User" onPress={() => openConfirmationAlert() } />
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
 
export default UserDetail;