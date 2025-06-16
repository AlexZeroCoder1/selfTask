export type Task = {
    id: string
    text: string
    skill: string
    value: number
    completed: boolean
}

export type Path = typeof paths[number]

type DefaultTasks = {
    [key in Path]: Task[]
}

export const paths = ['warrior', 'mage', 'ranger']

export const defaultTasks: DefaultTasks = {
    warrior: [
        { id: '1', text: 'Follow proper diet', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '2', text: 'Training', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '3', text: 'Focused work session', skill: 'DISCIPLINE', value: 1, completed: false },
        { id: '4', text: 'Go sleep early', skill: 'PHYSICAL', value: 1, completed: false },
    ],
    mage: [
        { id: '1', text: 'Task A', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '2', text: 'Task B', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '3', text: 'Task C', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '4', text: 'Task D', skill: 'PHYSICAL', value: 1, completed: false },
    ],
    ranger: [
        { id: '1', text: 'Task A', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '2', text: 'Task B', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '3', text: 'Task C', skill: 'PHYSICAL', value: 1, completed: false },
        { id: '4', text: 'Task D', skill: 'PHYSICAL', value: 1, completed: false },
    ],
}


export type Skill = {
    skill: string,
    value: number
}

export const defaultSkills: Skill[] = [
    { skill: 'PHYSICAL', value: 1 },
    { skill: 'SOCIAL', value: 1 },
    { skill: 'DISCIPLINE', value: 1 },
    { skill: 'MENTAL', value: 1 },
    { skill: 'INTELLECT', value: 1 },
    { skill: 'AMBITION', value: 1 },
]

export const colorMap: { [key: string]: string } = {
    PHYSICAL: '#00f3aa',
    SOCIAL: '#1e90ff',
    DISCIPLINE: '#ff4500',
    MENTAL: '#ffd700',
    INTELLECT: '#ffa500',
    AMBITION: '#9932cc',
}