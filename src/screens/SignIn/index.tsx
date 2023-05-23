import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
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

  const onHandleSingUp = () => {
    navigation.navigate('signUp')
  }

  const onHandleSignIn = (data: signInOutput) => {
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
                  errorMessage={errors.email?.message}
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
                  errorMessage={errors.password?.message}
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
