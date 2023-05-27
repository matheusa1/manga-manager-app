import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type MangaDetailProps = {
  mangaId: number
}

export const MangaDetail = () => {
  const route = useRoute()
  const param = route.params as MangaDetailProps

  const id = param.mangaId

  return (
    <SafeAreaView>
      <Text>{id}</Text>
    </SafeAreaView>
  )
}
