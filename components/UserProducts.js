import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { MaterialIcons} from '@expo/vector-icons';

export default function UserProducts({order}) {
  return (
    <View style={styles.container}>
       {Object.entries(order.User.items.map(item => item.name).reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {}))
      .map(([name, quantity], index)=>
      <View style={styles.items} key={index}>
        <Text style={styles.item_name}>{name}</Text>
        <MaterialIcons name="close" size={12} color="black" />
        <Text style={styles.item_quantity}>{quantity}</Text>
      </View>)}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
     marginHorizontal: 25,
     marginBottom: 30
    },
    items: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20
    },
    item_name: {
      marginRight: 10,
      fontWeight: "bold",
      color: "grey"
    },
    item_quantity: {
    }
  })
