import { create } from 'zustand'
import { User } from 'firebase/auth'

type UserStore = {
    user: User | null
    errors: string[]
    setUser: (user: User | null) => void
    addError: (error: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    errors: [],
    setUser: (user) => set({ user }),
    addError: (error) => {
        console.log(error)
        set(state => ({ errors: [...state.errors, error] }))
        setTimeout(() => {
            set(state => ({ errors: state.errors.slice(1) }))
        }, 3000)
    }
}))
