import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { StackRoute } from './stack'

export const Routes = () => {
  return (
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
  )
}
