'use client'

import ResetSkillModal from "@/shared/components/modals/resetSkillModal"
import { defaultSkills, paths } from "@/shared/consts"
import { useIsMobile } from "@/shared/hooks/globalHooks"
import { useEditTask, useFetchTask } from "@/shared/hooks/tasksHooks"
import GlobalMuiOverrides from "@/shared/UI/globalStyles"
import MenuItemStyled from "@/shared/UI/menuItem"
import SelectStyled from "@/shared/UI/select"
import { motion } from "motion/react"
import { ChangeEvent, useState } from "react"
import { AnimatePresence } from "motion/react"

export default function Page() {
    const { tasks } = useFetchTask(paths)
    const [activeModal, setActiveModal] = useState("")

    const { localTasks, addTask, deleteTask, updateTask, save } = useEditTask(tasks, paths[0])

    const isMobile = useIsMobile()

    return (
        <>
            {
                isMobile &&
                <div className='flex items-end gap-2 mb-3'>
                    <h1>settings</h1>
                    <div className='grey-dark mb-2 normal-case'>define your way and follow it.</div>
                </div>
            }
            <motion.div
                className='w-full'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <GlobalMuiOverrides />
                <div className="ml-2 mb-2">Change Tasks</div>
                <div className="grid grid-cols-2 gap-4">
                    {localTasks.map((t, i) =>
                        <div key={t.id} className="grey-interface rounded-2xl p-4 flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div>text</div>
                                <div className="green">Task {i + 1}</div>
                                <div onClick={() => deleteTask(t.id)} className="red cursor-pointer">delete</div>
                            </div>
                            <input type="text" value={t.text} onChange={e => updateTask("text", t.id, e.target.value)} />
                            <div className="md:flex gap-4">
                                <div className="flex-1/2">
                                    <div className="mb-2">skill</div>
                                    <SelectStyled
                                        className="bg-[#171717] h-10 w-full"
                                        value={t.skill}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateTask("skill", t.id, e.target.value)}
                                    >
                                        {defaultSkills.map(el => (
                                            <MenuItemStyled key={el.skill} value={el.skill}>{el.skill}</MenuItemStyled>
                                        ))}
                                    </SelectStyled >
                                </div>
                                <div className="flex-1/2">
                                    <div className="mb-2">points</div>
                                    <input type="number" value={t.value} onChange={e => updateTask("value", t.id, Number(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="flex flex-wrap   gap-4">
                        <button onClick={addTask}>Add task</button>
                        <button className="green" onClick={save}>Save tasks</button>
                    </div>
                    <button onClick={() => setActiveModal("skill")}>Reset Skill</button>
                </div>
                <AnimatePresence>
                    {
                        activeModal == "skill" && <ResetSkillModal key={'skill'} setActiveModal={setActiveModal} />
                    }
                </AnimatePresence>
            </motion.div>
        </>
    )
}