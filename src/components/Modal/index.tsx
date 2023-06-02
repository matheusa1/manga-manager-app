import { zodResolver } from '@hookform/resolvers/zod'
import { HStack, Heading, Modal as NBModal } from 'native-base'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../Button'
import { Input } from '../Input'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const editProfileSchema = z
  .object({
    name: z.string().min(3, `O nome precisa ter no mínimo 3 caracteres`),
    password: z.string().min(6, `A senha precisa ter no mínimo 6 caracteres`),
    confirmPassword: z.string().min(6, `A senha precisa ter no mínimo 6 caracteres`),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: `As senhas não conferem`,
    path: [`password_confirmation`],
  })

type editProfileSchemaType = z.infer<typeof editProfileSchema>

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = (data: editProfileSchemaType) => {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  return (
    <NBModal isOpen={isOpen} onClose={onClose}>
      <NBModal.Content bg={`muted.800`}>
        <NBModal.CloseButton color={`white`} />
        <NBModal.Header bg={`muted.800`} borderBottomColor={`muted.800`}>
          <Heading color={`white`}>Editar perfil</Heading>
        </NBModal.Header>
        <NBModal.Body>
          <Controller
            control={control}
            name={`name`}
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                keyboardType={`default`}
                label={`Nome`}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name={`password`}
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                label={`Senha`}
                errorMessage={errors.password?.message}
                password
              />
            )}
          />
          <Controller
            control={control}
            name={`confirmPassword`}
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                label={`Confirmar senha`}
                errorMessage={errors.confirmPassword?.message}
                password
              />
            )}
          />
        </NBModal.Body>
        <NBModal.Footer bg={`muted.800`} borderTopColor={`muted.800`}>
          <HStack space={4}>
            <Button title={`Cancelar`} danger />
            <Button title={`Salvar`} isLoading={isLoading} onPress={handleSubmit(onSubmit)} />
          </HStack>
        </NBModal.Footer>
      </NBModal.Content>
    </NBModal>
  )
}
