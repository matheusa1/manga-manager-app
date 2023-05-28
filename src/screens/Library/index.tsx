import { HStack, ScrollView, Text, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import { CardLibrary } from '../../components/CardLibrary'
import { Input } from '../../components/Input'
import { useAuth } from '../../context/UserContext'
import { getUserMangas } from '../../service/api'

export const Library = () => {
  const [search, setSearch] = useState(``)
  const [mangas, setMangas] = useState<getMangaResponseType[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const { userData } = useAuth()

  const onHandleSearch = () => {
    console.log(`search ${search}`)
  }

  const onHandleClick = () => {
    console.log(`click`)
  }

  const getData = useCallback(async () => {
    const mangas = await getUserMangas(userData.token, userData.user.id)
    setMangas(mangas)
  }, [])

  useEffect(() => {
    getData()
    console.log(`a`)
  }, [getData])

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack px={4}>
          <Input
            placeholder="Pesquise um manga"
            search
            onChangeText={(e) => setSearch(e)}
            onSearch={onHandleSearch}
          />
          <ScrollView
            mt={4}
            mb={16}
            minH={`full`}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}
          >
            <HStack maxW={`full`} w={`full`} flexWrap={`wrap`}>
              {mangas.length > 0 ? (
                mangas.map((manga) => {
                  return (
                    <CardLibrary
                      key={manga.MangaID}
                      title={manga.title}
                      onPress={onHandleClick}
                      image={manga.image_url}
                    />
                  )
                })
              ) : (
                <Text color={`white`}>Carregando</Text>
              )}
            </HStack>
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
