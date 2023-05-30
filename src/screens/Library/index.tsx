import { useNavigation } from '@react-navigation/native'
import { HStack, Pressable, ScrollView, Text, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import { CardLibrary } from '../../components/CardLibrary'
import { Input } from '../../components/Input'
import { useAuth } from '../../context/UserContext'
import { getUserMangas } from '../../service/api'

export const Library = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState(``)
  const [mangas, setMangas] = useState<getMangaResponseType[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const { userData } = useAuth()

  const onHandleSearch = () => {
    console.log(`search ${search}`)
  }

  const getData = useCallback(async () => {
    setRefreshing(true)
    await getUserMangas(userData.token, userData.user.id).then((response) => {
      setRefreshing(false)
      setMangas(response)
    })
  }, [])

  useEffect(() => {
    getData()
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
                    <Pressable
                      onPress={() => navigation.navigate(`handleManga`, manga)}
                      _pressed={{
                        opacity: 0.5,
                      }}
                      bg={`muted.800`}
                      w={40}
                      h={80}
                      rounded={8}
                      p={1}
                      pb={2}
                      mb={4}
                      mx={2}
                      key={manga.MangaID}
                    >
                      <CardLibrary title={manga.title} image={manga.image_url} />
                    </Pressable>
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
