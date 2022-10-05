import * as Location from 'expo-location';
import { useStripe } from '@stripe/stripe-react-native';


export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }



// export const getLocation = async (setLocation, route, bottomSheet) => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       return;
//     }
//     let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
//     setLocation({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude
//     });
//     if(route.params.myLocation)
//     bottomSheet?.current.collapse()
//   }

export const stripePayment = (stripe, amount2, setModalVisible, setAmount) => {

 // const stripe = useStripe();


  fetch("http://192.241.139.136:3000/", {
    method: 'POST',
    body: JSON.stringify({
      amount: 1099,
      currency: 'usd',
      // payment_method_types: ['card'],
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response)=>{
      
      response.json().then(json =>{
           console.log(json)

          stripe.initPaymentSheet({
              // customerId: json.customer,
              // customerEphemeralKeySecret: json.ephemeralKey,
              paymentIntentClientSecret: json.paymentIntent,
              merchantDisplayName: 'Merchant Name',
              // allowsDelayedPaymentMethods: true,
              // paymentIntentClientSecret: json.clientSecret,
            }).then(initSheet => {
                console.log(initSheet)

                stripe.presentPaymentSheet({
                    clientSecret:  json.paymentIntent
                }).then(presentSheet =>{
                    console.log(presentSheet)
                })
            })
          
      })
      // console.log(JSON.stringify(response.json()))
  })
}
