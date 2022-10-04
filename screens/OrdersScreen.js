import { View, Text, FlatList, useWindowDimensions, ActivityIndicator, 
  Switch, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useRef, useState, useMemo, useEffect, useContext} from 'react'
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import OrderItem from '../components/OrderItem'
import { orders } from '../global/data'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from 'react-native-maps'
import OrderCountDown from '../components/OrderCountDown'
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { db, updateDriverOnOff, driversCol, auth, ordersCol} from '../firebase'
import {collection, orderBy, query, limit, onSnapshot, where, getDocs} from 'firebase/firestore'
import { apiKey, currency, RADIUS } from '../global'
import LottieView from 'lottie-react-native'
import { APP_CONSTANT } from '../global'
import OnlineOffLine from '../components/ordersScreen/OnlineOffLine'
import Orders from '../components/Orders'
import Menu from '../components/Menu'
import Dashboard from '../components/Dashboard'
import History from './History'
import { UserContext } from '../context/UserContext'
import CalendarComponent from '../components/CalendarComponent'
import Loading from '../components/Loading'
import { getDistanceFromLatLonInKm } from '../utils'

export default function OrdersScreen({route, navigation}) {
  const {userData} = useContext(UserContext)
  const bottomSheet = useRef(null)
  const { width, height } = useWindowDimensions()
  const [opacity, setOpacity]= useState(0.9)
  const [showOrderCountDown, setShowOrderCountDown] = useState(false)
  const [bottomSheetHeight, setBottomSheetHeight] = useState("89%")
  const [mapdirection, setMapdirection] = useState(false)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [order, setOrder] = useState({})
  const [onOffline, setOnOffline] = useState(userData.onOff)
  const [location, setLocation] = useState();
  
  const [destination, setDestination] = useState()
  const [loading, setLoading] = useState(false)
  const _Dashboard = useMemo(()=><Dashboard navigation={navigation} />, [])

   const getAvailability = ()=>{
    const q= query(driversCol, where('id', '==', userData.id))
    onSnapshot(q, (snapshot)=>{
       setOnOffline(snapshot.docs[0].data().onOff)
      })
   } 
  const getOrders = ()=>{

    onSnapshot(ordersCol, (snapshot) => {
       
      snapshot.docs.forEach((doc) => {
        
        if (doc.data().createdAt && doc.data().status === APP_CONSTANT.READY && onOffline === APP_CONSTANT.ONLINE) {
          
          if (location && getDistanceFromLatLonInKm(location.latitude, location.longitude, doc.data().Restaurant.lat, doc.data().Restaurant.lng) < RADIUS) {

            setOrder({
              id: doc.id,
              ...doc.data()
            })
             setShowOrderCountDown(true)
             if(destination)
             setMapdirection(true)
             if(!destination)
            setDestination({
              latitude: doc.data().Restaurant.lat,
              longitude: doc.data().Restaurant.lng,
            })

          }





        }

      })


    })
    //     getDocs(ordersCol).then(snapshot =>{
    //       snapshot.docs.forEach((doc) => {
    //         if(doc.data().createdAt && doc.data().status === APP_CONSTANT.COMFIRMED && onOffline === APP_CONSTANT.ONLINE) {
    //          setOrder({id: doc.id, 
    //                   ...doc.data()
    //                   })
    //          setShowOrderCountDown(true)
    //          setMapdirection(true)
    //          setDestination({
    //           latitude: doc.data().Restaurant.lat,
    //           longitude: doc.data().Restaurant.lng,
    //         })
    //         }
    //       })
    // })
  }
  useEffect(() => {
    if(!location)
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if(route.params.myLocation)
      bottomSheet?.current.collapse()
    })();
    
    getAvailability()

    getOrders()
  }, [location, destination])

  if(!location)
  return <Loading />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "grey" , opacity:opacity}}>
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221
          }}
          style={{
            height: height,
            width: width
          }}
          >
          {mapdirection?(<><MapViewDirections
          origin={{
            latitude: location.latitude,
            longitude: location.longitude,}}
            destination={destination}
            strokeWidth={10}
            strokeColor="green"
            apikey={apiKey}
            onReady ={(result)=> {
              if(result.distance < 0.1){
              }
             setTotalMinutes(result.duration.toFixed())
            }}
            />
             <Marker  
              coordinate={destination}
            >
              <View style={{
                backgroundColor: "green",
                borderRadius: 20,
                padding : 5
              }}>
                <Entypo name="shop" size={30} color="white" />
              </View>
            </Marker></>
            ):(<></>)} 
        </MapView>
        <MenuButton navigation={navigation} />
        <Earnings />
       {onOffline === APP_CONSTANT.ONLINE?(<></>):(<GoButton/>)}
       <BottomSheet  ref={bottomSheet} index={1} snapPoints={["12%", bottomSheetHeight]}>
          <OnlineOffLine onOffline={onOffline}/>
             {route.params.myLocation && <Loading />}
             {loading && <Loading />}
            {route.params.dashboard && _Dashboard}
            {route.params.status && 
             <BottomSheetScrollView>
               { route.params.status === "history" && <CalendarComponent /> }
               <Orders location={location} route={route} setLoading={setLoading}/>
             </BottomSheetScrollView>
            }
          {route.params.dashboard && <OffButton /> }
        </BottomSheet>
      </View>
        {showOrderCountDown?(<View style={{
          position: "absolute",
          width: width,
          height:height,
          }}>
          <OrderCountDown setOpacity={setOpacity} setShowOrderCountDown={setShowOrderCountDown}
          setBottomSheetHeight={setBottomSheetHeight}
          setMapdirection={setMapdirection}
          totalMinutes = {totalMinutes}
          order={order}
          location={location}
           />
        </View>):(<></>)} 
    </GestureHandlerRootView>
  )
}
const Earnings = ()=>{
  return (
    <View style={{
      position: "absolute",
      backgroundColor: "black",
      alignSelf: "center",
      borderRadius: 20,
      marginTop: 20
    }}>
      <Text style={{
        color: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 25
      }}>
        <Text style={{
          color: "#1a8cff"
        }}>{currency}</Text> 0.00 </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const GoButton = ()=>(
  <TouchableOpacity
    onPress={()=>{
      updateDriverOnOff(APP_CONSTANT.ONLINE)
     }}
    style={{
      position: "absolute",
      backgroundColor: "blue",
      width: 70,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      bottom: 150,
      alignSelf: "center"
    }}>
    <View style={{
      position: "absolute"
    }}>
      <Text style={{
        fontWeight: "bold",
        fontSize: 20,
        color: "white"
      }}>GO</Text>
    </View>
    <LottieView style={{
      height: 70,
      alignSelf: "center",
      width: 70
    }}
      source={require("../assets/animations/5709-test.json")}
      autoPlay
      speed={0.5}
      loop
    />
  </TouchableOpacity>
)
const OffButton = ()=>(
<TouchableOpacity 
  onPress={()=>{
    updateDriverOnOff(APP_CONSTANT.OFFLINE)
  }}
  style={{
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20
  }}>
     <Text style={{
       fontWeight: "bold",
       fontSize: 20,
       color: "white"
     }}>OFF</Text>
  </TouchableOpacity>
)
export const MenuButton = ({navigation})=> {
  return (
    <View style={{position: "absolute", top: 25, left: 10}}>
      <Menu navigation={navigation} />
    </View>
  )
 } 
