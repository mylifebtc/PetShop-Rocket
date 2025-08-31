import { apiConfig } from "./api-config.js"

// Deletar agendamento
export async function deleteSchedule(id) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
  }
} 