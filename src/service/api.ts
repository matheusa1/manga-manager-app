import axios from 'axios'

import { signInOutput } from '../screens/SignIn'
import { signUpOutput } from '../screens/SignUp'

const api = axios.create({
  baseURL: `https://manga-manager-api.onrender.com/`,
})

export const registerUser = async (data: signUpOutput) => {
  try {
    const response = await api.post(`auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return response.data
  } catch (error: any) {
    if (error.response.status === 409) {
      return { status: 409, error: `Email já cadastrado` }
    }
  }
}

export const loginUser = async (data: signInOutput) => {
  try {
    const response = await api.post(`auth/login`, {
      email: data.email,
      password: data.password,
    })

    return response.data
  } catch (error: any) {
    if (error.response.status === 401) {
      return { status: 401, error: `Senha incorreta` }
    }
    if (error.response.status === 404) {
      return { status: 404, error: `Email não cadastrado` }
    }
  }
}

export const getUserMangas = async (token: string, UserId: number) => {
  try {
    const response = await api.get(`user/mangas/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // console.log(response.data)
    return response.data.response
  } catch (error: any) {
    if (error.response.status === 401) {
      return { status: 401, error: `Token inválido` }
    }
  }
}

type addMangaMangaProps = {
  title: string
  image_url: string
  myAnimeListID: number
  volumes: number
}

export const addMangaToUser = async (token: string, UserId: number, manga: addMangaMangaProps) => {
  try {
    const response = await api.post(
      `manga/${UserId}`,
      {
        title: manga.title,
        image_url: manga.image_url,
        myAnimeListID: manga.myAnimeListID,
        volumes: manga.volumes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const removeManga = async (token: string, userID: number, MangaID: number) => {
  try {
    const response = await api.delete(`manga/${userID}/${MangaID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const updateMangaQuantity = async (
  token: string,
  userID: number,
  MangaID: number,
  quantity: number,
) => {
  try {
    const response = await api.put(
      `manga/volumes/${userID}`,
      { volumes: quantity, MangaID: MangaID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const updateMangaVolumesOwned = async (
  token: string,
  userID: number,
  MangaID: number,
  volumesOwned: number[],
) => {
  try {
    const response = await api.put(
      `manga/volumes-owned/${userID}`,
      {
        MangaID,
        volumesOwned,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
