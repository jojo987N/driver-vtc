import { View, Text, StyleSheet, TouchableOpacity, Modal, StatusBar} from 'react-native'
import React, { useEffect, useState } from 'react'
// import { ArrowBack } from '../components/restaurantDetail/About'
import { grey1 } from '../global'
import { AntDesign } from '@expo/vector-icons'
import { stripePayment } from '../utils'
import { useStripe } from '@stripe/stripe-react-native';
import AddFunds from './AddFunds'
import {language, currency}  from '../global'
import { auth, driversCol } from '../firebase'
import {where, onSnapshot, query} from 'firebase/firestore'
import { MenuButton } from './OrdersScreen'



export default function Wallet({ navigation }) {

    const stripe = useStripe();
    const [modalVisible, setModalVisible] = useState(false)
    const [amount, setAmount] = useState(0.00)

    useEffect(()=> {
        const q = query(driversCol, where('id', '==', auth.currentUser?.uid))
        onSnapshot(q, (snapshot) => {

           setAmount(snapshot.docs[0].data().wallet)
        })

    }, [])
    return (
        <>
            <Modal
                animationType='slide'
                visible={modalVisible}
                // transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                {/* {checkoutModalContent()} */}
                <AddFunds setModalVisible={setModalVisible}  setAmount={setAmount}/>
            </Modal>
            <View style={styles.container}>
                {/* <ArrowBack navigation={navigation} /> */}
                <Text style={styles.title}>Wallet</Text>
                <View style={styles.cash}>
                    <View style={styles.cashContainer}>
                        <View style={styles.cashTexts}>
                            <Text style={styles.cashText}>Cash</Text>
                            <Text style={styles.cashNumber}>{Number(amount).toLocaleString(language, {
        style: "currency",
        currency: currency
      })}</Text>
                        </View>
                        <AntDesign name="right" size={20} color="grey" style={styles.right} />
                    </View>
                </View>
                <TouchableOpacity style={styles.textContainer} onPress={() => {
                    // navigation.push("AddFunds")
                    // stripePayment(stripe)
                    setModalVisible(true)
                }}>
                    <Text style={styles.text}>Add Funds to your wallet</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Connect Account</Text>
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.text}>Vouchers</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Add voucher code </Text>
                </View>
            </View>
            <View style={{position: "absolute", top: 0, bottom: 10}}>
                <MenuButton navigation={navigation} />
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    title: {
        fontSize: 35,
        marginLeft: 10,
        marginBottom: 30
    },
    cashContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    cash: {
        backgroundColor: grey1,
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 5,

    },
    cashTexts: {
        marginLeft: 20,
        paddingVertical: 25,
        paddingBottom: 30
    },
    cashNumber: {
        fontSize: 35,
        fontWeight: "bold",
        //paddingVertical: 30,

    },
    cashText: {

    },
    right: {
        marginRight: 10
    },
    textContainer: {
        borderBottomWidth: 0.5
    },
    text: {
        paddingVertical: 30,
        marginLeft: 10,
        color: "green"
    }
})