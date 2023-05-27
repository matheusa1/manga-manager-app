import axios from 'axios'

import { signInOutput } from '../screens/SignIn'
import { signUpOutput } from '../screens/SignUp'

const api = axios.create({
  baseURL: 'https://manga-manager-api.onrender.com/',
})

export const registerUser = async (data: signUpOutput) => {
  try {
    const response = await api.post('auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return response.data
  } catch (error: any) {
    if (error.response.status === 409) {
      return { status: 409, error: 'Email já cadastrado' }
    }
  }
}

export const loginUser = async (data: signInOutput) => {
  try {
    const response = await api.post('auth/login', {
      email: data.email,
      password: data.password,
    })

    return response.data
  } catch (error: any) {
    if (error.response.status === 401) {
      return { status: 401, error: 'Senha incorreta' }
    }
    if (error.response.status === 404) {
      return { status: 404, error: 'Email não cadastrado' }
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
      return { status: 401, error: 'Token inválido' }
    }
  }
}
