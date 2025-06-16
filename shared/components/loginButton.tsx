'use client'
import app from '@/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const LoginButton = () => {
  const router = useRouter()

  const login = async () => {
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/home')
    } catch (error) {
      
    }
  }

  return <button onClick={login}>Войти через Google</button>
}

export default LoginButton