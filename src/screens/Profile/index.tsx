import { useNavigation } from '@react-navigation/native'
import { Heading, Text, VStack, useToast } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/Button'
import { Dialog } from '../../components/Dialog'
import { Modal } from '../../components/Modal'
import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'
import { DeleteUser } from '../../service/api'

export const Profile = () => {
  const { resetUserContext, userData } = useAuth()
  const { resetMangaContext } = useManga()
  const navigation = useNavigation()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const Toast = useToast()

  const onHandleLogout = () => {
    resetUserContext()
    resetMangaContext()
    navigation.navigate(`signIn`)
  }

  const onHandleDeleteAccount = async () => {
    setIsLoading(true)
    const response = await DeleteUser(userData.token, userData.user.id)

    if (response.error) {
      setIsLoading(false)

      return
    }

    resetUserContext()
    resetMangaContext()
    navigation.navigate(`signIn`)
    setIsLoading(false)

    Toast.show({
      placement: `top`,
      render: () => (
        <VStack space={4} alignItems="center" bg={`danger.500`} p={4} rounded={8}>
          <Text color="white" fontWeight="bold">
            Conta deletada com sucesso!
          </Text>
        </VStack>
      ),
    })
  }

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack flex={1} px={4} py={8} space={10}>
          <Heading color={`white`} fontSize={`4xl`}>
            Olá, {userData.user.name}
          </Heading>
          <VStack space={4}>
            <Button px={20} title={`Editar perfil`} onPress={() => setIsModalVisible(true)} />
            <Button
              px={20}
              title={`Apagar conta`}
              danger
              onPress={() => setIsDialogVisible(true)}
            />
            <Button onPress={onHandleLogout} title={`Sair`} danger />
          </VStack>
        </VStack>
      </SafeAreaView>
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} />
      <Dialog
        isLoading={isLoading}
        isOpen={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        onPress={onHandleDeleteAccount}
      />
    </VStack>
  )
}
