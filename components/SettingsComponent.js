import { View, Text, SafeAreaView, StatusBar, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { auth, getDriverInfos } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../context/UserContext'

export default function SettingsComponent({ navigation, bs }) {
  const { setUserData, userData } = useContext(UserContext)
  const [email, setEmail] = useState(userData.email)
  const [name, setName] = useState(userData.name)
  const [phone, setPhone] = useState(userData.phone)
  const [carNumber, setCarNumber] = useState(userData.carNumber)
  const [carName, setCarName] = useState(userData.Car)
  const [password, setPassword] = useState('')

  const SignInUser = async () => {
    const re = await signInWithEmailAndPassword(auth, email, password)
    getDriverInfos().then(docs => {
      AsyncStorage.setItem('driverData', JSON.stringify(docs[0]))
      setUserData(docs[0])
      navigation.navigate('DrawerNavigator')
    })
  }
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={{
        alignItems: "center",
        backgroundColor: "blue",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 30,
        paddingTop: 30
      }}>
        <Pressable onPress={
          () => {
            bs.current.snapTo(0)
          }
        }>
          <Image
            source={{ uri: "https://www.shareicon.net/data/128x128/2016/04/10/747353_people_512x512.png" }}
            style={{
              width: 100,
              height: 100
            }}
          />
        </Pressable>
        <Text style={{
          fontSize: 15, fontWeight: "bold", color: "white",
          letterSpacing: 2
        }}>Upload Image</Text>
      </View>
      <View style={{
        marginTop: 40,
        flex: 1,
        paddingTop: 20
      }}>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={password}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={name}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={phone}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={carName}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
            marginLeft: 6,
          }} />
          <TextInput
            placeholder='Email'
            value={carNumber}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput} />
        </View>
        <TouchableOpacity onPress={() => { }}>
          <View style={{
            backgroundColor: "#0080ff",
            marginHorizontal: 25,
            borderRadius: 5,
            marginTop: 30
          }}>
            <Text style={{
              padding: 16,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              letterSpacing: 2
            }}>Update</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center"
  },
  textInput: {
    width: "90%",
    padding: 10
  }
})