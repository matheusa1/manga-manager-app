import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Books, MagnifyingGlass } from 'phosphor-react-native'
import React from 'react'

import { Library } from '../screens/Library'
import { Search } from '../screens/Search'

const { Navigator, Screen } = createBottomTabNavigator()

export const TabsRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlass color={color} size={size} weight="regular" />
          ),
        }}
      />
      <Screen
        name="library"
        component={Library}
        options={{
          tabBarIcon: ({ color, size }) => <Books color={color} size={size} weight="regular" />,
        }}
      />
    </Navigator>
  )
}
