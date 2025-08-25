import dayjs from "dayjs"

export function renderSchedulesByPeriod(schedules) {
  // Separar agendamentos por período do dia
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

  // Mostrar cada período na tela
  showPeriod('period-morning', morning)
  showPeriod('period-afternoon', afternoon)
  showPeriod('period-night', night)
}

function showPeriod(periodId, schedules) {
  const container = document.getElementById(periodId)
  if (!container) return

  // Limpar lista anterior
  container.innerHTML = ''

  // Se não há agendamentos, mostrar mensagem
  if (schedules.length === 0) {
    container.innerHTML = '<li class="empty-schedule">Nenhum agendamento</li>'
    return
  }

  // Criar item para cada agendamento
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
        <span onclick="removeSchedule('${schedule.id}', event)">Remover agendamento</span>
      </div>
    `
    
    container.appendChild(item)
  })
}

// Função para remover agendamento (simples e direta)
window.removeSchedule = function(id, event) {
  // Perguntar se quer mesmo remover
  if (!confirm('Remover este agendamento?')) return
  
  // Converter ID para string (evita problemas)
  const stringId = String(id)
  
  // 1. Remover da tela imediatamente
  const item = event.target.closest('li')
  if (item) {
    item.remove()
  }
  
  // 2. Remover da API
  fetch(`http://localhost:3333/schedules/${stringId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Sucesso: mostrar mensagem e recarregar
      alert('Agendamento removido com sucesso!')
      location.reload()
    } else {
      // Erro: mostrar erro e recarregar
      alert('Erro ao remover. Recarregando página...')
      location.reload()
    }
  })
  .catch(error => {
    // Erro de conexão: mostrar erro e recarregar
    alert('Erro de conexão. Recarregando página...')
    location.reload()
  })
} 