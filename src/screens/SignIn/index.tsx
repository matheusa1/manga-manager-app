import { Center, Heading, VStack } from 'native-base'
import React from 'react'

export const SignIn = () => {
  return (
    <VStack bgColor={'blueGray.700'} flex={1}>
      <Center>
        <Heading my={24} color={'white'}>
          Entre na sua conta
        </Heading>
      </Center>
      <Heading>Crie sua conta</Heading>
    </VStack>
  )
}
