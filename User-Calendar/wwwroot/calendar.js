const title = document.getElementById("title");
const date = document.getElementById("date");
const organizer = document.getElementById("organizer");
const link = document.getElementById("link");
const calendarCells = document.querySelectorAll(".text-bg-info");
const rawSwitch = document.getElementById("rawSwitch");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
const dataToFetch = [
    {
        "summary": "supetest",
        "id": "AQMkADAwATM0MDAAMS1iOTBmLTc3AGVjLTAwAi0wMAoARgAAA5qCGGg3EJFKqTdXg9Db-0UHALP8zwkk-ehHnIL88hsNTfcAAAIBDQAAALP8zwkk-ehHnIL88hsNTfcABkayNS0AAAA=",
        "start": {
            "dateTime": "2023-06-29T14:00:00"
        },
        "attendees": ["user1@gmail.com", "user2@gmail.com", "user3@gmail.com"],
        "organizer": {
            "email": "outlook_556C818D2795D20F@outlook.com"
        },
        "link": "https://link.com"
    },
    {
        "summary": "supetest1",
        "id": "AQMkADAwATM0MDAAMS1iOTBmLTc3AGVjLTAwAi0wMAoARgAAA5qCGGg3EJFKqTdXg9Db-0UHALP8zwkk-ehHnIL88hsNTfcAAAIBDQAAALP8zwkk-ehHnIL88hsNTfcABkayNS0AAAA=",
        "start": {
            "dateTime": "2023-07-05T14:00:00"
        },
        "attendees": ["user1@gmail.com", "user2@gmail.com", "user3@gmail.com"],
        "organizer": {
            "email": "outlook_556C818D2795D20F@outlook.com"
        },
        "link": "https://link.com"
    }
]
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

function displayDataFromCalendar(event) {
    for (var i = 0; i < dataToFetch.length; i++) {
        if (event.target.innerHTML == dataToFetch[i].summary) {
            document.getElementById("title").innerHTML = "Title: " + dataToFetch[i].summary;
            document.getElementById("date").innerHTML = "Date: " + dataToFetch[i].start.dateTime;
            document.getElementById("attendees").innerHTML = "Attendees: " + dataToFetch[i].attendees;
            document.getElementById("organizer").innerHTML = "Organizer: " + dataToFetch[i].organizer.email;
            document.getElementById("link").innerHTML = "Link: " + dataToFetch[i].link;
            document.getElementById("rawData").innerHTML = JSON.stringify(dataToFetch[i], null, 2);
        }
    }
    if (rawSwitch.checked != true) {
        document.getElementById("dataDisplay").style.display = "block";
        document.getElementById("rawDataDisplay").style.display = "none";
    }
    else {
        document.getElementById("dataDisplay").style.display = "none";
        document.getElementById("rawDataDisplay").style.display = "block";
    }
}

for (var calendarCell of calendarCells) {
    calendarCell.addEventListener("click", displayDataFromCalendar);
}

rawSwitch.addEventListener("click", displayDataFromCalendar);

for (var i = 0; i < dataToFetch.length; i++) {
    count = 1;
    var dateFromObject = new Date(dataToFetch[i].start.dateTime);
    for (var j = 0; j < dates.length; j++) {
        if (dateFromObject.getMonth() == month + 1) {
            month++;
            if (month == 11) {
                month = 0;
            }
        }
        if (dateFromObject.getDate() == dates[j] && dateFromObject.getMonth() == month) {
            document.getElementById("p" + (j + 1)).innerHTML = dataToFetch[i].summary;
        }
    }
}
