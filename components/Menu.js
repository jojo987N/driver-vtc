import { View, Text } from 'react-native'
import React from 'react'
import { Icon} from 'react-native-elements'


export default function Menu({navigation}) {

   
  return (
    <Icon
    type="material-community"
    name='menu'
    color="black"
    size={32}
    onPress={()=>navigation.toggleDrawer()}
/>
  )
}