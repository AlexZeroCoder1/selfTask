import { defaultSkills } from "@/shared/consts";
import { useFetchSkills, useResetSkill } from "@/shared/hooks/skillHooks";
import MenuItemStyled from "@/shared/UI/menuItem";
import SelectStyled from "@/shared/UI/select";
import { motion } from "motion/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function ResetSkillModal({ setActiveModal }: { setActiveModal: Dispatch<SetStateAction<string>> }) {
    const { skills, loading: loadingSkills } = useFetchSkills([])
    const { update } = useResetSkill(skills)

    const [selectedSkill, setSelectedSkill] = useState(skills[0].skill)

    function save() {
        update(selectedSkill)
        setActiveModal("")
    }

    return (
        <>
            {
                !loadingSkills &&
                <motion.div
                    className="fixed top-[50%] left-[50%] translate-[-50%] max-w-[280px] w-full grey-interface rounded-[8px] p-4 flex flex-col items-center gap-4 border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <div className="text-3xl font-semibold">Reset skill</div>
                    <SelectStyled
                        className="bg-[#171717] h-10 w-full"
                        value={selectedSkill}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSkill(e.target.value)}
                    >
                        {defaultSkills.map(el => (
                            <MenuItemStyled key={el.skill} value={el.skill}>{el.skill}</MenuItemStyled>
                        ))}
                    </SelectStyled>
                    <div>
                        <button onClick={() => setActiveModal("")} className="black">Close</button>
                        <button className="green ml-3" onClick={save}>Save</button>
                    </div>
                </motion.div>
            }
        </>
    )
}