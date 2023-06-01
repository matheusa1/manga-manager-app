import { useNavigation } from '@react-navigation/native'
import { Button, Center, VStack } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'

export const Profile = () => {
  const { resetUserContext } = useAuth()
  const { resetMangaContext } = useManga()
  const navigation = useNavigation()

  const onHandleLogout = () => {
    resetUserContext()
    resetMangaContext()
    navigation.navigate(`signIn`)
  }

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView>
        <Center>
          <Button onPress={onHandleLogout} px={20}>
            Sair
          </Button>
        </Center>
      </SafeAreaView>
    </VStack>
  )
}
