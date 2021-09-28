window.onload = () => {
    const images = [
        '../images/carousel-slider/carousel-1.png',
        '../images/carousel-slider/carousel-2.png',
        '../images/carousel-slider/carousel-3.png'
    ];

    let carousel = document.querySelector('.carousel')

    
    
    let positionIndex = 0;
    let buttonLeft = document.querySelector('#left');
    let buttonRight = document.querySelector('#right');
    let image = document.querySelector('#image-carousel');

        



    function showImage () {
        image.src = images[positionIndex];
        // let route = images[positionIndex].toString()
        // image.innerHTML = "<img class='carousel-img' src=" + route + ">";
        // image.style.backgroundImage = `url(${route})`;
    }
    function goRight() {
        if(positionIndex >= images.length - 1) {
            positionIndex = 0;
        } else {
            positionIndex++;
        }
        showImage();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function goLeft() {
        if(positionIndex <= 0) {
            positionIndex = images.length - 1;
        } else {
            positionIndex--;
        }
        showImage();
    }
    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    buttonRight.addEventListener('click', goRight);
    buttonLeft.addEventListener('click', goLeft);

    // showImage()
    // carousel.style.display = 'block'

    setInterval(goRight, 4000)

    
}