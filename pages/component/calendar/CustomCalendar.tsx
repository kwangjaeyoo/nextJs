'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import { Value } from 'react-calendar/dist/cjs/shared/types'

// /styles/Calendar.css 에 있는 것을 수정하면됨...

interface CustomCalendarProps {
  settingValue: Date
  selectDay: (v: Date) => void
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  settingValue,
  selectDay,
}) => {
  const [value, setValue] = useState(settingValue)

  return (
    <Calendar
      onChange={(value: Value) => selectDay(value as Date)}
      value={value}
      next2Label={null}
      prev2Label={null}
      calendarType="US"
      showNeighboringMonth={false}
      formatShortWeekday={(locale, value) =>
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat'][value.getDay()]
      }
      formatDay={(locale, date) =>
        date.toLocaleString('en', { day: 'numeric' })
      }
    />
  )
}

export default CustomCalendar
