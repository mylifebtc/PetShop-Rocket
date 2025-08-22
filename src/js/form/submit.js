import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const selectedDateSchedules = document.getElementById("date-schedules")
const tutorNameInput = document.getElementById("name")
const petNameInput = document.getElementById("pet-name")
const phoneInput = document.getElementById("phone")
const hourSelect = document.getElementById("hour")
const serviceTextarea = document.getElementById("service")

const inputToday = dayjs().format("YYYY-MM-DD")

selectedDate.value = inputToday
selectedDate.min = inputToday
selectedDateSchedules.value = inputToday
selectedDateSchedules.min = inputToday

// Abrir calendário ao clicar no input
selectedDate.addEventListener("click", function() {
  this.focus()
})

selectedDateSchedules.addEventListener("click", function() {
  this.showPicker()
})

phoneInput.addEventListener("input", function() {
  let numbers = this.value.replace(/\D/g, '')
  
  if (numbers.length > 11) {
    numbers = numbers.slice(0, 11)
  }
  
  let formatted = numbers
  
  if (numbers.length >= 2) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  }
  
  if (numbers.length >= 7) {
    formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }
  
  this.value = formatted
})

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = tutorNameInput.value.trim()
    const petName = petNameInput.value.trim()
    const phone = phoneInput.value.trim()
    const service = serviceTextarea.value.trim()
    const [hourStr] = hourSelect.value.split(":")
    const when = dayjs(selectedDateSchedules.value + "T" + hourSelect.value)
    const id = Date.now()

    await scheduleNew({
      id,
      name,
      petName,
      phone,
      service,
      when: when.format(),
    })

    alert("Agendamento realizado com sucesso!")
    form.reset()
    selectedDateSchedules.value = inputToday
    selectedDateSchedules.min = inputToday
    
    // Fechar modal após agendamento
    const modal = document.getElementById('myFormModal')
    modal.style.display = "none"
    
    // Recarregar página para mostrar novo agendamento
    location.reload()
  } catch (error) {
    alert("Nao foi possivel realizar o agendamento.")
    console.log(error)
  }
}
