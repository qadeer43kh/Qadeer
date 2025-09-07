// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submit
document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    this.reset();
});

// Simple 3D background animation using canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i=0; i<200; i++){
    stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        z: Math.random()*canvas.width
    });
}

function animateStars(){
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ff6f61";
    for(let i=0; i<stars.length; i++){
        let star = stars[i];
        star.z -= 2;
        if(star.z <= 0){
            star.z = canvas.width;
        }

        let k = 128.0 / star.z;
        let px = star.x * k + canvas.width/2;
        let py = star.y * k + canvas.height/2;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI*2);
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});