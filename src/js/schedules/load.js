import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { renderSchedulesByPeriod } from "./render.js"
import { loadAvailableHours } from "../form/hours-load.js"

// Função para carregar e mostrar agendamentos do dia
export async function schedulesDay() {
  try {
    // Pegar input de data
    const dateInput = document.getElementById("date")
    if (!dateInput) return
    
    // Data selecionada
    const date = dateInput.value
    
    // Buscar agendamentos da data
    const schedules = await scheduleFetchByDay({ date })
    
    // Mostrar agendamentos organizados por período
    renderSchedulesByPeriod(schedules)
    
    // Carregar horários disponíveis para o modal
    loadAvailableHours(date, schedules)
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error)
    alert("Erro ao carregar agendamentos. Tente novamente.")
  }
}
