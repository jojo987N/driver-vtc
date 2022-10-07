import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import OrdersScreen from '../screens/OrdersScreen';
import OrderDelivery from '../screens/OrderDelivery';
import SignIn from '../screens/authScreens/SignIn';
import DrawerNavigator from './DrawerNavigator';
import { UserContext } from '../context/UserContext';
import SignUp from '../screens/authScreens/SignUp';
import {StripeProvider} from '@stripe/stripe-react-native'


export default function RootNavigation() {
  const Stack = createStackNavigator();
  const [userData, setUserData] = useState()
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ userData, setUserData }}>
        <StripeProvider 
        // publishableKey="pk_test_IvI4y9lJ7FvJR4sPtn1khdkV"
        publishableKey="pk_live_shTsetOzwZIg6LurthonKOwZ"
        >
          <Stack.Navigator>

            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />

            <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} options={{ headerShown: false }} />

          </Stack.Navigator>
        </StripeProvider>
      </UserContext.Provider>
    </NavigationContainer>
  )
}