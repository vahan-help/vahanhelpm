document.addEventListener('DOMContentLoaded', () => {
    // Function to split text into spans
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

    // GSAP animations
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

    // Check if viewport width is below the mobile breakpoint
    const isMobile = window.innerWidth <= 768;

    // ScrollTrigger for the left image and services page
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

    function updateSlider() {
        const offset = -currentIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
    }document.getElementById('contactForm').addEventListener('submit', submitForm);

    function submitForm(event) {
        event.preventDefault();
        
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            contact: formData.get('contact'),
            message: formData.get('message')
        };
    console.log(data)
        fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbx8WgOoQ5wMcrvaAxvLZnSuMurmP9ukjk3vMn8cco6qWmPjQYZB5ruD2FxIlVsTukFH/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.text())
          .then(text => {
              alert('Message sent successfully!');
              form.reset();
          })
          .catch(error => {
              alert('There was a problem sending your message.');
              console.error('Error:', error);
          });
    }
    
        
    
});
