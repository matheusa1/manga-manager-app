import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type userContextType = {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

const initialData: userContextType = {
  token: '',
  user: {
    id: 0,
    name: '',
    email: '',
  },
}

type contextType = {
  userData: userContextType
  setUserData: Dispatch<SetStateAction<userContextType>>
}

const Context = createContext({} as contextType)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState(initialData)

  return <Context.Provider value={{ userData, setUserData }}>{children}</Context.Provider>
}

export const useAuth = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useAmount must be used within a AmountContextProvider')
  }

  return {
    userData: context.userData,
    setUserData: context.setUserData,
  }
}
