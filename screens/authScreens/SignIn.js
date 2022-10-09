import { View, Text, SafeAreaView, StatusBar, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { auth, getDriverInfos} from '../../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../context/UserContext'
import Loading from '../../components/Loading'
import * as Animatable from "react-native-animatable"
import { LinearGradient } from 'expo-linear-gradient'

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const {setUserData} = useContext(UserContext)
  const SignInUser = async ()=>{
    setLoading(true)
    try {
    const re = await signInWithEmailAndPassword(auth, email, password)
      getDriverInfos().then(docs => {
        AsyncStorage.setItem('driverData', JSON.stringify({...docs[0], email: re.user.email}))
          setUserData({...docs[0], email: re.user.email})
          setLoading(false)
          navigation.navigate('DrawerNavigator')
      })
    }catch(e){
      console.log(e)
      setLoading(false)
  }
}
// useEffect(()=>{
//   AsyncStorage.getItem("driverData")
//   .then((value)=>{
//     if(value){
//       let driverData = JSON.parse(value)
//       setUserData(driverData)
//       navigation.navigate('DrawerNavigator')
//     }
//   })
// }, [])
if(loading)
return <Loading />
  return (
    <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.title}>Good Foods Driver !</Text>
          </View>
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
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
                  <MaterialIcons name="lock" size={20} color="#3d5c5c" style={{
                      marginLeft: 6,
                  }} />
                  <TextInput
                      placeholder='Password'
                      value={password}
                      onChangeText={(text) => setPassword(text)}
                      style={styles.textInput}
                      secureTextEntry />
              </View>
              <TouchableOpacity onPress={() => SignInUser()}>
              <LinearGradient
                          colors={['#948E99', '#2E1437']}
                          style={styles.signInButton} >
                          <Text style={{...styles.signInText, color: 'white'}}>Sign In</Text>
              </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <LinearGradient
                          colors={['#ada996', '#f2f2f2', '#dbdbdb', '#eaeaea']}
                          style={styles.signInButton} >
                          <Text style={styles.signInText}>Sign Up</Text>
              </LinearGradient>
              </TouchableOpacity>
          </Animatable.View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b3b3b3"
  },
  header: {
      alignItems: "center",
     flex: 1,
     paddingBottom: 50,
     justifyContent: "flex-end"
  },
  title: {
      fontSize: 25, fontWeight: "bold", color: "#3d5c5c",
      letterSpacing: 5
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
textInputContainer: {
  flexDirection: "row",
   backgroundColor: "white",
   marginHorizontal: 25,
  borderRadius: 5,
   marginTop: 20,
   alignItems: "center",
   borderBottomWidth: 0.3,
   borderBottomColor: "grey"
},
textInput: {
  width: "90%",
  padding: 10
},
signInButton: {
  width: "100%",
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  marginTop: 50
},
 signInText: {
     fontSize: 18,
     fontWeight: "bold",
     color: "#3d5c5c",
     letterSpacing: 1
 },
})