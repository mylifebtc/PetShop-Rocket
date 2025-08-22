import { loadAvailableHours } from "./form/hours-load.js"
import { scheduleFetchByDay } from "../services/schedule-fetch-by-day.js"

export const myBtnSchedules = function(){
  const btnSchedules = document.getElementById("btn-schedules")
  
  btnSchedules.addEventListener("click", async function(){
    const modal = document.getElementById('myFormModal')
    modal.style.display = "block";
    
    // Adicionar event listener para o calendário do modal
    const dateInput = document.getElementById("date-schedules")
    if (dateInput) {
      dateInput.addEventListener("click", function() {
        this.focus()
      })
    }
    
    try {
      const selectedDate = document.getElementById("date-schedules").value
      const schedules = await scheduleFetchByDay({ date: selectedDate })
      loadAvailableHours(selectedDate, schedules)
    } catch (error) {
      console.log("Erro ao carregar horários:", error)
    }
  })
}

myBtnSchedules();
