import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()
export const StackRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
