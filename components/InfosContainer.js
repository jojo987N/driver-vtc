import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Phone from './Phone'
import {Entypo, Ionicons} from '@expo/vector-icons'

export default function InfosContainer({order, content}) {
  return (
      <View style={styles.container}>
          <View style={styles.icon_name_phone}>
             <View style={styles.icon_name}>
                 <Ionicons name={content==="User"?"person":"restaurant"} size={20} color="black" />
                  <Text style={styles.name}>{order[content].name}</Text>
             </View>
              <Phone order={order} />
          </View>
          <View style={styles.address_icon}>
              <Entypo name="location-pin" size={24} color="black" style={styles.icon}/>
              <Text style={styles.address} >{order[content].address}</Text>
          </View>
      </View>
  )
}
const styles = StyleSheet.create({
    container:{
       marginHorizontal: 25,
        marginBottom: 30,
    },
    icon_name_phone:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
    },
    icon_name: {
      flexDirection: "row",
      alignItems: "center"
    },
    name: {
        fontSize: 23,
        fontWeight: "bold",
        paddingVertical: 20,
        marginLeft: 5
    },
    address_icon: {
     flexDirection: "row",
     alignItems: "center",
    },
    address: {
      width: 250,
      marginLeft: 5
    },
    icon: {
    }
})