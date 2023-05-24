import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Center, HStack, Pressable, Text, VStack } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Title } from '../../components/Title'

const signInSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email('Formato de email inválido'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
})

type signInInput = z.input<typeof signInSchema>
type signInOutput = z.output<typeof signInSchema>

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInInput>({
    resolver: zodResolver(signInSchema),
  })
  const navigation = useNavigation()

  const [passwordError, setPasswordError] = React.useState('')
  const [emailError, setEmailError] = React.useState('')

  const onHandleSingUp = () => {
    navigation.navigate('signUp')
  }

  const onHandleSignIn = async (data: signInOutput) => {
    try {
      const response = await axios.post('http://192.168.1.15:3333/auth/login', data)
      console.log(response.data)
      setPasswordError('')
    } catch (error: any) {
      console.log(error.response.status)

      if (error.response.status === 401) {
        setPasswordError('Senha inválida')
      }

      if (error.response.status === 404) {
        setEmailError('Email não encontrado')
      }
    }
    // navigation.navigate('tabs')
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
                  errorMessage={errors.email?.message || emailError}
                  onChangeText={onChange}
                  onChange={() => setEmailError('')}
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
                  errorMessage={errors.password?.message || passwordError}
                  onChangeText={onChange}
                  onChange={() => setPasswordError('')}
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
