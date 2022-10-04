import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Pressable, StyleSheet} from "react-native";
import { APP_CONSTANT } from "../global";

export default function OrderItem({order, location}) {
  const navigation = useNavigation()
  return (
      <Pressable style={{...styles.container, borderColor: color(order.status)}} onPress={()=>navigation.navigate("OrderDelivery", {
         order: order,
         location: location
       })}>
        <Image 
      source={{uri: order.User.items[0].restaurant.image}} 
      style={styles.image}/>
      <View style={styles.user_restaurant_infos}>
      <Text style={{fontWeight: "bold"}}>{order.Restaurant.name}</Text>
      <Text style={{color: "grey"}}>{order.Restaurant.address}</Text>
      <Text style={{marginTop: 10}}>Order Id : </Text>
      <Text style={{color: "grey"}}>{order.orderId}</Text>
      </View>
      <View style={{
        backgroundColor: color(order.status),
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: "center"
      }}>
      <Entypo name="check" size={30} color="white" />
      </View>
      </Pressable>
  );
}
const color = (status)=>{
  switch (status) {
    case APP_CONSTANT.CANCELED:
      return "red"
    case APP_CONSTANT.STARTED:
      return "orange"
    case APP_CONSTANT.PICKED_UP:
      return "#996300"
    case APP_CONSTANT.COMPLETED:
      return "blue"
    default:
        return "green"
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    margin: 10
  },
   image: {
    width: "25%", height: "100%", 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  user_restaurant_infos: {
    flex: 1,
    padding : 10,
},
})
