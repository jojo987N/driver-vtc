import { View, Text, ActivityIndicator, useWindowDimensions,
Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { FontAwesome5, Entypo, MaterialIcons, Ionicons, FontAwesome} from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { ordersCol, updateOrder, updateOrderAccepted, updateOrderStarted, updateOrderStatus } from '../firebase';
import { auth } from '../firebase'
import UserInfos from '../components/UserInfos';
import RestaurantInfos from '../components/RestaurantInfos';
import InfosContainer from '../components/InfosContainer';
import { apiKey, APP_CONSTANT, grey1 } from '../global';
import { onSnapshot, query, where } from 'firebase/firestore';
import UserProducts from '../components/UserProducts';

export default function OrderDelivery({route}) {
  const {order, location} = route.params
  const navigation = useNavigation()
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [totalKm, setTotalKm] = useState(0)
  const [colorButton, setColorButton]= useState("green")
  const [textButton, setTextButton]= useState(APP_CONSTANT.START_DELIVERY)
  const [orderStatus, setOrderStatus]=useState(order.status)
  const [isDriverClose, setIsDriverClose] = useState(false)
  const [isDriverFinish, setIsDriverFinish] = useState(false)
  const [remainingTimeForPickup, setRemainingTimeForPickup] = useState()
  const [firstRendrer, setFirstRender] = useState(false)
  const [delta, setDelta]=useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [destination, setDestination] = useState({
    latitude: order.User.lat,
    longitude: order.User.lng
  })
  const [waypoints, setWaypoints]= useState([{
              latitude: order.Restaurant.lat,
              longitude: order.Restaurant.lng,
            }])
    const bottomSheet = useRef(null)
    const mapRef = useRef(null)
    const button = useRef(null)
    const { width, height } = useWindowDimensions()

    const renderButtonTitle = ()=>{
      if(orderStatus === APP_CONSTANT.ACCEPTED){
        return APP_CONSTANT.START_DELIVERY
      }
      if(orderStatus === APP_CONSTANT.STARTED){
        return APP_CONSTANT.PICK_UP
      }
      if(orderStatus === APP_CONSTANT.PICKED_UP){
        return APP_CONSTANT.FINISH
      }
      if(orderStatus === APP_CONSTANT.COMPLETED){
        return APP_CONSTANT.COMPLETED
      }
      if(orderStatus === APP_CONSTANT.CANCELED){
        return APP_CONSTANT.CANCELED
      }
    }
    const renderButtonColor = ()=>{
      if(orderStatus === APP_CONSTANT.ACCEPTED){
        return "green"
      }
      if(orderStatus === APP_CONSTANT.STARTED){
        return "orange"
      }
      if(orderStatus === APP_CONSTANT.PICKED_UP){
        return "#996300"
      }
      if(orderStatus === APP_CONSTANT.COMPLETED){
        return "blue"
      }
      if(orderStatus === APP_CONSTANT.CANCELED){
        return "red"
      }
    }
    const getOrderStatus = ()=>{
      const q= query(ordersCol, where('orderId', '==', order.orderId))
      onSnapshot(q, (snapshot)=>{
          setOrderStatus(snapshot.docs[0].data().status)
        })
      } 
      const setters = async ()=> {
      }
      
      const onButtonPressed = () => {
        if(orderStatus === APP_CONSTANT.ACCEPTED){
          bottomSheet?.current.collapse()
          mapRef?.current?.getCamera().then((cam)=>{
           cam.zoom += 1;
           mapRef?.current?.animateCamera(cam);
          })
           setters()
           .then(()=> setDestination({
            latitude: order.Restaurant.lat,
            longitude: order.Restaurant.lng,
          }))
           .then(()=> setWaypoints([]))
           .then(()=> setTextButton(APP_CONSTANT.PICK_UP))
           .then (()=> setColorButton("orange"))
           setFirstRender(true)
           updateOrderStatus(order.id, APP_CONSTANT.STARTED)
        // updateOrderAccepted(order.id, APP_CONSTANT.STARTED, totalMinutes)
        }
        if(orderStatus === APP_CONSTANT.START_DELIVERY){
            bottomSheet?.current.collapse()
            setters()
            .then(()=>  setDestination({
              latitude: order.User.lat,
              longitude: order.User.lng
            }))
            .then(()=> setTextButton(APP_CONSTANT.FINISH))
            .then(()=>  setColorButton("#996300"))
            .then (()=> setIsDriverClose(false))
           updateOrder(order.id, APP_CONSTANT.PICKED_UP)
        }
        if(orderStatus === APP_CONSTANT.PICKED_UP){
          setTextButton(APP_CONSTANT.COMPLETED)
          setColorButton("blue")
          updateOrder(order.id, APP_CONSTANT.COMPLETED)
        }
      }
      useEffect(() => {
        if(orderStatus === APP_CONSTANT.STARTED){
          updateOrderStarted(order.id, totalMinutes) 
        }
      }, [totalMinutes]);

    useEffect(() => {
      getOrderStatus()
    }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <View style={{
        flex: 1,
    }}>
    <MapView
           provider={PROVIDER_GOOGLE}
          ref={mapRef}
          initialRegion={{
            latitude: location.latitude,     
            longitude: location.longitude,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta
          }}
          style={{
            height: height,
            width: width
          }}
          showsUserLocation={true}
          followsUserLocation>

             <MapViewDirections 
              
              origin={{
                latitude: location.latitude,
                longitude: location.longitude,}}
    
                destination={{
                 // latitude: order.User.lat,
                 // longitude:  order.User.lng,
                  ...destination
                }}
                strokeWidth={10}
                strokeColor={renderButtonColor()}
                waypoints={waypoints}
                apikey={apiKey}
                onReady ={(result)=> {
    
                  if(result.distance < 0.1){
                    setIsDriverClose(true)
                    setColorButton("green")
                  }
                  
                 
                  setTotalMinutes(result.duration)
                  setTotalKm(result.distance)

                  // updateOrderAccepted(order.id, APP_CONSTANT.STARTED, result.duration)
                }}
              />
    
            <CustomMarker subject={order.Restaurant} renderButtonColor={renderButtonColor}/>
            <CustomMarker subject={order.User} renderButtonColor={renderButtonColor}/>
        </MapView>
        <BackButton navigation={navigation}/>
    <BottomSheet ref={bottomSheet} index={1} snapPoints={["12%", "95%"]}
    handleIndicatorStyle={{backgroundColor: "grey", width: 100}}>
     <Estimate totalMinutes={totalMinutes} totalKm={totalKm} color={renderButtonColor()}/>
     <InfosContainer order={order} content="Restaurant" />
      <Divider />
     <InfosContainer order={order} content="User" />
     <UserProducts order={order} />
     <Divider size={10} color={grey1}/>
     {/* Button  */}
    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
      onButtonPressed()
      }}>
    <View style={{...styles.button, 
      backgroundColor: renderButtonColor()
      }}>
     <Text style={styles.textButton}>{
     renderButtonTitle()
     }</Text>
    </View>
    </TouchableOpacity>
    </BottomSheet>
    </View>
    </GestureHandlerRootView>
  )
}
const BackButton = ({navigation}) => <Ionicons 
onPress={()=>navigation.goBack()}
name="arrow-back-circle"
size={45}
color="black"
style={{
  position: 'absolute',
  left: 10,
  top: 10
}}/>
const CustomMarker = ({subject, renderButtonColor, icon})=>{
  return (
    <Marker  title={subject.name} description={subject.address}
              coordinate={{
                latitude: subject.lat,
                longitude:subject.lng,
              }}
            >
              <View style={{
                backgroundColor: renderButtonColor(),
                borderRadius: 20,
                padding : 5
              }}>
                {subject.items?<Entypo name="user" size={30} color="white" />:
                <MaterialIcons name="restaurant" size={30} color="white" />}
              </View>
    </Marker>
  )
}
const Estimate = ({totalMinutes, totalKm, color})=> (

  <View style={{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
}}>
  <Text style={{fontSize: 25}}>{totalMinutes.toFixed()} min </Text>
  <FontAwesome5 name="shopping-bag" size={30} color={color}/>
  <Text style={{fontSize: 25}}> {totalKm.toFixed()} km </Text>
</View>
)
const Divider = ({size, color})=>{
return (
<View style={{
  ...styles.divider, 
  borderBottomWidth: size?size:0.3,
  borderBottomColor: color?color: "grey"
  }}>
  </View>)}
const styles = StyleSheet.create({
  buttonContainer:{ 
    flex: 1, 
    justifyContent: "flex-end",
  },
  button : {
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
    justifyContent: "center"
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold"
  },
  divider: {
    marginBottom: 20
  }
})
