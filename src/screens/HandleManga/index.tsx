import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  AlertDialog,
  Center,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Button as NButton,
  ScrollView,
  Text,
  Toast,
  VStack,
} from 'native-base'
import { Modal } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { getMangaResponseType } from '../../@types/GetMangasTypes'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { useManga } from '../../context/MangaContext'
import { useAuth } from '../../context/UserContext'
import { removeManga, updateMangaQuantity, updateMangaVolumesOwned } from '../../service/api'

const ModalSchema = z.object({
  quantity: z
    .string()
    .min(1, `Campo obrigatório`)
    .refine((value) => Number(value) > 0, {
      message: `Quantidade deve ser maior que 0`,
    })
    .transform((value) => Number(value)),
})

type ModalOutput = z.output<typeof ModalSchema>

export const HandleManga = () => {
  const route = useRoute()
  const param = route.params as getMangaResponseType
  const manga = param

  const { userData } = useAuth()
  const { updateUserMangas } = useManga()

  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalOutput>({
    resolver: zodResolver(ModalSchema),
  })

  const [chapters, setChapters] = useState<number[]>(manga.volumesOwned)
  const [quantity, setQuantity] = useState<number>(manga.volumes)
  const [changed, setChanged] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [isChangeChapterLoading, setIsChangeChapterLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const cancelRef = useRef(null)

  const onHandleRemove = async () => {
    setIsDeleteLoading(true)
    const res = await removeManga(userData.token, userData.user.id, manga.myAnimeListID)

    console.log(res, manga.MangaID)

    updateUserMangas(userData.token, userData.user.id)

    setIsDeleteLoading(false)
    setIsAlertOpen(false)
    updateUserMangas(userData.token, userData.user.id)
    navigation.goBack()
  }

  const onSubmit = async (data: ModalOutput) => {
    console.log(data)
    setIsChangeChapterLoading(true)
    const response = await updateMangaQuantity(
      userData.token,
      userData.user.id,
      manga.MangaID,
      data.quantity,
    )
    console.log(response)
    setQuantity(data.quantity)
    setIsChangeChapterLoading(false)
    setIsModalOpen(false)

    updateUserMangas(userData.token, userData.user.id)
  }

  const onCheckboxClick = (item: number) => {
    setChanged(true)
    if (chapters.includes(item)) {
      setChapters(chapters.filter((chapter) => chapter !== item))
    } else {
      setChapters([...chapters, item].sort((a, b) => a - b))
    }
  }

  const onHandleSave = async () => {
    setIsSaveLoading(true)
    const response = await updateMangaVolumesOwned(
      userData.token,
      userData.user.id,
      manga.MangaID,
      chapters,
    )
    console.log(response)
    setIsSaveLoading(false)
    Toast.show({
      placement: `top`,
      render: () => (
        <VStack space={4} alignItems="center" bg={`success.500`} p={4} rounded={8}>
          <Text color="white" fontWeight="bold">
            Salvo com sucesso!
          </Text>
        </VStack>
      ),
    })

    updateUserMangas(userData.token, userData.user.id)
  }

  return (
    <VStack bg={`muted.900`} flex={1}>
      <VStack flex={0.3} position={`relative`}>
        <Image
          resizeMode="cover"
          w="full"
          h="full"
          source={{ uri: manga.image_url }}
          alt={`image`}
          zIndex={-2}
        />
        <VStack
          width={`100%`}
          height={`100%`}
          zIndex={-1}
          position={`absolute`}
          bg={`muted.900`}
          opacity={50}
        />
      </VStack>
      <ScrollView h={`1`}>
        <VStack flex={1} p={4} space={4}>
          <VStack alignItems={`center`} space={4}>
            <Heading color={`white`}>{manga.title}</Heading>
            <HStack w={`full`} justifyContent={`space-between`} px={4}>
              <NButton bg={`success.600`} onPress={() => setIsModalOpen(true)}>
                <Text color={`white`} fontSize={`xs`}>
                  Mudar quantidade de capítulos
                </Text>
              </NButton>
              <NButton bg={`danger.500`} onPress={() => setIsAlertOpen(true)}>
                Deletar manga
              </NButton>
            </HStack>
          </VStack>

          {quantity === -1 ? (
            <Center>
              <Text color={`white`}>Quantidade de capítulos não informada</Text>
            </Center>
          ) : (
            <Center>
              <HStack alignItems={`center`} flexWrap={`wrap`} w={`80`}>
                {[...Array(quantity)].map((_, index) => (
                  <Center ml={index % 4 === 0 && index !== 2 ? 0 : 4} mb={4} key={index}>
                    <Checkbox
                      label={index + 1}
                      onClick={() => onCheckboxClick(index + 1)}
                      checked={chapters.includes(index + 1)}
                    />
                  </Center>
                ))}
              </HStack>
            </Center>
          )}
        </VStack>
      </ScrollView>
      {changed && (
        <Center position={`absolute`} top={10} right={4}>
          <Button title={`Salvar`} onPress={onHandleSave} isLoading={isSaveLoading} />
        </Center>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Mudar quantidade de capítulos</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={!!errors.quantity}>
              <FormControl.Label>Quantidade</FormControl.Label>
              <Controller
                control={control}
                name="quantity"
                render={({ field: { onChange } }) => (
                  <Input
                    placeholder="asd"
                    keyboardType="number-pad"
                    onChangeText={onChange}
                    _focus={{
                      borderColor: `success.600`,
                      backgroundColor: `white`,
                    }}
                  />
                )}
              />
              <FormControl.ErrorMessage>{errors.quantity?.message}</FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              title={`Salvar`}
              onPress={handleSubmit(onSubmit)}
              isLoading={isChangeChapterLoading}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack alignItems={`center`} position={`absolute`} top={10} left={5}>
        <IconButton
          size={`md`}
          icon={<CaretLeft size={24} color={`white`} />}
          onPress={navigation.goBack}
        ></IconButton>
      </VStack>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            Remover da biblioteca
          </AlertDialog.Header>
          <AlertDialog.Body>
            Tem certeza que deseja remover esse mangá da sua biblioteca?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <NButton ref={cancelRef} onPress={() => setIsAlertOpen(false)}>
              Cancelar
            </NButton>
            <NButton colorScheme="red" onPress={onHandleRemove} ml={3} isLoading={isDeleteLoading}>
              Remover
            </NButton>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  )
}
