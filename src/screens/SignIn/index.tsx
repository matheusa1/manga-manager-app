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
import { useAuth } from '../../context/UserContext'
import { loginUser } from '../../service/api'

const signInSchema = z.object({
  email: z.string().nonempty(`O e-mail é obrigatório`).email(`Formato de email inválido`),
  password: z
    .string()
    .nonempty(`A senha é obrigatória`)
    .min(6, `A senha deve conter no mínimo 6 caracteres`),
})

type signInInput = z.input<typeof signInSchema>
export type signInOutput = z.output<typeof signInSchema>

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInInput>({
    resolver: zodResolver(signInSchema),
  })
  const navigation = useNavigation()
  const { setUserData } = useAuth()

  const [passwordError, setPasswordError] = React.useState(``)
  const [emailError, setEmailError] = React.useState(``)
  const [isLoading, setIsLoading] = React.useState(false)

  const onHandleSingUp = () => {
    navigation.navigate(`signUp`)
  }

  const onHandleSignIn = async (data: signInOutput) => {
    setIsLoading(true)
    const response = await loginUser(data)

    if (response.status === 404) {
      setIsLoading(false)

      return setEmailError(`Email não cadastrado`)
    } else {
      setEmailError(``)
    }

    if (response.status === 401) {
      setIsLoading(false)

      return setPasswordError(`Senha incorreta`)
    } else {
      setPasswordError(``)
    }

    setUserData({
      token: response.token,
      user: response.user,
    })

    axios.defaults.headers.common[`Authorization`] = `Bearer ${response.token}`

    setIsLoading(false)

    navigation.navigate(`tabs`)
  }

  return (
    <VStack bgColor={`muted.900`} flex={1} px={10}>
      <Center flex={1}>
        <VStack width={`full`} space={10}>
          <Center>
            <Title>Entre na sua conta</Title>
          </Center>
          <VStack width={`full`} space={4}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <Input
                  label="Email"
                  errorMessage={errors.email?.message || emailError}
                  onChangeText={onChange}
                  onChange={() => setEmailError(``)}
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
                  onChange={() => setPasswordError(``)}
                  password
                />
              )}
            />
          </VStack>
          <Button title="Entrar" isLoading={isLoading} onPress={handleSubmit(onHandleSignIn)} />
          <Center>
            <HStack>
              <Text color={`white`}>Não possui conta? </Text>
              <Pressable onPress={onHandleSingUp}>
                <Text color={`info.500`}>Cadastre-se aqui!</Text>
              </Pressable>
            </HStack>
          </Center>
        </VStack>
      </Center>
    </VStack>
  )
}
