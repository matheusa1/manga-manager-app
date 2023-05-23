import { Center, HStack, Pressable, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Title } from '../../components/Title'

export const SignIn = () => {
  const { control, handleSubmit } = useForm()

  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const onHandleSingUp = () => {
    console.log('press')
  }

  const onHandleSignIn = (data: any) => {
    console.log(data)
  }

  return (
    <VStack bgColor={'muted.900'} flex={1} px={10}>
      <Center flex={1}>
        <VStack width={'full'} space={10}>
          <Center>
            <Title>Entre na sua conta</Title>
          </Center>
          <VStack width={'full'} space={4}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input
                  label="Email"
                  errorMessage={emailErrorMessage}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  label="Senha"
                  errorMessage={passwordErrorMessage}
                  onChangeText={onChange}
                  password
                />
              )}
            />
          </VStack>
          <Button title="Entrar" onPress={handleSubmit(onHandleSignIn)} />
          <Center>
            <HStack>
              <Text color={'white'}>Não possui conta? </Text>
              <Pressable onPress={onHandleSingUp}>
                <Text color={'info.500'}>Cadastre-se aqui!</Text>
              </Pressable>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </VStack>
  )
}
