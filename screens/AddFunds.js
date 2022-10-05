import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
// import { ArrowBack } from '../components/restaurantDetail/About'
import { CheckBox, Divider } from "react-native-elements";
import { stripePayment } from "../utils";
import { useStripe } from "@stripe/stripe-react-native";

export default function AddFunds({ navigation, setModalVisible, setAmount }) {
//   const [amount1, setAmount1] = useState(50);
//   const [amount2, setAmount2] = useState(100);
//   const [amount3, setAmount3] = useState(150);
  // const [checked1, setChecked1] = useState(false)
  // const [checked2, setChecked2] = useState(false)
  // const [checked3, setChecked3] = useState(false)

//   const [checked, setChecked] = useState(false);
//   const [checked, setChecked] = useState(new Array(3).fill(false));
const [checkboxs, setCheckboxs] = useState([ ...Array(3).keys() ].map( i => ({
    checked: false,
    amount: (i+1)*50
}) ));


  const stripe = useStripe();
  return (
    <View style={styles.container}>
      {/* <ArrowBack navigation={navigation} /> */}
      <Text style={styles.title}>Add Funds</Text>
      <Divider
        style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 20 }}
      />

      <View style={{ flex: 1 }}>
        <CheckBox
          title={
            <Text style={{ marginLeft: 10, fontSize: 25 }}>${checkboxs[0].amount}</Text>
          }
          checked={checkboxs[0].checked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.containerStyle}
          onPress={() => {
            // setChecked([true, false, false])
            setCheckboxs([{
                checked: true,
                amount: checkboxs[0]
            }, {
                checked: false,
                amount: checkboxs[1]
            },
            {
                checked: false,
                amount: checkboxs[2]
            }])

          }}
        />
        <Divider
          style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}
        />
        <CheckBox
          title={
            <Text style={{ marginLeft: 10, fontSize: 25 }}>${checkboxs[1].amount}</Text>
          }
          checked={checkboxs[1].checked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.containerStyle}
          onPress={() => {
            // setChecked([false, true, false])
            setCheckboxs([{
                checked: false,
                amount: checkboxs[0]
            }, {
                checked: true,
                amount: checkboxs[1]
            },
            {
                checked: false,
                amount: checkboxs[2]
            }])
          }}
        />

        <Divider
          style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}
        />
        <CheckBox
          title={
            <Text style={{ marginLeft: 10, fontSize: 25 }}>${checkboxs[2].amount}</Text>
          }
          checked={checkboxs[2].checked}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={styles.containerStyle}
          onPress={() => {
            // setChecked([false, false, true])
            setCheckboxs([{
                checked: false,
                amount: checkboxs[0]
            }, {
                checked: false,
                amount: checkboxs[1]
            },
            {
                checked: true,
                amount: checkboxs[2]
            }])
          }}
        />
      </View>
      <View
        style={{ marginHorizontal: 20, flexDirection: "row", marginBottom: 20 }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setModalVisible(!checked);
          }}
        >
          <Text style={{ padding: 20, fontSize: 20 }}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "black", flex: 1 }}
          onPress={() => {
            stripePayment(stripe, amount2, setModalVisible, setAmount);
          }}
        >
          <Text style={{ color: "white", padding: 20, fontSize: 20 }}>
            CONFIRM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  containerStyle: { backgroundColor: "transparent" },
});
