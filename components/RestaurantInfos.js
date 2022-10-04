import { View, Text, StyleSheet,} from 'react-native'
import React from 'react'
import Phone from './Phone'
import InfosContainer from './InfosContainer'


export default function RestaurantInfos({order}) {
  return (
      
    <InfosContainer order={order} content="Restaurant" />

  )
}

const styles = StyleSheet.create({
 
})