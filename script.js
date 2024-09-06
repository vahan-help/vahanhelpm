document.addEventListener('DOMContentLoaded', () => {
    // function breaktext() {
    //     var h1 = document.querySelector(".head h1");
    //     var h1text = h1.textContent;
    //     var splittedText = h1text.split("");
    //     var clutter = "";

    //     splittedText.forEach(function(elem) {
    //         clutter += `<span>${elem}</span>`;
    //     });
    //     h1.innerHTML = clutter;
    // }

    // breaktext();

    // gsap.from("h1 span", {
    //     y: 50,
    //     opacity: 0,
    //     duration: 1,
    //     stagger: 0.1
    // });
    gsap.from(".head h1", {
        opacity:0,
        duration:1,
        y:10,
        ease: "power1.in"
    })
    var para = document.querySelector(".head p");
    gsap.from(para, {
        y: 50,
        opacity: 0,
        duration: 0.5
    });

    gsap.from(".nav .right a", {
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to(".contButton", {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        paused: true
    }).eventCallback("onStart", function() {
        this.pause();
    });

    // Hamburger menu functionality
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('.right').classList.toggle('active');
    });

    // Testimonial slider
    const container = document.querySelector('.testimonial-container');
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].clientWidth;
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    document.getElementById('next').addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });

    document.getElementById('prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1;
        }
        updateSlider();
    });

    updateSlider();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbw0L7ZhfoXii1ufpHHLnGg2FFIuFnr25e-vR7C2zMinvi-NPCUpa0LsLAIKtZc5X1mM/exec';
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => alert("Thank you! Your form is submitted successfully."))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message));
        });
    } else {
        console.error('Form not found!');
    }
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 800, // Animation duration in milliseconds
        effect: 'slide', // Default effect
        easing: 'ease in out', // Smooth easing effect
        freemode: true
      });
      
});
