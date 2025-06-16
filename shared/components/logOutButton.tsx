'use client'
import { getAuth, signOut } from 'firebase/auth'
import app from '@/firebase'
import { useUserStore } from '@/shared/store/store'

const LogOutButton = () => {
  const {setUser} = useUserStore()

  const logout = async () => {
    const auth = getAuth(app)
    await signOut(auth)

    // Очистить состояние
    setUser(null)
  }

  return <button onClick={logout}>Выйти</button>
}

export default LogOutButton
