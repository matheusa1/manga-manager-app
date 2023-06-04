import { useNavigation } from '@react-navigation/native'
import { Box, FlatList, Skeleton, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { JikanRecomendationsResponseData } from '../../@types/JikanRecomendationsResponse'
import { JikanSearchResponseDataType } from '../../@types/JikanSearchResponse'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { getMangasBySearchOnJikan, getTopMangasOnJikan } from '../../service/api'

export const Search = () => {
  const navigation = useNavigation()

  const [search, setSearch] = useState(``)
  const [mangas, setMangas] = useState<JikanRecomendationsResponseData[]>()
  const [mangasSearched, setMangasSearched] = useState<JikanSearchResponseDataType[]>()
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
      const res = await getMangasBySearchOnJikan(search)
      setMangasSearched(res?.response?.data)
    } else {
      if (mangas) {
        setMangasSearched(undefined)
        return setLoading(true)
      }
      const res = await getTopMangasOnJikan(1)
      setMangas(res?.response?.data)
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
                    renderItem={({ item }: { item: JikanSearchResponseDataType }) => (
                      <VStack my={1}>
                        <Card
                          onPress={() => onHandleClick(item.mal_id)}
                          title={item.title}
                          image={item.images.jpg.large_image_url}
                        />
                      </VStack>
                    )}
                  />
                ) : (
                  <FlatList
                    data={mangas}
                    renderItem={({ item }: { item: JikanRecomendationsResponseData }) => (
                      <VStack my={1}>
                        <Card
                          onPress={() => onHandleClick(item.entry[0].mal_id)}
                          title={item.entry[0].title}
                          image={item.entry[0].images.jpg.large_image_url}
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
