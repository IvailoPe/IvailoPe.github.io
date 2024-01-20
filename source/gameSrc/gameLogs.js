function updateGameLogs(newLog){
   let logs = document.querySelector("#logs")
   let log = document.createElement("p")
   log.textContent = newLog
   logs.appendChild(log)
}

export {updateGameLogs}