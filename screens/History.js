import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet'
import Orders from '../components/Orders'
import CalendarComponent from '../components/CalendarComponent'
import MapView, { Marker } from 'react-native-maps'

export default function History({location, route}) {
  return (
      <BottomSheet  index={1} snapPoints={["12%", "100%"]}>
          <BottomSheetScrollView>
            {!route.params && <CalendarComponent /> }
             <Orders location={location} route={route}/>
             </BottomSheetScrollView>
       </BottomSheet>
  )
}