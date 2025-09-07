/* === header-height helper (fix overlap) === */
(function headerHelper(){
  const header = document.querySelector('header');
  const root = document.documentElement;
  function setHeight(){
    if(!header) return;
    const h = Math.ceil(header.getBoundingClientRect().height);
    root.style.setProperty('--header-height', h + 'px');
    document.body.style.paddingTop = (h + 12) + 'px';
  }
  window.addEventListener('load', setHeight);
  window.addEventListener('resize', setHeight);
  // call immediate
  setHeight();
})();

/* === Visitor counter (local) === */
(function visitorCounter(){
  const el = document.getElementById('visitCount');
  if(!el) return;
  let v = parseInt(localStorage.getItem('q_visits') || '0', 10);
  v = isNaN(v) ? 1 : v + 1;
  localStorage.setItem('q_visits', v);
  el.textContent = v;
})();

/* === 3D background (simple sphere + particles, lightweight) === */
(function background3D(){
  try {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg3d-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    const light = new THREE.PointLight(0x00ccff, 1.2);
    light.position.set(5,5,5);
    scene.add(light);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x0066aa, metalness: 0.6, roughness: 0.3, emissive: 0x001630 })
    );
    scene.add(sphere);

    // particles
    const pts = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position',
        new THREE.Float32BufferAttribute(new Array(1200).fill().map(()=> (Math.random()-0.5)*18 ), 3)
      ),
      new THREE.PointsMaterial({ color:0x00ccff, size:0.04, transparent:true, opacity:0.7 })
    );
    scene.add(pts);

    function anim(){
      sphere.rotation.y += 0.004;
      sphere.rotation.x += 0.002;
      pts.rotation.y -= 0.0007;
      renderer.render(scene, camera);
      requestAnimationFrame(anim);
    }
    anim();

    window.addEventListener('resize', ()=>{
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    });
  } catch(e){
    console.warn('3D init failed', e);
  }
})();

/* === Profile preview (shows profile.jpg automatically) === */
(function profilePreview(){
  const img = document.getElementById('profilePreview');
  const siteImg = document.getElementById('siteProfile');
  // If you want local upload preview (owner only) you may keep code, else it uses repo image
  const input = document.getElementById('profileInput');
  if(!img && !siteImg) return;
  // if siteProfile exists and image is missing, show placeholder (handled by CSS)
})();

/* === Contact form handling (fetch to Formspree) === */
(function contactHandler(){
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    const endpoint = form.action; // update with Formspree endpoint
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        statusEl.textContent = '✅ Message sent. I will contact you soon.';
        form.reset();
      } else {
        // parse JSON error if any
        const txt = await res.text();
        statusEl.textContent = '❌ Sending failed. Use email directly.';
        console.warn('Contact send failed', res.status, txt);
      }
    } catch(err){
      statusEl.textContent = '⚠ Network error. Try again or email me.';
      console.error(err);
    }
  });
})();