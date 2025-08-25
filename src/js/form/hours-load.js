import dayjs from "dayjs"

const availableHours = [
  "09:00", 
  "10:00", 
  "11:00", 
  "12:00",
  "13:00", 
  "14:00", 
  "15:00", 
  "16:00", 
  "17:00", 
  "18:00",
  "19:00", 
  "20:00", 
  "21:00"
]

// Mostrar apenas horários disponivel
export function loadAvailableHours(selectedDate, bookedSchedules = []) {
  const hourSelect = document.getElementById("hour")
  const today = dayjs()
  const selectedDateTime = dayjs(selectedDate)
  
  // Limpa o select
  hourSelect.innerHTML = ''
  
  // Verificar cada horário
  availableHours.forEach(hour => {
    const [hourStr] = hour.split(":")
    const scheduleTime = selectedDateTime.hour(Number(hourStr)).minute(0)
    
    // Verificar se já passou (só para hoje)
    const isPast = selectedDateTime.isSame(today, 'day') && scheduleTime.isBefore(today)
    
    // Verificar se já está agendado
    const isBooked = bookedSchedules.some(schedule => {
      const scheduleDateTime = dayjs(schedule.when)
      return scheduleDateTime.isSame(scheduleTime, 'hour')
    })
    
    // Se não passou e não está agendado, mostrar como opção
    if (!isPast && !isBooked) {
      const option = document.createElement('option')
      option.value = hour
      option.textContent = `${hourStr}:00 ${Number(hourStr) < 12 ? 'AM' : 'PM'}`
      hourSelect.appendChild(option)
    }
  })
  
}


