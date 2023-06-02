import { useNavigation } from '@react-navigation/native'
import { Heading, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'

export const Profile = () => {
  const { resetUserContext, userData } = useAuth()
  const { resetMangaContext } = useManga()
  const navigation = useNavigation()

  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const onHandleLogout = () => {
    resetUserContext()
    resetMangaContext()
    navigation.navigate(`signIn`)
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
            <Button px={20} title={`Apagar conta`} danger />
            <Button onPress={onHandleLogout} title={`Sair`} danger />
          </VStack>
        </VStack>
      </SafeAreaView>
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </VStack>
  )
}
