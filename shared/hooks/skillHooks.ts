import { useEffect, useState } from "react"
import { useUserStore } from "../store/store"
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { defaultSkills, Skill } from "../consts"

export const useUpdateSkill = () => {
    const { user, addError } = useUserStore()

    async function save(allSkills: Skill[], skillToUpdate: string | undefined, value: number) {
        if (!skillToUpdate) {
            addError("Problem in updating skills")
            return
        }
        if (!user) {
            addError("You are not authorizated")
            return
        }

        try {
            const docRef = doc(db, 'users', user.uid)
            const updated = allSkills.map(el => el.skill == skillToUpdate ? { ...el, value: Number(el.value) + value } : el)
            await setDoc(docRef, { skills: updated }, { merge: true })
        } catch (err) {
            console.error(err)
            addError('Problem in updating skills. More about error in console')
        }
    }

    return save
}

export const useFetchSkills = (updateTrigger: any[]) => {
    const [skills, setSkills] = useState<Skill[]>(defaultSkills)
    const { user, addError } = useUserStore()
    const [loading, setLoading] = useState(false)

    async function fetchSkills() {
        if (!user) {
            addError("You are not authorizated")
            return
        }
        setLoading(true)

        try {
            const docRef = doc(db, 'users', user.uid)
            const snap = await getDoc(docRef)

            if (snap.exists()) {
                const data = snap.data()
                setSkills(data.skills as Skill[])
            } else {
                await setDoc(docRef, { skills: defaultSkills }, { merge: true })
            }
        } catch (err) {
            console.error(err)
            addError('Problem in saving fetching skills. More about error in console')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSkills()
    }, [user, ...updateTrigger])

    return {skills, loading}
}

export const useResetSkill = (allSkills: Skill[]) => {
    const { user, addError } = useUserStore()

    async function update(skillToUpdate: string) {
        if (!user) {
            addError("You are not authorizated")
            return
        }

        try {
            const docRef = doc(db, 'users', user.uid)
            const updated = allSkills.map(el => el.skill == skillToUpdate ? { ...el, value: 1 } : el)
            await setDoc(docRef, { skills: updated }, { merge: true })
        } catch (err) {
            console.error(err)
            addError('Problem in updating skills. More about error in console')
        }
    }

    return { update }
}