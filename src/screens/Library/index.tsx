import { Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Input } from '../../components/Input'

export const Library = () => {
  const [search, setSearch] = useState('')

  const onHandleSearch = () => {
    console.log(`search ${search}`)
  }

  return (
    <VStack bg={'muted.900'} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <VStack px={4}>
          <Input
            placeholder="Pesquise um manga"
            search
            onChangeText={(e) => setSearch(e)}
            onSearch={onHandleSearch}
          />
          <Text color={'white'}>Library</Text>
        </VStack>
      </SafeAreaView>
    </VStack>
  )
}
