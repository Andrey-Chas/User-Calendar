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

const form = document.querySelector("#form-email");
const email = document.getElementById("email");
const error = document.querySelector(".error");

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        error.textContent = "";
    }
    else {
        showError();
    }
});

form.addEventListener("submit", (event) => {
    if (!email.validity.valid) {
        showError();
        event.preventDefault();
    }
    else {
        alert("Success!");
    }
});

function showError() {
    if (email.validity.valueMissing) {
        error.textContent = "The field is required";
    }
    else if (email.validity.patternMismatch) {
        error.textContent = "Invalid email address";
    }
}