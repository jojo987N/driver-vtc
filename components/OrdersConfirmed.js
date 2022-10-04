import { View, Text } from 'react-native'
import React from 'react'

export default function OrdersConfirmed() {
  return (
    <View>
      <FlatList
            data={orders}
            renderItem={({ item }) => <OrderItem order={item} />}
          />
    </View>
  )
}