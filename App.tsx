import { StatusBar, View } from 'react-native'

import { Routes } from './src/routes'

export default function App() {
  return (
    <View
      style={{
        backgroundColor: '#F00',
        flex: 1,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </View>
  )
}
