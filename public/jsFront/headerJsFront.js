const menuButton= document.querySelector('#menuButton');
const dropDownMenu= document.querySelector('#dropDownMenu');
const displayMenuToggle= menuButton.addEventListener('click', function(){
    dropDownMenu.classList.toggle('menuOff');
})
const searchBar= document.querySelector('.d-flex');
const removeSearchBar= ()=>{
    if (window.innerWidth < '760px'){
        searchBar.remove();
    }
}
window.addEventListener('load', function(){
    displayMenuToggle;
    removeSearchBar;
})