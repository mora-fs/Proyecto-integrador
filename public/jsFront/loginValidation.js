const username= document.querySelector('#nombre-usuario');
const usernameError= document.querySelector('.usernameError');
username.addEventListener('keydown', function(){
    if (!username.value.includes('@') || username.value.length<10){
        usernameError.classList.remove('invisible')
        username.classList.remove('acceptedInput')
    }
    else {
        usernameError.classList.add('invisible')
        username.classList.add('acceptedInput')
    }
})
const password= document.querySelector('#password');
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