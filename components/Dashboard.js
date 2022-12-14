import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native'
import React, { createElement } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import { FlatList } from 'react-native-gesture-handler';
import { dashboardItems } from '../global/data';

export default function Dashboard({navigation}) {
  return (
    <View style={styles.container}>
  {/* <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
   width = {Dimensions.get("window").width-20}
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} 
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> */}
    <View style={styles.container2}>
    <Total title={`OFFRES DE COURSES`} value="0"/>
        <Total title={`REVENUS`} value="0"/>
    </View>
    <FlatList 
    data={dashboardItems}
    keyExtractor={(item, index)=>String(index)}
    renderItem={({item})=>{
      return (
        <TouchableOpacity onPress={()=>{
          if(item.alias === "Earn")
          Alert.alert(
            "Gagnez de l'argent","Proposez des courses à vous que vous ne pouvez pas faire, et gagnez jusqu'à 5 à 10% de commission sur la course éffectuée, dans notre réseau."
          )
          if(item.alias === "Recharge")
          Alert.alert(
            "Rechargez votre compte","Le client vous paie à bord, en cash, à la fin du trajet ! Nous n'encaissons rien des clients ! Le crédit nous permet de récupérer notre commission ."
            // ,
            // [{text: 'Rechargez',
            // onPress: () => navigation.navigate('DrawerNavigator', {screen: item.alias})
            // }]
          )
           navigation.navigate('DrawerNavigator', {screen: item.alias})
        }} 
        style={styles.iconContainer}>
        {createElement(item.icon.type, {
          name: item.icon.name,
          size: 34,
         color: "#8080ff"
        }, null)}
          <Text style={styles.textIcon}>{item.label}</Text>
      </TouchableOpacity>
      )
    }}
    numColumns={2}
    key={2}
    />
    {/* <View style={{backgroundColor: "grey", flexDirection: "row"}}>
      <Text>Votre crédit est de: 0.00</Text>
      <View style={{backgroundColor: "yellow"}}>
        <Text>Ajouter Crédit</Text>
      </View>

    </View> */}
    </View>
  )
}
const Total = ({title, value})=>{
    return(
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{title}</Text>
          <Text style={styles.totalValue}>{value}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    alignItems: "center"
    },
    container2: {
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10
    },
    totalContainer : {
      borderWidth: 1,
      borderColor: "#d9d9d9",
      flex: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 20
    },
    totalText: {
        fontWeight: "bold",
        color: "grey",
        marginBottom: 10,
        textAlign: "justify"
    },
    totalValue: {
        color: "#8080ff",
        fontWeight: "bold"
    },
    iconContainer: {
      borderWidth: 1,
      marginHorizontal: 5,
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 15,
      width: 178,
      marginBottom: 10,
      borderColor: "#d9d9d9",
    },
    textIcon: {
      fontWeight: "bold",
      color: "grey"
    }
})
