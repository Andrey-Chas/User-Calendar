//(() => {
//    'use strict'

//    const forms = document.querySelectorAll('.needs-validation')

//    Array.from(forms).forEach(form => {
//        form.addEventListener('submit', event => {
//            if (!form.checkValidity()) {
//                event.preventDefault()
//                event.stopPropagation()
//            }

//            form.classList.add('was-validated')
//        }, false)
//    })
//})()

//const validator = new window.JustValidate("#form-email");

//validator
//    .addField("#email", [
//        {
//            rule: "required",
//        },
//        {
//            rule: "email",
//        },
//    ]);

const form = document.querySelector("form");
const formShow = document.querySelector("#showData");
const input = document.getElementById("value");
const label = document.getElementById("labelProvidedData");
const error = document.querySelector(".error");
const container = document.getElementById("container");

const dataToFetch = [
    {
        "summary": "supetest",
        "id": "AQMkADAwATM0MDAAMS1iOTBmLTc3AGVjLTAwAi0wMAoARgAAA5qCGGg3EJFKqTdXg9Db-0UHALP8zwkk-ehHnIL88hsNTfcAAAIBDQAAALP8zwkk-ehHnIL88hsNTfcABkayNS0AAAA=",
        "start": {
            "dateTime": "2023-06-17T14:00:00"
        },
        "attendees": ["user1@gmail.com", "user2@gmail.com", "user3@gmail.com"],
        "organizer": {
            "email": "outlook_556C818D2795D20F@outlook.com"
        },
        "link": "https://link.com"
    }
]

const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const uuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

//input.addEventListener("input", (event) => {
//    if (input.validity.valid) {
//        error.textContent = "";
//    }
//    else {
//        showError();
//    }
//});

input.addEventListener("input", validate);

function validate() {
    if (input.validity.valueMissing) {
        input.setCustomValidity("The field is required");
    }
    else if (!email.test(input.value) && !uuid.test(input.value)) {
        input.setCustomValidity("Invalid email or uuid");
    }
    else {
        input.setCustomValidity("");
    }

    error.textContent = "";
}

form.addEventListener("submit", function (event) {
    if (!input.checkValidity()) {
        event.preventDefault();
        error.textContent = input.validationMessage;
    }
    else {
        form.style.visibility = "collapse";
        formShow.style.visibility = "visible";
        fetchData();
        event.preventDefault();
    }
});

function fetchData() {
    fetch("./data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var result = "";
            for (var item in data) {
                result += `
                <div>Title: ${item.summary}</div>
                <div>Start date: ${item.start.dateTime}</div>
                <div>Attendees: ${item.attendees}</div>
                <div>Organizer: ${item.organizer.email}</div>
                `;
            }

            container.innerHTML = result;
        })
        .catch(function (error) {
            console.log(`Error fetching data: ${error}`);
            container.innerHTML = "Error loading data";
        })
}

//anotherInput.addEventListener("input", (event) => {
//    if (anotherInput.validity.valid) {
//        errorSecondField.textContent = "";
//    }
//    else {
//        showErrorSecondValue();
//    }
//});

//form.addEventListener("submit", (event) => {
//    if (!input.validity.valid) {
//        showError();
//        // showErrorSecondValue();
//        event.preventDefault();
//    }
//    else {
//        form.style.visibility = "collapse";
//        formShow.style.visibility = "visible";
//        document.getElementById("enteredData").value = input.value;
//        document.getElementById("anotherEnteredData").value = anotherInput.value;
//        event.preventDefault();
//    }
//});

//function showError() {
//    if (input.validity.valueMissing) {
//        error.textContent = "The field is required";
//    }
//    else if (!email.test(input.value)) {
//        error.textContent = "Invalid email or uuid";
//    }
//}

//function showErrorSecondValue() {
//    if (anotherInput.validity.valueMissing) {
//        errorSecondField.textContent = "The field is required";
//    }
