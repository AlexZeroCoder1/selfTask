'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dispatch, SetStateAction } from 'react'
import dayjs from 'dayjs'
import { DateCalendar, PickersDay } from '@mui/x-date-pickers'

// 🧱 Тема с черным фоном и белым текстом
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#777', // 👈 это будет цвет фона выбранной даты
        },
        background: {
            default: '#000',
            paper: '#000',
        },
        text: {
            primary: '#fff',
            secondary: '#ccc',
        },
    },
})

export default function Calendar(
    { value, setValue, completedDates }: { value: dayjs.Dayjs, setValue: Dispatch<SetStateAction<dayjs.Dayjs>>, completedDates: string[] }
) {
    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    value={value}
                    onChange={(newValue) => newValue && setValue(newValue)}
                    shouldDisableDate={(day) => day.isAfter(dayjs())}
                    slots={{
                        day: (props) => {
                            const date = props.day as dayjs.Dayjs
                            const formatted = date.format('YYYY-MM-DD')
                            const isCompleted = completedDates.includes(formatted)

                            return (
                                <PickersDay
                                    {...props}
                                    sx={{
                                        backgroundColor: isCompleted ? '#4caf50' : undefined,
                                        color: isCompleted ? '#fff' : undefined,
                                        '&:hover': {
                                            backgroundColor: isCompleted ? '#388e3c' : undefined,
                                        },
                                    }}
                                />
                            )
                        },
                    }}
                />
            </LocalizationProvider>
        </ThemeProvider>
    )
}
