import { apiConfig } from "./api-config.js"

export async function scheduleNew({id, name, petName, phone, service, when}){
   try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, name, petName, phone, service, when })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    return await response.json()
   } catch (error) {
    alert("Nao foi possivel agendar. Tente novamente mais tarde.")
    throw error
   }
}