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

    var Starfield = function (el, options) {
        this.el = el;
        this.options = Object.assign({}, this.defaults, options);
        this.init();
    };

    var isPlaying;
    var isInited = false;
    var canCanvas = false;
    var animId;
    var that;

    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    }());

    Starfield.prototype = {
        defaults: {
            starColor: "rgba(255,255,255,1)",
            bgColor: "rgba(0,0,0,0.8)",
            mouseMove: true,
            mouseColor: "rgba(0,0,0,0.2)",
            mouseSpeed: 0.09,
            fps: 15,
            speed: 0.2,
            quantity: 300,
            ratio: 256
        },
        resizer: function () {
            var oldStar = this.star;
            var initW = this.context.canvas.width;
            var initH = this.context.canvas.height;

            this.w = this.el.clientWidth;
            this.h = this.el.clientHeight;
            this.x = Math.round(this.w / 150);
            this.y = Math.round(this.h / 200);

            this.context.canvas.width = this.w;
            this.context.canvas.height = this.h;

            var ratX = this.w / initW;
            var ratY = this.h / initH;

            for (var i = 0; i < this.n; i++) {
                this.star[i][0] = oldStar[i][0] * ratX;
                this.star[i][1] = oldStar[i][1] * ratY;

                this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;
            }

            that.context.fillStyle = that.options.bgColor;
            this.context.strokeStyle = this.options.starColor;
        },
        init: function () {
            that = this;
            this.n = this.options.quantity;
            this.star_ratio = this.options.ratio;
            this.star_speed = this.options.speed;
            this.star = new Array(this.n);

            this.w = this.el.clientWidth;
            this.h = this.el.clientHeight;
            this.x = Math.round(this.w / 2);
            this.y = Math.round(this.h / 2);
            this.z = (this.w + this.h) / 2;

            this.context = document.createElement('canvas').getContext('2d');
            this.context.canvas.width = this.w;
            this.context.canvas.height = this.h;
            this.el.appendChild(this.context.canvas);

            this.star_color_ratio = 1 / this.z;
            this.cursor_x = this.x;
            this.cursor_y = this.y;
            for (var i = 0; i < this.n; i++) {
                this.star[i] = [
                    Math.random() * this.w * 2 - this.x * 2,
                    Math.random() * this.h * 2 - this.y * 2,
                    Math.round(Math.random() * this.z),
                    0,
                    0
                ];
            }
            this.context.fillStyle = this.options.bgColor;
            this.context.strokeStyle = this.options.starColor;
            isInited = true;
        },
        anim: function () {
            this.mouse_x = this.cursor_x - this.x;
            this.mouse_y = this.cursor_y - this.y;
            this.context.fillRect(0, 0, this.w, this.h);

            for (var i = 0; i < this.n; i++) {
                var test = true;
                var star_x_save = this.star[i][3];
                var star_y_save = this.star[i][4];
                this.star[i][0] += this.mouse_x >> 7;

                if (this.star[i][0] > this.x << 1) {
                    this.star[i][0] -= this.w << 1;
                    test = false;
                }
                if (this.star[i][0] < -this.x << 1) {
                    this.star[i][0] += this.w << 1;
                    test = false;
                }

                this.star[i][1] += this.mouse_y >> 7;
                if (this.star[i][1] > this.y << 1) {
                    this.star[i][1] -= this.h << 1;
                    test = false;
                }
                if (this.star[i][1] < -this.y << 1) {
                    this.star[i][1] += this.h << 1;
                    test = false;
                }

                this.star[i][2] -= this.star_speed;
                if (this.star[i][2] > this.z) {
                    this.star[i][2] -= this.z;
                    test = false;
                }
                if (this.star[i][2] < 0) {
                    this.star[i][2] += this.z;
                    test = false;
                }

                this.star[i][3] = this.x + (this.star[i][0] / this.star[i][2]) * this.star_ratio;
                this.star[i][4] = this.y + (this.star[i][1] / this.star[i][2]) * this.star_ratio;

                if (star_x_save > 0 && star_x_save < this.w && star_y_save > 0 && star_y_save < this.h && test) {
                    this.context.lineWidth = (1 - this.star_color_ratio * this.star[i][2]) * 1;
                    this.context.beginPath();
                    this.context.moveTo(star_x_save, star_y_save);
                    this.context.lineTo(this.star[i][3], this.star[i][4]);
                    this.context.stroke();
                    this.context.closePath();
                }
            }
        },
        loop: function () {
            this.anim();
            animId = window.requestAnimationFrame(function () { that.loop(); });
        },
        move: function () {
            var doc = document.documentElement;
            var handleMousemove = function (event) {
                that.cursor_x = event.pageX || event.clientX + doc.scrollLeft - doc.clientLeft;
                that.cursor_y = event.pageY || event.clientY + doc.scrollTop - doc.clientTop;
            };
            window.addEventListener('mousemove', handleMousemove, false);
        },
        start: function () {
            if (!isInited) {
                this.init();
            }

            if (!isPlaying) {
                isPlaying = true;
                this.loop();
            }

            window.addEventListener('resize', function () { that.resizer(); }, false);

            if (this.options.mouseMove) {
                this.move();
            }

            return this;
        }
    };

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
                    start: 'top 80%',
                    end: 'top 20%',
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
        scrub: true, 
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
            ease: Expo.easeInOut,
            duration: 1.5
        });
        greyOut(); 
        sec[index].classList.add('active'); 
        updateBackgroundAndSideImage(index);
    }

    function greyOut() {
        sec.forEach(el => el.classList.remove('active')); 
    }

    gsap.to("#circle", { rotate: 0, ease: Expo.easeInOut, duration: 2 });
    let currentSlide = 0;

    function moveSlides(n) {
  let slides = document.getElementsByClassName('slide');
  currentSlide = (currentSlide + n + slides.length) % slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}
});
