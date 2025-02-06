import axios from "axios"
import { create } from "zustand"

interface userPayload{
    id: string
    nombre: string
    apellido: string
    email: string
    esConductor: boolean
    activo: boolean
}

interface AuthStore{
    userPayload: userPayload,
    loadingUserPayload: boolean,
    isAuthenticated: boolean,
    setUserPayload: (payload: any) => void,
    setLoadingUserPayload: (loading: boolean) => void
    setIsAuthenticated: (isAuthenticated: boolean) => void
    loginVarification: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    userPayload: {
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        esConductor: false,
        activo: false
    },
    loadingUserPayload: true,
    isAuthenticated: false,
    setUserPayload: (payload: any) => set({ userPayload: payload }),
    setLoadingUserPayload: (loading: boolean) => set({ loadingUserPayload: loading }),
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated: isAuthenticated }),

    loginVarification: async() => {
       try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/loginVerification`, { credentials: 'include' })
            const data = await res.json()
            
            if (res.status === 401) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshAccessToken`, { credentials: 'include' })
                const data = await res.json()
                
                if (res.status === 401){
                    set({ isAuthenticated: false })
                    set({ loadingUserPayload: false })
                    return
                }

                set({ userPayload: data.user })
                set({ isAuthenticated: true })
                set({ loadingUserPayload: false })
                return
            }

            set({ userPayload: data.user })
            set({ isAuthenticated: true })
            set({ loadingUserPayload: false })
       }catch(error){
           if (axios.isAxiosError(error)) {
            console.log(error.response?.data.message)
           }
       }
    }
}))