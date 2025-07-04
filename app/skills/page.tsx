'use client'

import SkillsRadarChart from "@/shared/components/skillsRadarChart"
import { useIsMobile } from "@/shared/hooks/globalHooks"
import { useFetchSkills } from "@/shared/hooks/skillHooks"
import { motion } from "motion/react"

export default function Page() {
    const isMobile = useIsMobile()

    const { skills } = useFetchSkills([])
    return (
        <>
            {
                isMobile &&
                <div className='flex items-end gap-2 my-4'>
                    <h1>skills</h1>
                    <div className='grey-dark mb-2 normal-case'>see your progress? keep going   .</div>
                </div>
            }
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <SkillsRadarChart skills={skills} />
            </motion.div>
        </>
    )
}