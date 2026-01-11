document.addEventListener('DOMContentLoaded', () => {
// Slider-header
    const bgSlides = document.querySelectorAll('.bg-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderContainer = document.querySelector('.hero-slider');
    
    if (sliderContainer && bgSlides.length > 0) {
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 5000;

        function updateSlider(index) {
            bgSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            bgSlides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % bgSlides.length;
            updateSlider(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + bgSlides.length) % bgSlides.length;
            updateSlider(currentIndex);
        }

        function startAutoPlay() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
                startAutoPlay();
            });
        });

        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
        startAutoPlay();
    }


    // Burger-menu
    const burger = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobileNav');
    const menuOverlay = document.getElementById('menuOverlay');
    const headerBody = document.querySelector('.header-body'); 
    const body = document.body;

    if (burger && mobileNav) {
        
        function toggleMenu() {
            burger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            if (headerBody) {
                headerBody.classList.toggle('menu-open');
            }
            
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            body.classList.toggle('lock'); 
        }

        burger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', toggleMenu);
        }

        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (burger.classList.contains('active')) toggleMenu();
            });
        });
    }
});