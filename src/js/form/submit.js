import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const selectedDateSchedules = document.getElementById("date-schedules")

const tutorNameInput = document.getElementById("name")
const petNameInput = document.getElementById("pet-name")
const hourSelect = document.getElementById("hour")
const serviceTextarea = document.getElementById("service")

const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = inputToday
selectedDate.min = inputToday
selectedDateSchedules.value = inputToday
selectedDateSchedules.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const name = tutorNameInput.value.trim()
    const petName = petNameInput.value.trim()
    const service = serviceTextarea.value.trim()

    const [hourStr] = hourSelect.value.split(":")

    const when = dayjs(selectedDateSchedules.value)

    const id = Date.now()

    await scheduleNew({
      id,
      name,
      petName,
      service,
      when,
    })

    alert("Agendamento realizado com sucesso!")

    form.reset()
    selectedDateSchedules.value = inputToday
    selectedDateSchedules.min = inputToday
  } catch (error) {
    alert("Nao foi possivel realizar o agendamento.")
    console.log(error)
  }
}
