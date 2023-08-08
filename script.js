const timeDisplay = document.getElementById("time");
const alarmInput = document.getElementById("alarm");
const setAlarmButton = document.getElementById("setAlarm");
const alarmsList = document.getElementById("alarms");
let alarmInterval;
const alarms = [];

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function checkAlarms() {
  const now = new Date();
  for (const alarm of alarms) {
    const alarmTime = new Date(now.toDateString() + " " + alarm.time);
    if (now >= alarmTime) {
      alert(`Alarm: ${alarm.time}`);
      alarms.splice(alarms.indexOf(alarm), 1);
      updateAlarmsList();
    }
  }
}

function updateAlarmsList() {
  alarmsList.innerHTML = "";
  for (const alarm of alarms) {
    const alarmItem = document.createElement("div");
    alarmItem.classList.add("alarm-item");
    alarmItem.textContent = `Alarm: ${alarm.time} `;

    const deleteButton = document.createElement("redbutton");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      alarms.splice(alarms.indexOf(alarm), 1);
      updateAlarmsList();
    });

    alarmItem.appendChild(deleteButton);
    alarmsList.appendChild(alarmItem);
  }
}

setAlarmButton.addEventListener("click", () => {
  const alarmTime = alarmInput.value;
  if (alarmTime) {
    alarms.push({ time: alarmTime });
    updateAlarmsList();
    alert(`Alarm set for ${alarmTime}`);
  }
});

updateTime();
setInterval(updateTime, 1000);
setInterval(checkAlarms, 1000);
