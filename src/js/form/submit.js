import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { loadAvailableHours } from "./hours-load.js"

// Pegar todos os elementos do formulário
const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const selectedDateSchedules = document.getElementById("date-schedules")
const tutorNameInput = document.getElementById("name")
const petNameInput = document.getElementById("pet-name")
const phoneInput = document.getElementById("phone")
const hourSelect = document.getElementById("hour")
const serviceTextarea = document.getElementById("service")

// Data de hoje no formato correto
const inputToday = dayjs().format("YYYY-MM-DD")

// Configurar inputs de data
selectedDate.value = inputToday
selectedDate.min = inputToday
selectedDateSchedules.value = inputToday
selectedDateSchedules.min = inputToday

// Abrir calendário ao clicar no input da página principal
selectedDate.addEventListener("click", function() {
  this.focus()
})

// Abrir calendário ao clicar no input do modal
selectedDateSchedules.addEventListener("click", function() {
  this.showPicker()
})

// Quando a data mudar no modal, recarregar horários
selectedDateSchedules.addEventListener("change", function() {
  // Limpar horário selecionado
  hourSelect.value = ""
  
  // Nova data selecionada
  const newDate = this.value
  
  if (newDate) {
    // Buscar agendamentos da nova data
    fetch(`http://localhost:3333/schedules?when_like=${newDate}`)
      .then(response => response.json())
      .then(schedules => {
        // Carregar horários disponíveis
        loadAvailableHours(newDate, schedules)
      })
      .catch(error => {
        // Se der erro, carregar sem filtro
        loadAvailableHours(newDate, [])
      })
  }
})

// Formatar telefone automaticamente
phoneInput.addEventListener("input", function() {
  // Pegar apenas números
  let numbers = this.value.replace(/\D/g, '')
  
  // Limitar a 11 dígitos
  if (numbers.length > 11) {
    numbers = numbers.slice(0, 11)
  }
  
  let formatted = numbers
  
  // Adicionar parênteses para DDD
  if (numbers.length >= 2) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  }
  
  // Adicionar hífen para telefone
  if (numbers.length >= 7) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }
  
  this.value = formatted
})

// Quando o formulário for enviado
form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Pegar valores dos campos
    const name = tutorNameInput.value.trim()
    const petName = petNameInput.value.trim()
    const phone = phoneInput.value.trim()
    const service = serviceTextarea.value.trim()
    
    // Combinar data e hora
    const when = dayjs(selectedDateSchedules.value + "T" + hourSelect.value)
    
    // Criar ID único
    const id = String(Date.now())

    // Enviar para API
    await scheduleNew({
      id,
      name,
      petName,
      phone,
      service,
      when: when.format(),
    })
    alert("Agendamento realizado com sucesso!")
    
    // Limpar formulário
    form.reset()
    
    // Resetar data para hoje
    selectedDateSchedules.value = inputToday
    selectedDateSchedules.min = inputToday
    
    // Feixa o modal
    const modal = document.getElementById('myFormModal')
    modal.style.display = "none"
    
    // Recarregar página para mostrar novo agendamento
    location.reload()
  } catch (error) {
    // Erro: mostrar mensagem
    alert("Nao foi possivel realizar o agendamento.")
    console.log(error)
  }
}
