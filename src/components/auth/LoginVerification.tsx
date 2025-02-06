"use client"
import { useAuthStore } from "@/stores/authStore"
import { useEffect } from "react"

interface LoginVerificationProps {
    children: React.ReactNode
}

export const LoginVerification = ({children}: LoginVerificationProps) => {
 
    const loginVarification = useAuthStore((state) => state.loginVarification)

    useEffect(() => {
        loginVarification()
    }, [loginVarification])

    return <>{children}</>
}
