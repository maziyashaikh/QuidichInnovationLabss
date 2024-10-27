document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const menuTimeline = gsap.timeline({ paused: true });
    const menuToggle = document.getElementById("menuToggle");
    const hamburgerIcon = document.querySelector(".hamburger");

    menuToggle.addEventListener('click', function () {
        hamburgerIcon.classList.toggle('close');

        if (menuTimeline.reversed()) {
            menuTimeline.play();
        } else {
            menuTimeline.reverse();
        }
    });

    menuTimeline.to('.fullpage-menu', {
        duration: 0,
        display: "block",
        ease: 'Expo.easeInOut',
    }).from('.main-menu li a', {
        duration: 1.5,
        y: "100%",
        opacity: 0,
        stagger: 0.2,
        ease: 'Expo.easeInOut'
    }, "-=0.5").from('.small-menu a', {
        duration: 1.5,
        y: "100%",
        opacity: 0,
        stagger: 0.2,
        ease: 'Expo.easeInOut'
    }, "-=0.5").from('.social-links li', {
        duration: 1,
        y: "-100%",
        opacity: 0,
        stagger: 0.1,
        ease: 'Expo.easeInOut'
    }, "-=0.5");

    menuTimeline.reverse();

    const smallCircle = document.querySelector('.small-circle');
    const bigCircle = document.querySelector('.big-circle');
    const circleSliderSection = document.getElementById('main');

    function hideCircles() {
    bigCircle.style.display = 'none';
    smallCircle.style.display = 'none';
}

function showCircles() {
    bigCircle.style.display = 'block';
    smallCircle.style.display = 'block';
}

circleSliderSection.addEventListener('mouseenter', hideCircles);
circleSliderSection.addEventListener('mouseleave', showCircles);

    document.addEventListener('mousemove', function (e) {
        smallCircle.style.left = e.pageX + 'px';
        smallCircle.style.top = e.pageY + 'px';
        bigCircle.style.left = e.pageX + 'px';
        bigCircle.style.top = e.pageY + 'px';
    });

    const clickableElements = document.querySelectorAll('a, iframe, button, .menu-toggle');
    clickableElements.forEach(element => {
        element.style.cursor = 'none';
    });

const videoIframe = document.querySelector('.video-container iframe');
function enableDefaultCursor() {
    smallCircle.style.display = 'none';
    bigCircle.style.display = 'none';
    videoIframe.style.cursor = 'default';
}
function disableDefaultCursor() {
    smallCircle.style.display = 'block';
    bigCircle.style.display = 'block';
    videoIframe.style.cursor = 'none';
}

