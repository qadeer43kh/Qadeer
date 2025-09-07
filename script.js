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
    alert("Thank you! Your message has been sent successfully.");
    this.reset();
});

// Full 3D star-like background with depth effect
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i=0; i<400; i++){
    stars.push({
        x: Math.random()*canvas.width - canvas.width/2,
        y: Math.random()*canvas.height - canvas.height/2,
        z: Math.random()*canvas.width
    });
}

function animateStars(){
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ff6f61";
    for(let i=0; i<stars.length; i++){
        let star = stars[i];
        star.z -= 4;
        if(star.z <= 0){
            star.z = canvas.width;
            star.x = Math.random()*canvas.width - canvas.width/2;
            star.y = Math.random()*canvas.height - canvas.height/2;
        }

        let k = 128.0 / star.z;
        let px = star.x * k + canvas.width/2;
        let py = star.y * k + canvas.height/2;

        ctx.beginPath();
        ctx.arc(px, py, k*2, 0, Math.PI*2);
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});