import { apiConfig } from "./api-config.js"

// Função para deletar agendamento
export async function deleteSchedule(id) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw error
  }
} 