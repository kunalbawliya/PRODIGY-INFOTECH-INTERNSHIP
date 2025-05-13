const toggleButton = document.getElementById('toggleMode');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  toggleButton.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for contacting! 🚀');
    contactForm.reset();
  });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for subscribing! 📧');
    newsletterForm.reset();
  });
}

const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let particlesArray = [];

  class Particle {
    constructor(){
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    update(){
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.y > canvas.height) this.y = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y < 0) this.y = canvas.height;
    }
    draw(){
      ctx.fillStyle = body.classList.contains('dark') 
        ? 'rgba(255,0,79,0.7)' 
        : 'rgba(0,201,255,0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init(){
    particlesArray = [];
    for (let i = 0; i < 100; i++){
      particlesArray.push(new Particle());
    }
  }

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
  });
}
