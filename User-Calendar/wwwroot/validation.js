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
const inputName = input.getAttribute("name");
const error = document.querySelector(".error");

const anotherInput = document.getElementById("anotherValue");
const errorSecondField = document.querySelector(".errorSecondField");

input.addEventListener("input", (event) => {
    if (input.validity.valid) {
        error.textContent = "";
    }
    else {
        showError();
    }
});

anotherInput.addEventListener("input", (event) => {
    if (anotherInput.validity.valid) {
        errorSecondField.textContent = "";
    }
    else {
        showErrorSecondValue();
    }
});

form.addEventListener("submit", (event) => {
    if (!input.validity.valid) {
        showError();
        showErrorSecondValue();
        event.preventDefault();
    }
    else {
        form.style.visibility = "collapse";
        formShow.style.visibility = "visible";
        document.getElementById("enteredData").value = input.value;
        document.getElementById("anotherEnteredData").value = anotherInput.value;
        event.preventDefault();
    }
});

function showError() {
    if (input.validity.valueMissing) {
        error.textContent = "The field is required";
    }
    else if (input.validity.patternMismatch) {
        if (inputName == "email") {
            error.textContent = "Invalid email address";
        }
        else {
            error.textContent = "Invalid uuid";
        }
    }
}

function showErrorSecondValue() {
    if (anotherInput.validity.valueMissing) {
        errorSecondField.textContent = "The field is required";
    }
}
