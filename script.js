document.addEventListener('DOMContentLoaded', () => {
    function breaktext() {
        var h1 = document.querySelector(".head h1");
        var h1text = h1.textContent;
        var splittedText = h1text.split("");
        var clutter = "";

        splittedText.forEach(function(elem) {
            clutter += `<span>${elem}</span>`;
        });
        h1.innerHTML = clutter;
    }

    breaktext();

    gsap.from("h1 span", {
        y: 50,
        opacity: 0,
        duration: 0.1,
        stagger: 0.1
    });

    var para = document.querySelector(".head p");
    gsap.from(para, {
        y: 50,
        opacity: 0,
        duration: 1
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

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".about", {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });

        gsap.from(".services", {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".services",
                start: "top 80%",
                end: "bottom 30%",
                scrub: true
            }
        });
    }

    var imglft = document.querySelector(".leftabout img");
    imglft.addEventListener("mousemove", function() {
        gsap.to(imglft, {
            scale: 0.8,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    imglft.addEventListener("mouseleave", function() {
        gsap.to(imglft, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
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
});
