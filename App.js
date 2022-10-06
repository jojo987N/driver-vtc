import { View, SafeAreaView, StatusBar} from "react-native";
import RootNavigation from "./navigation/navigation";
import {} from "./firebase"
import "intl"
import "intl/locale-data/jsonp/en"

export default function App() {

  return (
     
      <SafeAreaView 
        style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
       
      <RootNavigation />
       </SafeAreaView>
      
  
     
  );
}
