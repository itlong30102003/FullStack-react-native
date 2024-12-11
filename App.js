import { Text, View } from "react-native"
import MainRouter from "./routes/MainRouter"
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';   
import { MyContextControllerProvider } from "./context";

const App=()=>{
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
          <PaperProvider>
            <MainRouter/>
          </PaperProvider>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
export default App