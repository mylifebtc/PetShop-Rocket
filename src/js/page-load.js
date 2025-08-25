import { schedulesDay } from "./schedules/load.js"

// Função para inicializar a página
function initializePage() {
  // Carregar agendamentos do dia atual
  schedulesDay()
  
  // Pegar input de data da página principal
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

// Quando a página carregar, inicializar
document.addEventListener("DOMContentLoaded", initializePage)