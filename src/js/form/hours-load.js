import dayjs from "dayjs"

// Horários disponíveis do petshop
const availableHours = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00", "21:00"
]

// Mostra apenas horários disponíveis no select
export function loadAvailableHours(selectedDate, bookedSchedules = []) {
  const hourSelect = document.getElementById("hour")
  const today = dayjs()
  const selectedDateTime = dayjs(selectedDate)
  
  hourSelect.innerHTML = ''
  
  availableHours.forEach(hour => {
    const [hourStr] = hour.split(":")
    const scheduleTime = selectedDateTime.hour(Number(hourStr)).minute(0)
    
    // Verificar se já passou (só para hoje) ou se já está agendado
    const isPast = selectedDateTime.isSame(today, 'day') && scheduleTime.isBefore(today)
    const isBooked = bookedSchedules.some(schedule => {
      const scheduleDateTime = dayjs(schedule.when)
      return scheduleDateTime.isSame(scheduleTime, 'hour')
    })
    
    if (!isPast && !isBooked) {
      const option = document.createElement('option')
      option.value = hour
      option.textContent = `${hourStr}:00 ${Number(hourStr) < 12 ? 'AM' : 'PM'}`
      hourSelect.appendChild(option)
    }
  })
  
  if (hourSelect.children.length === 0) {
    const option = document.createElement('option')
    option.value = ""
    option.textContent = "Nenhum horário disponível"
    option.disabled = true
    hourSelect.appendChild(option)
  }
}


