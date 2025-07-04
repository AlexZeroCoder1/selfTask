'use client'
import { useUserStore } from '@/shared/store/store'
import LogOutButton from '@/shared/components/logOutButton'
import { useFetchTask, useGetCompletedDates, useSaveCompletedTask } from '@/shared/hooks/tasksHooks'
import { useEffect, useMemo, useState } from 'react'
import Calendar from '@/shared/UI/calendar'
import SkillsRadarChart from '@/shared/components/skillsRadarChart'
import { motion } from 'motion/react'
import { AnimatePresence } from 'motion/react'
import { useFetchSkills, useUpdateSkill } from '@/shared/hooks/skillHooks'
import { useIsMobile } from '@/shared/hooks/globalHooks'
import { colorMap } from '@/shared/consts'

export default function Page() {
    const { user } = useUserStore()
    const [readyToSave, setReadyToSave] = useState(false)

    const paths = ['warrior', 'mage', 'ranger']

    const { tasks, loading: taskLoading, setTasks, selectedPath, selectedDate,
        dateKey, setSelectedDate, setSelectedPath } = useFetchTask(paths)

    const { save: saveTasks, loading: saveLoading } = useSaveCompletedTask({ selectedPath, dateKey, tasks })

    const { skills } = useFetchSkills([tasks])
    const updateSkill = useUpdateSkill()

    const overAllSkillRating = useMemo(
        () => skills.reduce((accumulator, skill) => accumulator + skill.value, 0),
        [skills]
    )

    const handleToggle = (id: string) => {
        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )
        setReadyToSave(true)
        const neededTask = tasks.find(t => t.id == id)
        if (!neededTask) return

        updateSkill(
            skills,
            neededTask.skill,
            !neededTask.completed ? neededTask.value : -Number(neededTask.value)
        )
    }

    useEffect(() => {
        if (user && readyToSave) {
            saveTasks()
        }
    }, [tasks])
    const completedDates = useGetCompletedDates(selectedPath, selectedDate)

    const isMobile = useIsMobile()

    return (
        <div>
            {!user ? (
                // <div>Loading...</div>
                <></>
            ) : (
                <>
                    {
                        isMobile &&
                        <div className='flex items-end gap-2 my-4'>
                            <h1>home</h1>
                            <div className='grey-dark mb-2 normal-case'>complete daily tasks and evolve.</div>
                        </div>
                    }
                    <motion.div
                        className='flex gap-3'
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                    >
                        <div>
                            <div className='relative flex flex-col items-center'>
                                <div className='grey mb-2'>rank</div>
                                <div className='text-8xl/15  mb-5'>
                                    {
                                        overAllSkillRating <= 50 ?
                                            "E" :
                                            overAllSkillRating <= 100 ?
                                                "D" :
                                                overAllSkillRating <= 150 ?
                                                    "C" :
                                                    overAllSkillRating <= 200 ?
                                                        "B" :
                                                        overAllSkillRating <= 250 ?
                                                            "A" :
                                                            overAllSkillRating <= 300 ?
                                                                "S" : "S+"
                                    }
                                </div>
                                <div className='green font-medium'>THE {paths[0]}</div>
                                <div className='text-[10px]'>current way</div>
                                <div className='absolute top-0 right-0 grey'>
                                    <div className='text-[10px]'>over all skill rating</div>
                                    <div className='text-center'>{overAllSkillRating}</div>
                                </div>
                            </div>
                            <hr className='mt-2' />
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {
                                        tasks.map(task => (
                                            <motion.div
                                                key={task.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}

                                            >
                                                <label className='flex items-center py-[10px] px-3 cursor-pointer'>
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => handleToggle(task.id)}
                                                        className="peer hidden"
                                                    />
                                                    <span className="w-4 h-4 rounded-full border-2 border-green-500 peer-checked:bg-green-500 mr-2 shrink-0"></span>
                                                    <span className={task.completed ? "line-through" : ""}>{task.text}</span>
                                                    <span
                                                        className='ml-auto normal-case'
                                                        style={{ color: colorMap[task.skill] }}
                                                    >
                                                        {task.skill.toLowerCase()}
                                                    </span>
                                                </label>
                                            </motion.div>
                                        ))
                                    }
                                </motion.div>
                            </AnimatePresence>
                            <hr />
                            <div className="w-[400px] h-[400px]">
                                <Calendar value={selectedDate} setValue={setSelectedDate} completedDates={completedDates} />
                            </div>

                            {/* <LogOutButton /> */}

                        </div>
                        {
                            !isMobile &&
                            <div><SkillsRadarChart skills={skills} /></div>
                        }
                    </motion.div>
                </>
            )}
        </div>
    )
}
