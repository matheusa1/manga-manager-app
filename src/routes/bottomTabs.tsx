import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Books, MagnifyingGlass, User } from 'phosphor-react-native'
import React from 'react'

import { Library } from '../screens/Library'
import { Profile } from '../screens/Profile'
import { Search } from '../screens/Search'

const { Navigator, Screen, Group } = createBottomTabNavigator()

export const TabsRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Group
        screenOptions={{
          tabBarActiveTintColor: `#A21CAF`,
          tabBarInactiveTintColor: `#FFFFFF`,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: `#1F1F1F`,
          },
        }}
      >
        <Screen
          name="library"
          component={Library}
          options={{
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({ color, size }) => <Books color={color} size={size} weight="regular" />,
          }}
        />
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
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} weight="regular" />,
          }}
        />
      </Group>
    </Navigator>
  )
}
