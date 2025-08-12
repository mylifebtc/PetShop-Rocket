import dayjs from "dayjs"

import { openingHours } from "../../utils/opening-hours.js"



export function hoursload({ date }){
  const opening = openingHours.map((hour) => {
    // Recupera somente a hora.
    const [scheduleHour] = hour.split(":")

    // Adiciona a hora na date e verifica se ta no passado.
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs())

    // Retorna a hora mostrando se está ou nao disponivel.
    return ({
      hour,
      available: isHourPast,
    })


    // console.log(scheduleHour, isHourPast)
  })
}


