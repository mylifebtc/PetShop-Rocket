import dayjs from "dayjs"

export function renderSchedulesByPeriod(schedules) {
  const morning = schedules.filter(s => {
    const hour = dayjs(s.when).hour()
    return hour >= 9 && hour <= 12
  })
  
  const afternoon = schedules.filter(s => {
    const hour = dayjs(s.when).hour()
    return hour >= 13 && hour <= 18
  })
  
  const night = schedules.filter(s => {
    const hour = dayjs(s.when).hour()
    return hour >= 19 && hour <= 21
  })

  showPeriod('period-morning', morning)
  showPeriod('period-afternoon', afternoon)
  showPeriod('period-night', night)
}

function showPeriod(periodId, schedules) {
  const container = document.getElementById(periodId)
  if (!container) return

  container.innerHTML = ''

  if (schedules.length === 0) {
    container.innerHTML = '<li class="empty-schedule">Nenhum agendamento</li>'
    return
  }

  schedules.forEach(schedule => {
    const time = dayjs(schedule.when).format('HH:mm')
    const item = document.createElement('li')
    
    item.innerHTML = `
      <div class="clients">
        <strong>${time}</strong>
        <span class="pet-name">${schedule.petName}</span>
        <span class="client-name">/ ${schedule.name}</span>
      </div>
      <div class="service">
        <span>${schedule.service}</span>
      </div>
      <div class="action">
        <span onclick="removeSchedule(${schedule.id}, event)">Remover agendamento</span>
      </div>
    `
    
    container.appendChild(item)
  })
}

window.removeSchedule = function(id, event) {
  if (!confirm('Remover este agendamento?')) return
  
  // Remover da tela primeiro (resposta imediata)
  const item = event.target.closest('li')
  if (item) {
    item.remove()
  }
  
  // Tentar remover da API (sem bloquear a interface)
  fetch(`http://localhost:3333/schedules/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      alert('Agendamento removido com sucesso!')
    } else {
      // Se não conseguiu remover da API, pelo menos sumiu da tela
      alert('Agendamento removido da tela. Recarregue a página para sincronizar.')
    }
  })
  .catch(error => {
    // Se deu erro na API, pelo menos sumiu da tela
    alert('Agendamento removido da tela. Recarregue a página para sincronizar.')
  })
} 