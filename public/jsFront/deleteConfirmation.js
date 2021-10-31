const productCard= document.querySelector('.detailProductCard');
const deleteButton= document.querySelector('#deleteButton');
const confirmDeleteDiv= document.querySelector('.confirmDeleteDiv');
deleteButton.addEventListener('click', function(){
    productCard.classList.add('blurBackground')
    confirmDeleteDiv.classList.remove('dontShowAlert')
})
const cancelDeleteButton= document.querySelector('#cancelDeleteButton');
cancelDeleteButton.addEventListener('click', function(){
    productCard.classList.remove('blurBackground')
    confirmDeleteDiv.classList.add('dontShowAlert')
})