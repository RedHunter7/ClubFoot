const loadCarousel = () => {
    const carousel = document.querySelectorAll('.carousel.carousel-slider');
    M.Carousel.init(carousel, {
        dist: 0,
        duration: 100
    });

    let matchCarousel = document.getElementById('match-carousel');
    let matchCarouselInstance = M.Carousel.getInstance(matchCarousel);

    let autoplay =  setInterval(() => {
        matchCarouselInstance.next();
    },2000)

    let slideLeft = document.getElementById('slide-left');
    slideLeft.addEventListener('click', () => {
        clearInterval(autoplay);
        matchCarouselInstance.prev();
    });
    
    let slideRight = document.getElementById('slide-right');
    slideRight.addEventListener('click', () => {
        clearInterval(autoplay);
        matchCarouselInstance.next();
    })
}

export default loadCarousel;