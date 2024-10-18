document.addEventListener("DOMContentLoaded", function () {
    const menuTimeline = gsap.timeline({ paused: true });
    const menuToggle = document.getElementById("menuToggle");
    const hamburgerIcon = document.querySelector(".hamburger");
    const smallCircle = document.querySelector('.small-circle');
    const bigCircle = document.querySelector('.big-circle');
    const watchCursor = document.getElementById('watchCursor'); // Watch button cursor
    const videoContainer = document.querySelector('.video-container iframe');

    // Menu Toggle with GSAP Animations
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

    // Move circles with cursor
    document.addEventListener('mousemove', function (e) {
        smallCircle.style.left = e.pageX + 'px';
        smallCircle.style.top = e.pageY + 'px';
        bigCircle.style.left = e.pageX + 'px';
        bigCircle.style.top = e.pageY + 'px';
    });
    function moveCircleWithinBounds(x, y, circle) {
        const circleRadius = circle.offsetWidth / 2;
        const maxX = window.innerWidth - circleRadius;
        const maxY = window.innerHeight - circleRadius;
        const minX = circleRadius;
        const minY = circleRadius;
        const boundedX = Math.min(Math.max(x, minX), maxX);
        const boundedY = Math.min(Math.max(y, minY), maxY);

        circle.style.left = boundedX + 'px';
        circle.style.top = boundedY + 'px';
    }
    document.addEventListener('mousemove', function (e) {
        smallCircle.style.left = e.pageX + 'px';
        smallCircle.style.top = e.pageY + 'px';

        setTimeout(function () {
            moveCircleWithinBounds(e.pageX, e.pageY, bigCircle);
        }, 50);
    });
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
    const hoverElements = document.querySelectorAll('a, button, .menu-toggle');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            bigCircle.classList.add('hover-effect');
        });

        element.addEventListener('mouseleave', () => {
            bigCircle.classList.remove('hover-effect');
        });
    });
    videoContainer.addEventListener('mouseenter', () => {
        smallCircle.style.display = 'none';
        bigCircle.style.display = 'none';
        watchCursor.style.display = 'flex';
    });
    videoContainer.addEventListener('mouseleave', () => {
        smallCircle.style.display = 'block';
        bigCircle.style.display = 'block';
        watchCursor.style.display = 'none';
    });
    document.addEventListener('mousemove', function (e) {
        watchCursor.style.left = e.pageX - 40 + 'px'; 
        watchCursor.style.top = e.pageY - 40 + 'px'; 
    });
});
