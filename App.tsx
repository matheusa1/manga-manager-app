import { NativeBaseProvider } from 'native-base'
import { StatusBar, View } from 'react-native'

import { MangaContextProvider } from './src/context/MangaContext'
import { AuthContextProvider } from './src/context/UserContext'
import { Routes } from './src/routes'

export default function App() {
  return (
    <AuthContextProvider>
      <MangaContextProvider>
        <View
          style={{
            flex: 1,
          }}
        >
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <NativeBaseProvider>
            <Routes />
          </NativeBaseProvider>
        </View>
      </MangaContextProvider>
    </AuthContextProvider>
  )
}
