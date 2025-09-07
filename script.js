// ===== 3D Background (Sphere + Particles) =====
const canvas = document.getElementById('bg3d');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 6;

// Lights
const light = new THREE.PointLight(0x00ccff, 1.5);
light.position.set(5,5,5);
scene.add(light);

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0x0099ff,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0x002244
  })
);
scene.add(sphere);

// Particles
const particles = new THREE.Points(
  new THREE.BufferGeometry().setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      Array.from({ length: 1000 }, () => (Math.random() - 0.5) * 15),
      3
    )
  ),
  new THREE.PointsMaterial({ color: 0x00ccff, size: 0.05 })
);
scene.add(particles);

function animate() {
  sphere.rotation.y += 0.003;
  particles.rotation.y += 0.0008;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ===== Visitor Counter =====
const counter = document.getElementById('visitCount');
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
counter.textContent = visits;

// ===== Profile Upload =====
const input = document.getElementById('profileInput');
const img = document.getElementById('profilePreview');
const placeholder = document.querySelector('.placeholder');

const savedImg = localStorage.getItem('profileImg');
if (savedImg) {
  img.src = savedImg;
  img.style.display = 'block';
  placeholder.style.display = 'none';
}
input?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem('profileImg', reader.result);
    img.src = reader.result;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// ===== Contact Form =====
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form?.addEventListener('submit', async e => {
  e.preventDefault();
  statusEl.textContent = "Sending...";
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = "✅ Message sent successfully!";
    } else {
      statusEl.textContent = "❌ Error sending message.";
    }
  } catch {
    statusEl.textContent = "⚠ Network error. Try again.";
  }
});

/* ===== header-height auto updater + tilt reset ===== */
(function headerSpaceHelper(){
  const header = document.querySelector('header');
  const root = document.documentElement;
  const tilts = document.querySelectorAll('.tilt');

  function updateHeaderHeight(){
    if(!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty('--header-height', h + 'px');
    // ensure body padding also updated (fallback)
    document.body.style.paddingTop = (h + 12) + 'px';
  }

  // reset tilt transforms on scroll to avoid visual mixing
  let scrollTimeout;
  function onScroll(){
    tilts.forEach(el => el.style.transform = 'rotateX(0deg) rotateY(0deg)');
    // small debounce to avoid heavy calls
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // optionally re-enable subtle idle animation or do nothing
    }, 120);
  }

  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener('orientationchange', updateHeaderHeight);
  window.addEventListener('load', () => { updateHeaderHeight(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });

  // initial call
  updateHeaderHeight();
})();