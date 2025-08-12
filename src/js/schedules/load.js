import { hoursload } from "../form/hours-load.js"

const selectedDate = document.getElementById("date")

export function schedulesDay(){
  // Obtém a data do input.
  const date = selectedDate.value
 hoursload({date})
}