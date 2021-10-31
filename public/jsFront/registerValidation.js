const usersName= document.querySelector('#nombre');
const usersNameError= document.querySelector('.nombreError')
usersName.onkeyup = function(){
    if (usersName.value.length < 2){
        usersNameError.classList.remove('invisible')
        usersName.classList.remove('acceptedInput')
        usersName.classList.add('errorInput')
    }
    else {
        usersNameError.classList.add('invisible')
        usersName.classList.add('acceptedInput')
        usersName.classList.remove('errorInput')
    }
}
const lastName= document.querySelector('#apellido');
const lastNameError= document.querySelector('.apellidoError')
lastName.onkeyup= function(){
    if (lastName.value.length < 2){
        lastNameError.classList.remove('invisible')
        lastName.classList.remove('acceptedInput')
        lastName.classList.add('errorInput')
    }
    else {
        lastNameError.classList.add('invisible')
        lastName.classList.add('acceptedInput')
        lastName.classList.remove('errorInput')
    }
}
const email= document.querySelector('#email');
const emailError= document.querySelector('.emailError');
email.onkeyup = function(){
    if (!email.value.includes('@') || email.value.length<10){
        emailError.classList.remove('invisible')
        email.classList.remove('acceptedInput')
        email.classList.add('errorInput')
    }
    else {
        emailError.classList.add('invisible')
        email.classList.add('acceptedInput')
        email.classList.remove('errorInput')
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
    }
    else{
        passwordLengthError.classList.add('invisible')
        password.classList.add('acceptedInput')
        password.classList.remove('errorInput')
    };
};