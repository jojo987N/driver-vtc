import { View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { auth, getOrders, ordersCol } from '../firebase'
import OrderItem from './OrderItem'
import { APP_CONSTANT } from '../global'
import {getDocs, onSnapshot, query, where } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Orders({location, route, setLoading}) {
  const [orders, setOrders] = useState()
  useEffect(()=>{
    // setLoading(true)
    // AsyncStorage.getItem("orders").then(value => {
      // if(value){
      //   let orders = JSON.parse(value)
      //   if (route.params.status !== "history")
      //   orders = orders.filter(order => order.status === route.params.status)
      //   setOrders(orders)
      //   setLoading(false)
      // }
      // else {

        // getDocs(ordersCol).then(snapshot => {
          onSnapshot(ordersCol, (snapshot)=>{
          // AsyncStorage.setItem('orders', JSON.stringify(snapshot.docs.map(doc => ({
          //   id: doc.id,
          //   ...doc.data()
          // }))))
          let orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          if (route.params.status !== "history")
          orders = orders.filter(order => order.status === route.params.status)
          setOrders(orders)
          // setLoading(false)
        })

      // }
    // })
  }, [])

  // if(orders)
  // setLoading(false)
  return (
    <> 
    {orders?
    <View>
       {orders.map((order, index)=> <OrderItem key={index} order={order} location = {location}  />)}
    </View>:<></>}
    </>
   
  )
}
 