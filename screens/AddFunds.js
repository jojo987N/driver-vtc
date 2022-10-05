import { View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import React, { useState } from 'react'
// import { ArrowBack } from '../components/restaurantDetail/About'
import { CheckBox, Divider, } from 'react-native-elements'
import { stripePayment } from '../utils'
import { useStripe } from '@stripe/stripe-react-native';


export default function AddFunds({ navigation, setModalVisible, setAmount}) {

    const [amount1, setAmount1] = useState(50)
    const [amount2, setAmount2] = useState(100)
    const [amount3, setAmount3] = useState(150)
    const [checked, setChecked] = useState(false)
    const stripe = useStripe();
    return (
        <View style={styles.container}>
            {/* <ArrowBack navigation={navigation} /> */}
            <Text style={styles.title}>Add Funds</Text>
            <Divider style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 20 }} />

            <View style={{flex: 1}}>
                <CheckBox
                    title={<Text style={{ marginLeft: 10, fontSize: 25}}>${amount1}</Text>}
                    checked={checked}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={styles.containerStyle} 
                    onPress={() => {
                        setChecked(true)
                    }}/>
                <Divider style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }} />
                <CheckBox
                    title={<Text style={{ marginLeft: 10, fontSize: 25}}>${amount2}</Text>}
                    checked={checked}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={styles.containerStyle} 
                    onPress={() => {
                        setChecked(true)
                    }}/>
            

            <Divider style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }} />
            <CheckBox
                title={<Text style={{ marginLeft: 10, fontSize: 25}}>${amount3}</Text>}
                checked={checked}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                containerStyle={styles.containerStyle} 
                onPress={() => {
                    setChecked(true)
                }}/>
            </View>
            <View style={{marginHorizontal: 20, flexDirection: "row", marginBottom: 20}}>
                <TouchableOpacity style={{  flex: 1 }}   onPress={()=>{
                    setModalVisible(false)
                 }}>
                    <Text style={{padding: 20, fontSize: 20 }}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "black", flex: 1 }}
                 onPress={()=>{
                    stripePayment(stripe, amount2, setModalVisible, setAmount)
                 }}
                >
                    <Text style={{ color: "white", padding: 20, fontSize: 20 }}>CONFIRM</Text>
                </TouchableOpacity>

            </View>
             
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    title: {
        fontSize: 35,
        marginLeft: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    containerStyle:
        { backgroundColor: "transparent" }

})