videoIframe.addEventListener('mouseenter', enableDefaultCursor);
videoIframe.addEventListener('mouseleave', disableDefaultCursor);

    const magneticBtn = document.querySelector(".menu-toggle");
    magneticBtn.addEventListener("mousemove", function (event) {
        const { left, top, width, height } = magneticBtn.getBoundingClientRect();
        const magnetStrength = 0.25;
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const maxOffset = 15;
        gsap.to(magneticBtn, {
            x: Math.max(-maxOffset, Math.min(dx * magnetStrength, maxOffset)),
            y: Math.max(-maxOffset, Math.min(dy * magnetStrength, maxOffset)),
            duration: 0.3,
            ease: "power4.out"
        });
        gsap.to(bigCircle, {
            scale: 1.8,
            ease: "power4.out",
            duration: 0.3
        });
    });

    magneticBtn.addEventListener("mouseleave", function () {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        gsap.to(bigCircle, { scale: 1, duration: 0.3, ease: "power4.out" });
    });

    const hoverElements = document.querySelectorAll('a, button, .menu-toggle, iframe');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(bigCircle, {
                scale: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.8)',
                duration: 0.3,
                ease: "power4.out"
            });
        });
        element.addEventListener('mouseleave', () => {
            gsap.to(bigCircle, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: '#fff',
                duration: 0.3,
                ease: "power4.out"
            });
        });
    });

    const items = document.querySelectorAll('.fly-in-text li');
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.text-section',
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
        }
    });

    tl.fromTo(items, {
        opacity: 0,
        scale: 3,
        x: () => gsap.utils.random(-500, 500), 
        y: () => gsap.utils.random(-300, 300), 
    }, {
        opacity: 1,
        scale: 1,
        x: 0, 
        y: 0,
        duration: 1,
        stagger: {
            amount: 1, 
            from: "random" 
        },
        ease: "power3.out" 
    });

    tl.eventCallback("onComplete", () => {
        items.forEach(item => {
            item.classList.add('normal-size');
        });
    });

    function animateCounter(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    ScrollTrigger.create({
        trigger: '.counter-section',
        start: 'top 80%', 
        onEnter: () => {
            animateCounter("counter1", 0, 5, 2000);
            animateCounter("counter2", 0, 10, 2000);
            animateCounter("counter3", 0, 15, 2000);
        },
        once: true 
    });



    gsap.fromTo(".main-heading", {
        color: "rgba(255, 255, 255, 0.5)",
    }, {
        color: "white",
        duration: 1,
        scrollTrigger: {
            trigger: "#section2",
            start: "top 80%",
            end: "top 20%",
            scrub: true,
        }
    });

    function createStarfield(selector, options) {
        var element = document.querySelector(selector);
        if (element) {
            new Starfield(element, options).start();
        }
    }

    createStarfield('.starfield', {
        starColor: "rgba(255,255,255,0.5)",
        bgColor: "rgba(0,0,0,0.8)",
        mouseMove: true,
        quantity: 200,
        speed: 1,
        ratio: 256
    });

    const splitTypes = document.querySelectorAll('.reveal-type');
    splitTypes.forEach((char) => {
        char.style.color = "rgb(48 46 46)";
    });

    splitTypes.forEach((char) => {
        const text = new SplitType(char, { types: 'words' });
        gsap.fromTo(text.words, 
            {
                color: "rgb(48 46 46)", 
            },
            {
                color: "#ffffff", 
                duration: 0.2,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: char,
                    start: 'top 50%',
                    end: 'top 0%',
                    scrub: true,
                    toggleActions: 'play play reverse reverse',
                }
            }
        );
    });

   let active = 0;
    const sec = document.querySelectorAll(".stripe");
    const sideImages = [
        'assets/stadiumimg.png',
        'assets/stadiumimg.png',
        'assets/stadiumimg.png',
        'assets/stadiumimg.png',
        'assets/stadiumimg.png',
        'assets/stadiumimg.png'
    ];

    function updateBackgroundAndSideImage(index) {
        document.getElementById('sideImage').style.backgroundImage = `url(${sideImages[index]})`;
    }

    sec[active].classList.add('active');

    ScrollTrigger.create({
    trigger: "#main",
    start: "top top", 
    end: "+=3000", 
    pin: true, 
    scrub: 2, // Keeping scrub value for smoother scrolling
    onUpdate: (self) => {
        const index = Math.floor(self.progress * sec.length);
        if (active !== index) {
            active = index;
            rotateCircle(active);
        }
    }
});

function rotateCircle(index) {
    gsap.to("#circle", {
        rotate: -(index * 15),
        ease: "power3.out", 
        duration: 1.8 
    });

    // Update the visibility of the points
    greyOut(); 
    sec[index].classList.add('active'); 
    updateBackgroundAndSideImage(index);
}

function greyOut() {
    sec.forEach(el => {
        el.classList.remove('active');
        el.querySelector('.number-circle').style.opacity = '0.5'; 
    });
}

sec.forEach((section, idx) => {
    section.addEventListener('scroll', () => {
        if (idx === active) {
            section.querySelector('.number-circle').style.opacity = '1';
        }
    });
});

    gsap.to("#circle", { rotate: 0, ease: Expo.easeInOut, duration: 2 });
    let currentSlide = 0;

function moveSlides(n) {
  let slides = document.getElementsByClassName('slide');
  currentSlide = (currentSlide + n + slides.length) % slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

document.querySelector('.prev').addEventListener('click', () => moveSlides(-1));
document.querySelector('.next').addEventListener('click', () => moveSlides(1));
const cursorElements = document.querySelectorAll('button.prev, button.next');

cursorElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.querySelector('.small-circle').style.display = 'none';
    document.querySelector('.big-circle').style.display = 'none';
  });

  el.addEventListener('mouseleave', () => {
    document.querySelector('.small-circle').style.display = 'block';
    document.querySelector('.big-circle').style.display = 'block';
  });
});
});
