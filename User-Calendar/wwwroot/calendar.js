const title = document.getElementById("title");
const date = document.getElementById("date");
const organizer = document.getElementById("organizer");
const link = document.getElementById("link");
const calendarCells = document.querySelectorAll(".text-bg-info");
const rawSwitch = document.getElementById("rawSwitch");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
var dataFromServer = "Data";
var dayToGet = d.getDay();
var count = 0;
var totalDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
var startDay = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();
var dates = [];

for (var i = 0; i < 7; i++) {
    if (startDay > totalDays) {
        startDay = 1;
    }
    if (days[dayToGet + count] == "Saturday") {
        document.getElementById("d" + (i + 1)).innerHTML = days[dayToGet + count] + " " + startDay;
        dates.push(startDay);
        startDay++;
        count = 0;
        dayToGet = 0;
    }
    else {
        document.getElementById("d" + (i + 1)).innerHTML = days[dayToGet + count] + " " + startDay;
        dates.push(startDay);
        count++;
        startDay++;
    }
}

fetch("http://127.0.0.1:8081/get_calendar_events", {
    method: "GET",
    headers: {
        accept: "application/json",
    },
}).then(function (response) {
    return response.json();
}).then(function (data) {
    displayDataOnCalendar(data);
    dataFromServer = data;
}).catch(function (error) {
    console.log(`Error Fetching Data: ${error}`);
})

//async function post(data) {
//    try {
//        const response = await fetch("http://127.0.0.1:8081/get_calendar_events", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify(data),
//        });

//        const result = await response.json();
//        console.log("Success: ", result);
//        return result.text;
//    }
//    catch (error) {
//        console.error("Error: ", error);
//    }
//}

//const data = { text: "test@gmail.com" };
//post(data);

function displayDataFromCalendar(event) {
    for (var i = 0; i < dataFromServer.length; i++) {
        if (event.target.innerHTML == dataFromServer[i].summary) {
            document.getElementById("title").innerHTML = "Title: " + dataFromServer[i].summary;
            document.getElementById("date").innerHTML = "Date: " + dataFromServer[i].start.dateTime;
            document.getElementById("attendees").innerHTML = "Attendees: " + dataFromServer[i].attendees;
            document.getElementById("organizer").innerHTML = "Organizer: " + dataFromServer[i].organizer.email;
            document.getElementById("link").innerHTML = "Link: " + dataFromServer[i].link;
            document.getElementById("rawData").innerHTML = JSON.stringify(dataFromServer[i], null, 2);
        }
    }
    if (rawSwitch.checked != true) {
        document.getElementById("dataDisplay").style.display = "block";
        document.getElementById("rawDataDisplay").style.display = "none";
        localStorage.setItem("rawData", false);
    }
    else {
        document.getElementById("dataDisplay").style.display = "none";
        document.getElementById("rawDataDisplay").style.display = "block";
        localStorage.setItem("rawData", true);
    }
}

rawSwitch.checked = JSON.parse(localStorage.getItem("rawData"));

for (var calendarCell of calendarCells) {
    calendarCell.addEventListener("click", displayDataFromCalendar);
}

rawSwitch.addEventListener("click", displayDataFromCalendar);

function displayDataOnCalendar(data) {
    for (var i = 0; i < data.length; i++) {
        var dateFromObject = new Date(data[i].start.dateTime);
        for (var j = 0; j < dates.length; j++) {
            if (dateFromObject.getMonth() == month + 1) {
                month++;
                if (month == 11) {
                    month = 0;
                }
            }
            if (dateFromObject.getDate() == dates[j] && dateFromObject.getMonth() == month) {
                document.getElementById("p" + (j + 1)).innerHTML = data[i].summary;
            }
        }
    }
}


