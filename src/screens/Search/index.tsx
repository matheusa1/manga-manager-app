import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { Box, FlatList, Skeleton, VStack } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Card } from '../../components/Card'
import { Input } from '../../components/Input'

export const Search = () => {
  const navigation = useNavigation()

  const [search, setSearch] = useState('')
  const [mangas, setMangas] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = useCallback(async (search?: string) => {
    console.log(search)
    const options = {
      method: 'GET',
      url: search
        ? `https://myanimelist.p.rapidapi.com/manga/search/${search}/10`
        : 'https://myanimelist.p.rapidapi.com/manga/top/manga',
      headers: {
        'X-RapidAPI-Key': '6b9a0e0155mshc50e632587e1934p184af4jsn9db6ad7f95d5',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
      },
    }
    setLoading(false)
    try {
      const response = await axios.request(options)
      setMangas(response.data)
      setLoading(true)
    } catch (error) {
      console.error(error)
      setLoading(true)
    }
  }, [])

  const onHandleSearch = () => {
    getData(search)
  }

  const onHandleClick = (id: number) => {
    navigation.navigate('mangaDetail', { mangaId: id })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <VStack bg={'muted.900'} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack px={4}>
          <Input
            placeholder="Pesquise seu manga"
            search
            onChangeText={(e) => setSearch(e)}
            onSearch={onHandleSearch}
          />
          <Box w={'full'} mt={8}>
            {loading ? (
              <FlatList
                data={mangas}
                renderItem={({ item }: any) => (
                  <VStack my={1}>
                    <Card
                      onPress={() => onHandleClick(item.myanimelist_id)}
                      title={item.title}
                      image={item.picture_url}
                      description={item.description ? item.description : `Rank: ${item.rank}`}
                    />
                  </VStack>
                )}
              />
            ) : (
              <VStack maxW="400" space={2} overflow="hidden">
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
                <Skeleton h="20" rounded={'md'} startColor={'muted.700'} />
              </VStack>
            )}
          </Box>
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
