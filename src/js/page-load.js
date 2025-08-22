import { schedulesDay } from "./schedules/load.js"

// Inicializar página
function initializePage() {
  schedulesDay()
  
  const dateInput = document.getElementById("date")
  if (dateInput) {
    // Abrir calendário ao clicar no input
    dateInput.addEventListener("click", function() {
      this.showPicker()
    })
    
    // Recarregar agendamentos quando mudar a data
    dateInput.addEventListener("change", function() {
      schedulesDay()
    })
  }
}

document.addEventListener("DOMContentLoaded", initializePage)