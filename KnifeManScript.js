
function selectTimeSlot(ele) {

    document.getElementById("time").innerHTML = ele.innerText

}
// function selectDate(ele) {

//     document.getElementById("date").innerHTML = ele.innerText
//}
// 
// function currentDate() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();

//     today = mm + '/' + dd + '/' + yyyy;

//     return today;
// }

function renderInfo(response) {
    let tbody = document.getElementById("appointmentData");
    tbody.innerHTML = "";
    for (let appointment of response) {
        let row = document.createElement("tr");
        let appointmentNum = document.createElement("td");
        appointmentNum.innerText = appointment.id;
        let name = document.createElement("td");
        name.innerText = appointment.name;
        let date = document.createElement("td");
        date.innerText = appointment.appDate;
        let slot = document.createElement("td");
        slot.innerText = appointment.timeSlot;
        let editCell = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editCell.appendChild(editButton)
        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete"
        deleteCell.appendChild(deleteButton);
        row.appendChild(appointmentNum);
        row.appendChild(name);
        row.appendChild(date);
        row.appendChild(slot);
        row.appendChild(editCell);
        row.appendChild(deleteCell);
        tbody.appendChild(row);
    }
    console.log(response)
}

function getAppointments() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9090/appointment");

    request.onload = function () {
        renderInfo(JSON.parse(request.response));
    }

    request.send();

}
function bookAppointment() {
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:9090/appointment");

    request.onSubmit = function () {
       
        var data = document.getElementByClassName("appInfo")[0];
        data.textContent = JSON.stringify()
    }
}
