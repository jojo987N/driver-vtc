import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { MaterialIcons} from '@expo/vector-icons';

export default function UserInfos({order}) {
  return (
    <View style={styles.container}>
      <Text style={styles.user_name}>{order.User.name}</Text>
      <Text style={styles.address}>{order.User.address}</Text>
      <View style={styles.phoneContainer}>
        <Text style={styles.phone}>{order.User.phone}</Text>
      </View>
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
     marginLeft: 20
    },
    user_name: {
     fontWeight: "bold",
     fontSize: 25,
     marginTop: 30,
    },
    address: {
    },
    phoneContainer:{
    },
    phone: {
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
