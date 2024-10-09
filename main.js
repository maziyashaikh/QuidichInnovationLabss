document.addEventListener('DOMContentLoaded', () => {
    const shimmerWave = document.getElementById('shimmerWave');
    const video = document.getElementById('preloaderVideo');
    const counter = document.getElementById('counter');
    const pageContent = document.getElementById('pageContent');
    const preloader = document.getElementById('preloader');
    const blob = document.getElementById('blob');

    // Rolling number effect
    function startRollingCounter(duration) {
      let currentValue = 0;
      const stepTime = Math.floor(duration / 100);
      const counterInterval = setInterval(() => {
        currentValue++;
        counter.innerHTML = currentValue.toString().padStart(3, '0');
        if (currentValue >= 100) {
          clearInterval(counterInterval);
          gsap.to(preloader, { opacity: 0, duration: 1, onComplete: () => preloader.style.display = 'none' });
          pageContent.style.visibility = 'visible';
          gsap.to(pageContent, { top: '0%', duration: 1.5, ease: "power3.inOut" });
        }
      }, stepTime);
    }

    // Split the text for wave effect
    function splitTextToSpans(targetElement) {
      const text = targetElement.textContent.trim(); 
      targetElement.innerHTML = '';
      for (let character of text) {
        const span = document.createElement('span');
        span.textContent = character === ' ' ? '\u00A0' : character; 
        targetElement.appendChild(span);
      }
    }

    splitTextToSpans(shimmerWave);

    // Hide text, then start counter and video together
    setTimeout(() => {
      gsap.to(shimmerWave, { opacity: 0, duration: 1, onComplete: () => {
        counter.style.opacity = 1;
        video.classList.remove('hidden'); 
        video.play(); // Ensure video starts immediately
        gsap.to(video, { opacity: 1, duration: 1 }); 
        const videoDuration = video.duration * 1000;
        startRollingCounter(videoDuration); 
      }});
    }, 3200);

    // Blob movement on mouse move
    document.body.addEventListener('pointermove', (e) => {
      const { clientX: x, clientY: y } = e;
      blob.style.transform = `translate(${x - window.innerWidth / 2}px, ${y - window.innerHeight / 2}px)`;
    });
  });