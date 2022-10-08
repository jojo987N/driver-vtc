import { View, Text, SafeAreaView, StatusBar, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { auth, getDriverInfos, updateRestaurantInfos } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
// import SearchBar from './SearchBar'
import { UserContext } from '../context/UserContext'
import Menu from './Menu'
import { TRANSLATION } from '../global'

export default function SettingsComponent({ navigation, bs }) {
  const { setUserData, userData } = useContext(UserContext)
  const [email, setEmail] = useState(userData.email)
  const [name, setName] = useState(userData.name)
  const [phone, setPhone] = useState(userData.phone)
  // const [address, setAddress] = useState(userData.address)
  // const [city, setCity] = useState(restaurantData.city)
  return (
    <View style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#e0ebeb",
      flex: 1
    }}>
      <View style={{flexDirection: "row"}}>
                    <Menu navigation={navigation} />
                </View>
      <View style={{flexDirection: "row",  justifyContent: "space-between", marginHorizontal: 10}}>
      <UploadImage bs={bs} defaultImage={require("../assets/images/image-profil.png")}/>
      <UploadCarImage bs={bs} defaultImage={require("../assets/images/berline-icon.png")}/>
      </View>
           <View style={{
        marginTop: 40, flex: 1
      }}>
        {/* <View style={{ marginHorizontal: 25 }}>
          <SearchBar style={{ backgroundColor: "white", borderBottomColor: "grey", borderBottomWidth: 0.3 }}
            setAddress={setAddress} setCity={setCity}/>
        </View> */}
        <ScrollView>
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
              placeholder='Name'
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.textInput} />
          </View>
          <View style={styles.textInputContainer}>
            <MaterialIcons name="person" size={20} color="#3d5c5c" style={{
              marginLeft: 6,
            }} />
            <TextInput
              placeholder='Phone'
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={styles.textInput} />
          </View>
          <TouchableOpacity onPress={() => {
            updateRestaurantInfos(restaurantData, email, name, phone, address, city, setRestaurantData)
          }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

const UploadImage = ({bs, defaultImage}) => {
  const { setUserData, userData } = useContext(UserContext)

  return (
    <View style={{
      alignItems: "center",
      marginTop: 20,
      width: 150,
    }}>
      <Pressable onPress={
        (a) => {
          console.log('a : ', a)
          bs.current.snapTo(0)
        }
      }>
        <Image
          // source={{ uri: restaurantData.image }}
          source={userData.image?{uri: userData.image}:defaultImage}

          style={{
            width: 100,
            height: 100,
            overflow: 'hidden',
            borderRadius: 100 / 2,
          }}
        />
      </Pressable>
      <Text style={{
        fontSize: 8, fontWeight: "bold", color: "#3d5c5c",
        // letterSpacing: 5,
        textAlign: "center"
      }}>{TRANSLATION['Upload Profil']}</Text>
    </View>
  )
}
const UploadCarImage = ({bs, defaultImage}) => {
  const { setUserData, userData } = useContext(UserContext)

  return (
    <View style={{
      alignItems: "center",
      marginTop: 20,
      width: 150,
        // flexGrow: 1,
    }}>
      <Pressable onPress={
        () => {
          bs.current.snapTo(0)
        }
      }>
        <Image
          // source={{ uri: restaurantData.image }}
          source={userData.CarImage?{uri: userData.carImage}:defaultImage}

          style={{
            width: 100,
            height: 100,
            overflow: 'hidden',
            borderRadius: 100 / 2,
          }}
        />
      </Pressable>
      <Text style={{
        fontSize: 8, fontWeight: "bold", color: "#3d5c5c",
        //letterSpacing: 5,
        textAlign: "center"
      }}>{TRANSLATION['Upload Car']}</Text>
    </View>
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
  },
  button: {
    backgroundColor: "#0080ff",
    marginHorizontal: 25,
    borderRadius: 5,
    marginTop: 30
  },
  buttonText: {
    padding: 16,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 2
  }
})