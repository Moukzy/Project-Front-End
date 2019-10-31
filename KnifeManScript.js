
function selectTimeSlot(ele) {
    console.log(ele.innerText);
    timeSelected = ele.innerText
    document.getElementById("time").innerHTML = timeSelected;

}

let timeSelected="";
let dateSelected="";

function selectDateSlot(ele) {
    console.log(ele.innerText);
    dateSelected = ele.innerText
    document.getElementById("date").innerHTML = dateSelected;
}




function renderInfo(response) {
    let tbody = document.getElementById("appointmentData");
    tbody.innerHTML = "";
    for (let appointment of response) {
        let row = document.createElement("tr");
        row.id="row"+appointment.id;
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
        editButton.id="Edit"+appointment.id;
        
        editCell.appendChild(editButton)
        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete"
        editButton.onclick = function(){
            amendApp(appointment.id,appointment.name,appointment.appDate,appointment.timeSlot,name,date,slot);
        }
        deleteButton.onclick = function () {
            deleteApp2(appointment.id);
        }
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

    request.setRequestHeader("Content-Type", "application/json");
    
    let body = {};
    let nameBox = document.getElementById("Name").value;
   // let dateSelected=document.getElementById("Name").value
    if (nameBox == "") {
        alert("Please enter your name!")
    }
    else if (dateSelected == "") {
        alert("Please select a date!")
    } else if (timeSelected == "") {
        alert("Please select a time slot!")
    } else {
        body.name = nameBox; 
        body.appDate = dateSelected;
        body.timeSlot = timeSelected;
        body = JSON.stringify(body);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                getAppointments();
               
            }
        }
        request.send(body);
    }   
    
    return false;
}



function deleteApp2(id) {

    let request = new XMLHttpRequest()
    request.open("DELETE", "http://localhost:9090/appointment/" + id)
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            getAppointments();
        }
    }
    request.send();

}
function amendApp(id,name,date1,slot1,tdname,tddate,tdslot) {
   let newrow=document.getElementById("row"+id);
   let nameElement = document.createElement("input");
   let dateElement = document.createElement("input");
   let slotElement = document.createElement("input");
   
   nameElement.value=name;
   dateElement.value=date1;
   slotElement.value=slot1;
   let e1=tdname.firstChild;
   let e2=tddate.firstChild;
   let e3=tdslot.firstChild;
   
   
   tdname.removeChild(e1);
   tddate.removeChild(e2);
   tdslot.removeChild(e3);
 
   
   tdname.appendChild(nameElement);
   tddate.appendChild(dateElement);
   tdslot.appendChild(slotElement);
  
   var btn=document.getElementById("Edit"+id);
   btn.innerText="Update";
   btn.onclick=function(){
            let request = new XMLHttpRequest()
            request.open("PUT","http://localhost:9090/appointment")
            request.setRequestHeader("Content-Type", "application/json");
            let body = {
            "id":id,
                "name": nameElement.value,
                "appDate":dateElement.value,
                "timeSlot":slotElement.value
            };
            //alert(body);
            request.onreadystatechange = function (){
                if (request.readyState == 4) {
                   // alert(request.responseText);
                    getAppointments();
                }        
        }

            body = JSON.stringify(body);
        // alert(body);    
            request.send(body);
}

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