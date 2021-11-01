window.onload = function (){
    let nameValid = false;
    let descriptionValid = false;
    let submit = document.querySelector('#submitButton')
    submit.disabled = true
   

    const name = document.querySelector('#name');
    const nameError = document.querySelector('.nameError')

    name.onkeyup = function(){
        if (name.value.length<5){
            nameError.classList.remove('invisible')
            name.classList.remove('acceptedInput')
            name.classList.add('errorInput')
            nameValid = false

        }
        else {
            nameError.classList.add('invisible')
            name.classList.add('acceptedInput')
            name.classList.remove('errorInput')
            nameValid = true
        }
    }


    const description = document.querySelector('#description');
    const descriptionError = document.querySelector('.descriptionError')

    description.onkeyup = function(){
        if (description.value.length<20){
            descriptionError.classList.remove('invisible')
            description.classList.remove('acceptedInput')
            description.classList.add('errorInput')
            descriptionValid = false
        }
        else {
            descriptionError.classList.add('invisible')
            description.classList.add('acceptedInput')
            description.classList.remove('errorInput')
            descriptionValid = true
        }
    }

    document.onkeyup = function(){
        if(nameValid === true && descriptionValid === true){
        submit.disabled = false
    }else{
        submit.disabled = true
    }
}


}