import dayjs from "dayjs"
import {apiConfig} from "./api-config"

export async function scheduleFetchByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    const data = await response.json()
    
    const dailySchedules = data.filter((schedule) => {
      const scheduleDate = dayjs(schedule.when).format("YYYY-MM-DD")
      const selectedDate = dayjs(date).format("YYYY-MM-DD")
      return scheduleDate === selectedDate
    })

    return dailySchedules
    
  } catch (error) {
    throw error
  }
}