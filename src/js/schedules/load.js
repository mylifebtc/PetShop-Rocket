import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { renderSchedulesByPeriod } from "./render.js"
import { loadAvailableHours } from "../form/hours-load.js"

// Carrega e mostra agendamentos do dia
export async function schedulesDay() {
  try {
    const dateInput = document.getElementById("date")
    if (!dateInput) return
    
    const date = dateInput.value
    
    const schedules = await scheduleFetchByDay({ date })
    
    renderSchedulesByPeriod(schedules)
    loadAvailableHours(date, schedules)
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error)
    alert("Erro ao carregar agendamentos. Tente novamente.")
  }
}
