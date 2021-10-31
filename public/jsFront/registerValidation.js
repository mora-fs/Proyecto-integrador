const usersName= document.querySelector('#nombre');
const usersNameError= document.querySelector('.nombreError')
usersName.addEventListener('keydown', function(){
    if (usersName.value.length < 2){
        usersNameError.classList.remove('invisible')
        usersName.classList.remove('acceptedInput')
    }
    else {
        usersNameError.classList.add('invisible')
        usersName.classList.add('acceptedInput')
    }
})
const lastName= document.querySelector('#apellido');
const lastNameError= document.querySelector('.apellidoError')
lastName.addEventListener('keydown', function(){
    if (lastName.value.length < 2){
        lastNameError.classList.remove('invisible')
        lastName.classList.remove('acceptedInput')
    }
    else {
        lastNameError.classList.add('invisible')
        lastName.classList.add('acceptedInput')
    }
})
const email= document.querySelector('#email');
const emailError= document.querySelector('.emailError');
email.addEventListener('keydown', function(){
    if (!email.value.includes('@') || email.value.length<10){
        emailError.classList.remove('invisible')
        email.classList.remove('acceptedInput')
    }
    else {
        emailError.classList.add('invisible')
        email.classList.add('acceptedInput')
    }
})
const password= document.querySelector('#contraseña');
const passwordLengthError= document.querySelector('.largoContraseñaError');
password.addEventListener('keydown', function(){
    if (password.value.length<8){
        passwordLengthError.classList.remove('invisible')
        password.classList.remove('acceptedInput')
    }
    else{
        passwordLengthError.classList.add('invisible')
        password.classList.add('acceptedInput')
    };
});
const confirmPwd= document.querySelector('#confirmarContraseña');
const confirmPwdError= document.querySelector('.confirmarContraseñaError');
confirmPwd.addEventListener('keydown', function(){
    if (confirmPwd.value == password.value){
        confirmPwdError.classList.add('invisible')
        confirmPwd.classList.add('acceptedInput')
    }
    else{
        confirmPwdError.classList.remove('invisible')
        confirmPwd.classList.remove('acceptedInput')
    };
});