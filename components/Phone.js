import { View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { grey1 } from '../global'


export default function Phone({order}) {
  return (
      <TouchableOpacity style={styles.phoneContainer} onPress={() => Linking.openURL(`tel:${order.Restaurant.phone}`)}>
          <FontAwesome name="phone" size={35} color="black" style={styles.phoneIcon} />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    phoneContainer:{
     backgroundColor: grey1,
     borderRadius: 50,
    width: 50,
    height:50
    },
    phoneIcon: {
      padding: 10
    },
     

})