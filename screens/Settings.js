import { View, Text, SafeAreaView, StatusBar, Pressable, Image, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from "react-native-reanimated";
import {useEffect, useRef, useState} from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import {Camera} from "expo-camera"
import { updateProduct } from "../firebase"
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import SettingsComponent from "../components/SettingsComponent";
import { MenuButton } from "./OrdersScreen";

export default function Upload({route, navigation}) {
    const uploadImage = async (uri)=>{
    const response = await fetch(uri)
    const blob = await response.blob()
    const storage = getStorage();
    const storageRef = ref(storage, 'restaurant/');
    getDownloadURL(storageRef) 
    .then(url=> updateProduct(product_id,url))
  }
  const [image, setImage] = useState(null) 
  let openImagePickerAsync = async ()=>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
    alert("Permission to acces camera roll is required")
    return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
   console.log(pickerResult)
   if(pickerResult.cancelled === true) return;
  uploadImage(pickerResult.uri)
   setImage(pickerResult.uri)
  }
  const renderContent = ()=>(
    <View style={{
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
    }}>
        <View style={{
        marginTop: 30
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold"
        }}>Upload Photo</Text>
      </View>
       <TouchableOpacity  onPress={
        ()=>openImagePickerAsync()
      }> 
      <View style={{
        marginTop: 30,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white"
        }}>Take a Photo</Text>
      </View>
      </TouchableOpacity>
      <View style={{
        marginTop: 10,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white"
        }}>Choose From Library</Text>
      </View>
      <View style={{
        marginTop: 10,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white",
        }}>Cancel</Text>
      </View>
    </View>
  )
   const bs = useRef()
   useEffect(()=>{
    setTimeout(()=>{
        bs.current.snapTo(2)
    }, 2000)
   }, [])
  return (
    <GestureHandlerRootView style={{
      backgroundColor: "#eee",
      flex: 1,
      alignItems: "center",
    }}>
      <BottomSheet 
      ref={bs}
      snapPoints={["47%","90%", 0]}
      renderContent={renderContent}
            />
      <View style={{
      }}>
        {image?(<Image source={{uri: image}} 
        style={{
          width: 400,
          height:400,
          alignSelf: "flex-start",
          resizeMode: "contain"
        }}/>):(<></>)}
      </View>
       <SettingsComponent bs={bs}/>
       <MenuButton navigation={navigation} />
    </GestureHandlerRootView>
  );
}
 