import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import LoginImage from '../../assets/LoginImage.jpg'

export const SignIn = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>asdas</Text>
      <Image
        source={LoginImage}
        style={{
          position: 'absolute',
          flex: 1,
          zIndex: -2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '110%',
          zIndex: -1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    </SafeAreaView>
  )
}
