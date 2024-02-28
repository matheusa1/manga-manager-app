import { useNavigation } from '@react-navigation/native'
import { Box, FlatList, Skeleton, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { getMangasBySearchOnMyAnimeList, getTopMangasOnMyAnimeList } from '../../service/api'

export const Search = () => {
  const navigation = useNavigation()

  const [search, setSearch] = useState(``)
  const [mangas, setMangas] = useState<any[]>()
  const [mangasSearched, setMangasSearched] = useState<any[]>()
  const [loading, setLoading] = useState(false)

  const onHandleClick = (id: number) => {
    navigation.navigate(`mangaDetail`, { mangaId: id })
  }

  const onHandleSearch = (search: string) => {
    getData(search)
  }

  const getData = useCallback(async (search?: string) => {
    setLoading(false)

    if (search) {
      const res = await getMangasBySearchOnMyAnimeList(search)
      setMangasSearched(res?.response)
    } else {
      if (mangas) {
        setMangasSearched(undefined)
        return setLoading(true)
      }
      const res = await getTopMangasOnMyAnimeList()

      setMangas(res?.response)
    }
    setLoading(true)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return (
    <VStack bg={`muted.900`} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack px={4}>
          <Input
            placeholder="Pesquise seu manga"
            search
            onChangeText={(e) => setSearch(e)}
            onSearch={() => onHandleSearch(search)}
          />
          <Box w={`full`} mt={8}>
            {loading ? (
              <>
                {mangasSearched ? (
                  <FlatList
                    data={mangasSearched}
                    renderItem={({ item }: { item: any }) => (
                      <VStack my={1}>
                        <Card
                          onPress={() => onHandleClick(item.myanimelist_id)}
                          title={item.title}
                          image={item.picture_url}
                        />
                      </VStack>
                    )}
                  />
                ) : (
                  <FlatList
                    data={mangas}
                    renderItem={({ item }: { item: any }) => (
                      <VStack my={1}>
                        <Card
                          onPress={() => onHandleClick(item.myanimelist_id)}
                          title={item.title}
                          image={item.picture_url}
                        />
                      </VStack>
                    )}
                  />
                )}
              </>
            ) : (
              <VStack maxW="400" space={2} overflow="hidden">
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
                <Skeleton h="20" rounded={`md`} startColor={`muted.700`} />
              </VStack>
            )}
          </Box>
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
