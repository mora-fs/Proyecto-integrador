window.onload = function (){
    let nameValid = false;
    let lastNameValid = false;
    let emailValid = false;
    let passValid = false;
    let confirmPassValid = false
    let submit = document.querySelector('#submitButton')
    submit.disabled  = true


    const usersName= document.querySelector('#nombre');
    const usersNameError= document.querySelector('.nombreError')
    usersName.onkeyup = function(){
        if (usersName.value.length < 2){
            usersNameError.classList.remove('invisible')
            usersName.classList.remove('acceptedInput')
            usersName.classList.add('errorInput')
            nameValid = false
        }
        else {
            usersNameError.classList.add('invisible')
            usersName.classList.add('acceptedInput')
            usersName.classList.remove('errorInput')
            nameValid = true
        }
    }
    const lastName= document.querySelector('#apellido');
    const lastNameError= document.querySelector('.apellidoError')
    lastName.onkeyup= function(){
        if (lastName.value.length < 2){
            lastNameError.classList.remove('invisible')
            lastName.classList.remove('acceptedInput')
            lastName.classList.add('errorInput')
            lastNameValid = false
        }
        else {
            lastNameError.classList.add('invisible')
            lastName.classList.add('acceptedInput')
            lastName.classList.remove('errorInput')
            lastNameValid = true
        }
    }
    const email= document.querySelector('#email');
    const emailError= document.querySelector('.emailError');
    email.onkeyup = function(){
        if (!email.value.includes('@') || email.value.length<10){
            emailError.classList.remove('invisible')
            email.classList.remove('acceptedInput')
            email.classList.add('errorInput')
            emailValid = false
        }
        else {
            emailError.classList.add('invisible')
            email.classList.add('acceptedInput')
            email.classList.remove('errorInput')
            emailValid = true
        }
    }
    const password= document.querySelector('#contraseña');
    const passwordLengthError= document.querySelector('.largoContraseñaError');
    password.onkeyup = function(){
        console.log(password.value)
        if (password.value.length<8){
            passwordLengthError.classList.remove('invisible')
            password.classList.remove('acceptedInput')
            password.classList.add('errorInput')
            passValid = false
        }
        else{
            passwordLengthError.classList.add('invisible')
            password.classList.add('acceptedInput')
            password.classList.remove('errorInput')
            passValid = true
        };

    const confirmPass = document.querySelector('#confirmarContrasena');
    const confirmPassError= document.querySelector('.confirmarContrasenaError');
    confirmPass.onkeyup = function(){
        if(confirmPass.value != password.value){
            confirmPassError.classList.remove('invisible')
            confirmPass.classList.remove('acceptedInput')
            confirmPass.classList.add('errorInput')
            confirmPassValid = false
        }
        else{
            confirmPassError.classList.add('invisible')
            confirmPass.classList.add('acceptedInput')
            confirmPass.classList.remove('errorInput')
            confirmPassValid = true
        }
    }

    document.onkeyup = function(){
        if(nameValid && lastNameValid && emailValid && passValid && confirmPassValid){
        submit.disabled = false
    }else{
        submit.disabled = true
    }
}

    }}