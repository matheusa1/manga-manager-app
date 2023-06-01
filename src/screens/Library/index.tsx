import { useNavigation } from '@react-navigation/native'
import { HStack, Pressable, ScrollView, Text, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import { CardLibrary } from '../../components/CardLibrary'
import { Input } from '../../components/Input'
import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'

export const Library = () => {
  const { mangaData } = useManga()
  const navigation = useNavigation()
  const [search, setSearch] = useState(``)
  const [filteredMangas, setFilteredMangas] = useState<getMangaResponseType[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const { userData } = useAuth()

  const onHandleSearch = () => {
    console.log(`search ${search}`)
    const filtered = mangaData.mangas.filter((manga) => {
      return manga.title.toLowerCase().includes(search.toLowerCase())
    })

    setFilteredMangas(filtered)
  }

  const getData = useCallback(async () => {
    setRefreshing(true)
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getData()
  }, [getData, mangaData])

  console.log({ Teste: mangaData })

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
              {mangaData.mangas.length > 0 ? (
                filteredMangas.map((manga) => {
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
