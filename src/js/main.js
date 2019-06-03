
const navSlide = () => {
        const burger = document.getElementById('burger');
        const nav = document.getElementById('navigation-bar');
        burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
        })
}

navSlide();



const skillsSlide = () => {
        const unit = document.getElementsByClassName('About-us-progress__bar-unit')
        window.addEventListener('scroll', () => {
                const numbers = [79, 90, 69, 92];
                const scrolled = window.scrollY;
                const aboutUs = document.getElementById('aboutUs');
                if (scrolled > aboutUs.offsetTop / 1.2) {
                        unit[0].style.width = numbers[0] + "%";
                        unit[1].style.width = numbers[1] + "%";
                        unit[2].style.width = numbers[2] + "%";
                        unit[3].style.width = numbers[3] + "%";
                }
        });
}
skillsSlide();


$('#headerCarousel').carousel({
        interval: 5500
})

$('#secondCarousel').carousel({
        interval: 3500
});