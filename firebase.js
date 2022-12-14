import { initializeApp } from 'firebase/app'
import {
  addDoc, getFirestore, collection, getDocs, doc,
  deleteDoc, orderBy, query, limit, serverTimestamp, onSnapshot,
  updateDoc, where
} from 'firebase/firestore'
import { Alert, LogBox } from 'react-native';
import { getAuth } from 'firebase/auth';
import { APP_CONSTANT } from './global';
LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

const firebaseConfig = {
  apiKey: {/* Your firebase config here */ },
  authDomain: {/* Your firebase config here */ },
  projectId: {/* Your firebase config here */ },
  storageBucket: {/* Your firebase config here */ },
  messagingSenderId: {/* Your firebase config here */ },
  appId: {/* Your firebase config here */ },

  // apiKey: "AIzaSyDrKqjM-fKGWBqj0-wpOOrIbeVlViEW-3c",
  // authDomain: "good-food-c84d4.firebaseapp.com",
  // projectId: "good-food-c84d4",
  // storageBucket: "good-food-c84d4.appspot.com",
  // messagingSenderId: "716731554402",
  // appId: "1:716731554402:web:bc8a1748f6cdd6885e8f3b",
  // measurementId: "G-VLK10R4D2P"

  apiKey: "AIzaSyB0H7auEwu7jBLcA0mntkoBB9C82ofaQZE",
  authDomain: "driver-vtc-64928.firebaseapp.com",
  projectId: "driver-vtc-64928",
  storageBucket: "driver-vtc-64928.appspot.com",
  messagingSenderId: "921547218183",
  appId: "1:921547218183:web:40ecb5d81d5a7530f179a2"

  

};
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore()
export const ordersCol = collection(db, 'orders')
export const getOrdersSimple = () => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
  const orders = []
  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        orders.push(doc.data())
        console.log(doc.id)
      })
      return orders
    })
}
export const getOrders1 = () => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
  const orders = []
  onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().createdAt) {
        orders.push(doc.data())
      }
    })
  })
}
export const driversCol = collection(db, 'drivers')
export const addDriver = async (userCredentials, name, phone) => {
  addDoc(driversCol, {
    id: userCredentials.user.uid,
    name: name,
    email: userCredentials.user.email,
    phone: phone,
    onOff: APP_CONSTANT.OFFLINE,
    wallet: 0
  })
    .then(() => console.log('user create'))
}
const addOrder = async () => {
  const docRef = await addDoc(collection(db, "orders"), {
    Restaurant: {
      name: "Pizza Hutttz58",
      lat: 4.071510,
      lng: 9.731240,
      address: "Los Angeles "
    },
    User: {
      name: "Jojo",
      lat: 4.068140,
      lng: 9.741590,
      phone: "134567889900",
      address: "Los Angeles",
      items: ["Big Mac", "Cheese Burger", "juice"]
    },
    status: "New",
    createdAt: serverTimestamp(),
  })
  console.log(docRef.id)
}
export const updateOrder = (order, status, location, userData) => {
  const docRef = doc(db, 'orders', order.id)

  const obj = {
    Driver: {
      ...userData,
      location, 
    },
    // totalMinutes,
    status: status,
    // remainingTime: totalMinutes 

  }
  return updateDoc(docRef, {
    ...obj
    // status: status,
    // driverId: auth.currentUser?.uid,
  })
}

export const updateOrderStarted = (orderId, totalMinutes) => {
  updateDoc(doc(db, 'orders', orderId), {
    
    remainingTimeForPickup: Math.floor(totalMinutes),
    remainingTime: totalMinutes*60,
  })
}

export const updateOrderAccepted = (orderId, status, totalMinutes) => {
  updateDoc(doc(db, 'orders', orderId), {
    status,
    remainingTimeForPickup: Math.floor(totalMinutes),
    remainingTime: totalMinutes*60,
  })
}

export const updateWallet = (amount) => {
  const q = query(driversCol, where('id', '==', auth.currentUser?.uid))
  return getDocs(q).then(snapshot => {
    snapshot.docs.forEach(docc => {
      updateDoc(doc(db, 'drivers', docc.id), {
        wallet: docc.data().wallet + amount,
      }).then(() => console.log('Updated'))
    })
  })
}

export const updateOrderStatus = (orderId, status) => {
  updateDoc(doc(db, 'orders', orderId), {
    status
  })
}
const deleteOrder = () => {
  const docRef = doc(db, 'orders', "mxpdee9yriPV5pIE6Zbx")
  deleteDoc(docRef)
    .then(() => {
      console.log("supprim??")
    })
}
export const updateDriverOnOff = (onOff) => {
  const q = query(driversCol, where('id', '==', auth.currentUser?.uid))
  getDocs(q).then(snapshot => {
    snapshot.docs.forEach(docc => {
      updateDoc(doc(db, 'drivers', docc.id), {
        onOff: onOff,
      }).then(() => console.log('Updated'))
    })
  })
}
export const updateDriverLatLng = () => {
  const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
  getDocs(q).then(snapshot => {
    snapshot.docs.forEach(docc => {
      updateDoc(doc(db, 'drivers', docc.id), {
        lat: 4.091252,
        lng: 9.741085
      }).then(() => console.log('Updated'))
    })
  })
}
export const getDriverAvailability = () => {
  const q = query(driversCol, where('Id', '==', auth.currentUser?.uid))
  return getDocs(q)
}
export const getOrders = () => {
  const q = query(ordersCol, where('driverId', '==', auth.currentUser?.uid))
  return getDocs(q).then(snapshot => {
    return snapshot.docs.map((doc) => doc.data())
  })
}
const getOrderMultipleItems = () => {
  getDocs(ordersCol).then(snapshot => {
    snapshot.docs.forEach(doc => {
      if (doc.data().User.items.length > 2)
        console.log(doc.data().orderId)
    })
  })
}
export const getDriverInfos = () => {
  const q = query(driversCol, where('id', '==', auth.currentUser?.uid))
  return getDocs(q).then(snapshot => {
    return snapshot.docs.map((doc) => ({driverId: doc.id, ...doc.data()}) )
  })
}

export const updateDriver = (driver_id, image) => {
  const docRef = doc(db, 'drivers', driver_id)
  updateDoc(docRef, {
    image: image,
  })
    .then(() => console.log('good'))
}

export const updateDriverField = (driver_id, obj) => {
  const docRef = doc(db, 'drivers', driver_id)
  return updateDoc(docRef, {
    [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]],
  })
    // .then(() => console.log('good'))
}

export const updateDriverInfos = (userData, email, name, lastName, address, city, postalCode, phone, carNumber, setUserData) => {
  const docRef = doc(db, 'drivers', userData.driverId)
  const data = {
    email,
    name,
    lastName,
    phone,
    address,
    // address: address.description,
    // lat: address.location.lat,
    // lng: address.location.lng,
    city,
    postalCode,
    carNumber,
    updatedAt: serverTimestamp()
  }
  //  console.log([...arguments].every(param => {
  //   console.log(param, typeof param)
  //  }))
  //  if([...arguments].every(param => param !== ""))
  if(email != "" && name != "" && lastName != "" && address != "" && city != "" && postalCode != "" && phone != "" && carNumber != "")
  return updateDoc(docRef, data)
    .then(() => setUserData({
      ...userData,
      ...data
    }))
    else Alert.alert("Vous devez remplir tous les champs")
}