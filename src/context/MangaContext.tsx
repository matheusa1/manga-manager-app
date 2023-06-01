import { createContext, useContext, useState } from 'react'

import { getMangaResponseType } from '../@types/GetMangasTypes'
import { getUserMangas } from '../service/api'

type MangaContextType = {
  mangas: getMangaResponseType[]
}

const initialData: MangaContextType = {
  mangas: [],
}

type contextType = {
  mangaData: MangaContextType
  getManga: (token: string, UserId: number) => void
  resetMangaContext: () => void
}

const Context = createContext({} as contextType)

export const MangaContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mangaData, setMangaData] = useState(initialData)

  const getManga = async (token: string, UserId: number) => {
    const response = await getUserMangas(token, UserId)

    setMangaData({ mangas: response })
  }

  const resetMangaContext = () => {
    setMangaData(initialData)
  }

  return (
    <Context.Provider value={{ mangaData, getManga, resetMangaContext }}>
      {children}
    </Context.Provider>
  )
}

export const useManga = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error(`useManga must be used within a MangaContextProvider`)
  }

  return {
    mangaData: context.mangaData,
    updateUserMangas: context.getManga,
    resetMangaContext: context.resetMangaContext,
  }
}
