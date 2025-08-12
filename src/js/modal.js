export const myBtnSchedules = function(){
  const btnSchedules = document.getElementById("btn-schedules")
  
  btnSchedules.addEventListener("click", function(){
    const modal = document.getElementById('myFormModal')
    modal.style.display = "block";
  })
}

myBtnSchedules();
