import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { Center, Pressable, VStack } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Title } from '../../components/Title'

const signUpSchema = z
  .object({
    name: z.string().nonempty('O nome é obrigatório'),
    email: z.string().nonempty('O e-mail é obrigatório').email('Formato de email inválido'),
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    password_confirmation: z
      .string()
      .nonempty('A confirmação de senha é obrigatória')
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não conferem',
    path: ['password_confirmation'],
  })

type signUpInput = z.input<typeof signUpSchema>
type signUpOutput = z.output<typeof signUpSchema>

export const SignUp = () => {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  const onHandleSingUp = (data: signUpOutput) => {
    console.log(data)
  }

  return (
    <VStack flex={1} bg={'muted.900'} pt={10} px={4}>
      <Pressable onPress={navigation.goBack}>
        <CaretLeft size={32} color="white" weight="regular" />
      </Pressable>
      <Center flex={1}>
        <VStack width={'full'} space={10}>
          <Center>
            <Title>Crie sua conta</Title>
          </Center>
          <VStack width={'full'} space={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  label="Nome"
                  errorMessage={errors.name?.message}
                  onChangeText={onChange}
                  keyboardType="default"
                />
              )}
            />
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
            <Controller
              control={control}
              name="password_confirmation"
              render={({ field: { onChange } }) => (
                <Input
                  label="Confirme sua senha"
                  errorMessage={errors.password_confirmation?.message}
                  onChangeText={onChange}
                  password
                />
              )}
            />
          </VStack>
          <Button title="Criar conta" onPress={handleSubmit(onHandleSingUp)} />
        </VStack>
      </Center>
    </VStack>
  )
}
