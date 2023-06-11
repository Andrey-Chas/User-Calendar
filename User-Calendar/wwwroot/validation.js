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

const validator = new window.JustValidate("#form-email");

validator
    .addField("#email", [
        {
            rule: "required",
        },
        {
            rule: "email",
        },
    ]);

//const formEmail = document.querySelector("#form-email");
//const email = document.getElementById("email");
//const emailError = document.querySelector("#email + span.error");

//email.addEventListener("input", (event) => {
//    if (email.validity.valid) {
//        emailError.textContent = "";
//        emailError.className = "error";
//    }
//    else {
//        showError();
//    }
//});

//formEmail.addEventListener("submit", (event) => {
//    if (!email.validity.valid) {
//        showError();
//        event.preventDefault();
//    }
//    else {
//        alert("Success!");
//    }
//});

//function showError() {
//    if (email.validity.valueMissing) {
//        emailError.textContent = "The field is required";
//    }
//    else if (email.validity.typeMismatch) {
//        emailError.textContent = "Invalid email address";
//    }
//    else if (email.validity.tooShort) {
//        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`;
//    }

//    emailError.className = "error active";
//}