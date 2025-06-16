import { useUserStore } from "../store/store"
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from 'dayjs'
import { defaultSkills, defaultTasks, Task } from "../consts"

export const useFetchTask = (paths: string[]) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const { user, addError } = useUserStore()
    const [selectedPath, setSelectedPath] = useState(paths[0])
    const [loading, setLoading] = useState(false)

    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
    const dateKey = selectedDate.format('YYYY-MM-DD')

    async function fetchTasks() {
        if (!user) {
            addError("You are not authorizated")
            return
        }
        setLoading(true)

        try {
            const docRef = doc(db, 'users', user.uid, 'paths', selectedPath, 'tasksByDate', dateKey)
            const snap = await getDoc(docRef)
            if (snap.exists()) {
                const data = snap.data()
                setTasks(data.tasks as Task[])
            } else {
                const today = dayjs().format('YYYY-MM-DD')
                const docRef = doc(db, 'users', user.uid, 'paths', selectedPath, 'tasksByDate', today)
                const snap = await getDoc(docRef)
                if (snap.exists()) {
                    const data = snap.data()
                    const updatedTasks = (data.tasks as Task[]).map(task => ({
                        ...task,
                        completed: false
                    }))
                    setTasks(updatedTasks)
                } else {
                    setTasks(defaultTasks[selectedPath])
                }
            }
        } catch (err) {
            console.error(err)
            addError('Problem in saving completed tasks. More about error in console')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [user, selectedPath, selectedDate])
    return { tasks, loading, setTasks, selectedPath, selectedDate, dateKey, setSelectedDate, setSelectedPath }
}

export const useSaveCompletedTask = ({ selectedPath, dateKey, tasks }: { selectedPath: string, dateKey: string, tasks: Task[] }) => {
    const [loading, setLoading] = useState(false)
    const { user, addError } = useUserStore()

    async function save() {
        if (!user) {
            addError("You are not authorizated")
            return
        }
        setLoading(true)

        try {
            const docRef = doc(db, 'users', user.uid, 'paths', selectedPath, 'tasksByDate', dateKey)
            await setDoc(docRef, { tasks, updatedAt: new Date() })
        } catch (err) {
            console.error(err)
            addError('Problem in saving completed tasks. More about error in console')
        } finally {
            setLoading(false)
        }
    }

    return { save, loading }
}

export const useGetCompletedDates = (path: string, selectedDate: dayjs.Dayjs) => {
    const { user, addError } = useUserStore()
    const [completedDates, setCompletedDates] = useState<string[]>([])

    async function check() {
        if (!user) {
            addError("You are not authorizated")
            return
        }
        try {
            const datesRef = collection(db, 'users', user.uid, 'paths', path, 'tasksByDate')
            const snapshot = await getDocs(datesRef)

            snapshot.forEach((doc) => {
                const data = doc.data()
                const tasks = data.tasks || []
                const allCompleted = tasks.length > 0 && tasks.every((t: any) => t.completed)

                if (allCompleted) {
                    setCompletedDates(prev => [...prev, doc.id])
                } else {
                    setCompletedDates(prev => [...prev.filter(id => id !== doc.id)])
                }
            })
        } catch (err) {
            console.error(err)
            addError('Problem in getting completed days. More about error in console')
        }
    }

    useEffect(() => {
        check()
    }, [user, path, selectedDate])

    return completedDates
}

export const useEditTask = (tasks: Task[], path: string) => {
    const [localTasks, setLocalTasks] = useState(tasks)
    const { user, addError } = useUserStore()

    function addTask() {
        const maxId = localTasks.reduce((max, t) => {
            const numericId = parseInt(t.id)
            return isNaN(numericId) ? max : Math.max(max, numericId)
        }, 0)

        const newTask = {
            id: String(maxId + 1),
            text: '',
            skill: defaultSkills[0].skill,
            value: 1,
            completed: false,
        }
        setLocalTasks(prev => [...prev, newTask])
    }

    function deleteTask(id: string) {
        setLocalTasks(prev => prev.filter(t => t.id !== id))
    }

    function updateTask(key: string, id: string, value: string | number) {
        const newTasks = localTasks.map(t => t.id == id ? ({ ...t, [key]: value }) : t)
        setLocalTasks(newTasks)
    }

    async function save() {
        if (!user) {
            addError("You are not authorizated")
            return
        }
        try {
            const datesRef = collection(db, 'users', user.uid, 'paths', path, 'tasksByDate')
            const snapshot = await getDocs(datesRef)

            const batchWrites = snapshot.docs.map(async docSnap => {
                const ref = doc(db, 'users', user.uid, 'paths', path, 'tasksByDate', docSnap.id)
                const serverData = docSnap.data()
                const serverTasks = serverData.tasks as Task[]

                // создаём мапу serverTask.id -> completed
                const completedMap = new Map(
                    serverTasks.map(task => [task.id, task.completed])
                )

                // основа — localTasks, но completed берем из serverTasks
                const updatedTasks = localTasks.map(task => ({
                    ...task,
                    completed: completedMap.get(task.id) ?? false // если нет — ставим false
                }))

                return setDoc(ref, {
                    tasks: updatedTasks,
                    updatedAt: new Date()
                })
            })

            await Promise.all(batchWrites)
        } catch (err) {
            console.error(err)
            addError('Problem updating all tasks by date.')
        }
    }

    useEffect(() => {
        setLocalTasks(tasks)
    }, [tasks])

    return { localTasks, addTask, deleteTask, updateTask, save }
}
