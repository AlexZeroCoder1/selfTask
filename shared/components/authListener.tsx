'use client'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '@/firebase'
import { useUserStore } from '@/shared/store/store'
import { useRouter } from 'next/navigation'

const AuthListener = () => {
  const setUser = useUserStore((state) => state.setUser)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)

      // редирект если пользователь авторизован
      if (!user) {
        router.push('/auth')
      }
    })

    return () => unsubscribe()
  }, [setUser, router])

  return null
}

export default AuthListener