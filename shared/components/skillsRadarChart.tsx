"use client"
import { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { colorMap, Skill } from '../consts'

export default function SkillsRadarChart({ skills }: { skills: Skill[] }) {
    const [selectedData, setSelectedData] = useState(0)

    return (
        <>
            <div className="w-100 h-100 bg-[#0a0a0a] text-white">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                        outerRadius="60%"
                        data={skills}
                    >
                        <PolarGrid stroke="#444" />
                        <PolarAngleAxis
                            tickLine={false}
                            axisLine={false}
                            dataKey="skill"
                            stroke="#fff"
                            tick={({ payload, x, y, textAnchor }) => {
                                const handleClick = () => {
                                    const index = skills.findIndex((item) => item.skill === payload.value)
                                    if (index !== -1) {
                                        setSelectedData(index)
                                    }
                                }

                                return (
                                    <text
                                        className='cursor-pointer font-semibold tracking-wide'
                                        x={x}
                                        y={y}
                                        dy={payload.value === 'MENTAL' ? 8 : 0}
                                        textAnchor={textAnchor}
                                        fill={colorMap[payload.value] || '#fff'}
                                        fontSize={12}
                                        onClick={handleClick}
                                        fontFamily="monospace"
                                    >
                                        {payload.value}
                                    </text>
                                )
                            }}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            axisLine={false}
                            tickLine={false}
                            stroke="transparent"
                            domain={[0, 200]}
                        />
                        <Radar name="Skill Level" dataKey="value" stroke="#00f3aa" fill="#00f3aa" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div
                className='text-center tracking-widest text-2xl font-semibold'
                style={{ color: colorMap[skills[selectedData].skill] }}
            >
                {skills[selectedData].skill}<br />{skills[selectedData].value}
            </div>
        </>
    )
}
