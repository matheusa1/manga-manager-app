import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { HandleManga } from '../screens/HandleManga'
import { MangaDetail } from '../screens/MangaDetail'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'
import { TabsRoutes } from './bottomTabs'

const { Navigator, Screen } = createNativeStackNavigator()
export const StackRoute = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="tabs" component={TabsRoutes} />
      <Screen name="mangaDetail" component={MangaDetail} />
      <Screen name="handleManga" component={HandleManga} />
    </Navigator>
  )
}
