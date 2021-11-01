
window.onload = function(){
    let usernameValid = false;
    let passValid = false;
    let submit = document.querySelector('#submitButton')
    submit.disabled  = true



    const username= document.querySelector('#nombre-usuario');
    const usernameError= document.querySelector('.usernameError');
    username.onkeyup = function(){
        if (!username.value.includes('@') || username.value.length<10){
            usernameError.classList.remove('invisible')
            username.classList.remove('acceptedInput')
            username.classList.add('errorInput')
            usernameValid = false
        }
        else {
            usernameError.classList.add('invisible')
            username.classList.add('acceptedInput')
            username.classList.remove('errorInput')
            usernameValid= true
        }
    }
    const password= document.querySelector('#password');
    const passwordLengthError= document.querySelector('.largoContraseñaError');
    password.onkeyup = function(){
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



        document.onkeyup = function(){
            if(usernameValid && passValid){
            submit.disabled = false
        }else{
            submit.disabled = true
        }
    }

    
    }};