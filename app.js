/**
 * AROMAN 3D - Antigravity E-Commerce & Learnable Science Academy Engine
 * Three.js WebGL 3D Physics Engine, Web Audio Synthesizer, Botany Lab, Quests & Store
 */

// ==========================================================================
// 1. PRODUCT CATALOG DATABASE
// ==========================================================================
const PRODUCTS_DATA = [
  // --- Fruits & Vegetables ---
  {
    id: 'prod-1',
    name: 'Organic Hass Avocados (Pack of 2)',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 189,
    originalPrice: 249,
    weight: '2 pcs (approx 350g)',
    rating: 4.9,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    badge: '100% Organic',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Creamy, nutrient-rich Mexican Hass avocados harvested at optimal ripeness. Loaded with heart-healthy monounsaturated oleic acid.',
    features: ['Zero chemical pesticides', 'Rich in healthy oleic fats', 'Inspected for creamy texture'],
    nutrition: '160 kcal per 100g | 2g Protein | 15g Oleic Fats',
    modelType: 'avocado'
  },
  {
    id: 'prod-2',
    name: 'Hydroponic Baby Spinach Leaves',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 65,
    originalPrice: 85,
    weight: '200g Box',
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    badge: 'Hydroponic',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: false,
    inStock: true,
    description: 'Crisp, triple-washed hydroponic baby spinach leaves grown in clean mineral water beds. High chlorophyll and bioavailable iron.',
    features: ['Triple washed & UV sanitized', 'Rich in iron & vitamins A/C', '100% pesticide-free'],
    nutrition: '23 kcal per 100g | 2.9g Protein | High Iron',
    modelType: 'leaf'
  },
  {
    id: 'prod-3',
    name: 'Farm Heirloom Cherry Tomatoes',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 79,
    originalPrice: 110,
    weight: '250g Box',
    rating: 4.7,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    badge: 'Fresh Pick',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: false,
    deal: true,
    inStock: true,
    description: 'Juicy, sun-ripened ruby red cherry tomatoes bursting with sweet lycopene antioxidants from Nashik valley farms.',
    features: ['High lycopene content', 'Picked at sunrise', 'Crisp snap with every bite'],
    nutrition: '18 kcal per 100g | High Antioxidants',
    modelType: 'apple'
  },
  {
    id: 'prod-4',
    name: 'Ratnagiri Alphonso Mangoes (Grade A)',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 699,
    originalPrice: 899,
    weight: '6 pcs Gift Box',
    rating: 5.0,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    badge: 'GI Tagged',
    badgeClass: 'badge-deal',
    organic: true,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Authentic GI-tagged Ratnagiri King Alphonso mangoes. Naturally tree-ripened without carbide for heavenly aroma and saffron pulp.',
    features: ['100% Naturally Ripened', 'Authentic GI Tag Certified', 'Rich saffron color & aroma'],
    nutrition: '60 kcal per 100g | Vitamin C 60%',
    modelType: 'orange'
  },
  {
    id: 'prod-5',
    name: 'Fresh Exotic Broccoli Crowns',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 85,
    originalPrice: 120,
    weight: '500g Pack',
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
    badge: '100% Organic',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: false,
    deal: true,
    inStock: true,
    description: 'Deep green, firm florets loaded with dietary fiber and sulforaphane. Ideal for stir-fries, soups, and healthy steaming.',
    features: ['High dietary fiber', 'Crisp floret texture', 'Local farm harvest'],
    nutrition: '34 kcal per 100g | 2.8g Protein',
    modelType: 'leaf'
  },
  {
    id: 'prod-6',
    name: 'Tri-Color Bell Peppers (Red, Yellow, Green)',
    category: 'fruits-veg',
    dept: 'Fresh Produce',
    price: 119,
    originalPrice: 160,
    weight: '3 pcs Combo (approx 450g)',
    rating: 4.8,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    badge: 'Farm Fresh',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: false,
    deal: true,
    inStock: true,
    description: 'Crunchy, vibrantly colored bell peppers harvested in climate-controlled greenhouse polyhouses for maximum freshness.',
    features: ['Rich in vitamin A & C', 'Crisp crunchy texture', 'Zero blemishes'],
    nutrition: '20 kcal per 100g | High Bioflavonoids',
    modelType: 'orange'
  },

  // --- Dairy & Eggs ---
  {
    id: 'prod-7',
    name: 'Pure Desi Cow A2 Whole Milk',
    category: 'dairy-eggs',
    dept: 'Dairy & Eggs',
    price: 95,
    originalPrice: 110,
    weight: '1 Litre Glass Bottle',
    rating: 4.9,
    reviewCount: 650,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    badge: 'A2 Certified',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: false,
    inStock: true,
    description: 'Fresh, non-homogenized A2 whole milk from grass-fed Gir cows. Contains Proline-67 peptide for seamless digestion without bloating.',
    features: ['Grass-fed Gir cows', 'Non-homogenized natural cream', 'Delivered cold in glass bottles'],
    nutrition: '65 kcal per 100ml | 3.4g Protein',
    modelType: 'pod'
  },
  {
    id: 'prod-8',
    name: 'Free-Range Organic Brown Eggs (Pack of 12)',
    category: 'dairy-eggs',
    dept: 'Dairy & Eggs',
    price: 145,
    originalPrice: 180,
    weight: '12 pcs Box',
    rating: 4.9,
    reviewCount: 510,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    badge: 'Free Range',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Antibiotic-free brown eggs from free-roaming hens fed organic flaxseed and grains. Deep golden yolks high in Omega-3.',
    features: ['High Omega-3 fatty acids', 'Hormone and antibiotic-free', 'Deep golden yolks'],
    nutrition: '72 kcal per egg | 6g Protein',
    modelType: 'apple'
  },
  {
    id: 'prod-9',
    name: 'Fresh Malai Cottage Cheese (Paneer)',
    category: 'dairy-eggs',
    dept: 'Dairy & Eggs',
    price: 125,
    originalPrice: 150,
    weight: '250g Vacuum Pack',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    badge: 'Ultra Fresh',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: false,
    inStock: true,
    description: 'Melt-in-mouth soft artisanal paneer crafted from whole A2 cow milk. No preservatives, starch, or additives.',
    features: ['Crafted daily at 4 AM', 'Ultra soft melt-in-mouth', 'Zero preservatives'],
    nutrition: '265 kcal per 100g | 18g High Protein',
    modelType: 'pod'
  },

  // --- Meat & Seafood ---
  {
    id: 'prod-10',
    name: 'Fresh Tender Chicken Breast (Boneless)',
    category: 'meat-seafood',
    dept: 'Meat & Seafood',
    price: 249,
    originalPrice: 320,
    weight: '500g Chilled Pack',
    rating: 4.9,
    reviewCount: 478,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    badge: 'Antibiotic Free',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Lean, juicy boneless chicken breast cuts from farm-raised poultry. Vacuum sealed and chilled to 2°C for peak freshness.',
    features: ['100% Antibiotic & Chemical Free', 'Chilled, never frozen', 'Trimmed & ready to cook'],
    nutrition: '120 kcal per 100g | 26g High Protein',
    modelType: 'pod'
  },
  {
    id: 'prod-11',
    name: 'Fresh Norwegian Salmon Fillet',
    category: 'meat-seafood',
    dept: 'Meat & Seafood',
    price: 749,
    originalPrice: 950,
    weight: '300g (Skin-on)',
    rating: 5.0,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    badge: 'Sashimi Grade',
    badgeClass: 'badge-deal',
    organic: false,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Premium Atlantic salmon air-flown from cold Norwegian fjords. Rich in healthy Omega-3 EPA & DHA oils.',
    features: ['Air-flown weekly', 'High Omega-3 & Vitamin D', 'Sashimi-grade purity'],
    nutrition: '208 kcal per 100g | 20g Protein | 13g Omega Fats',
    modelType: 'pod'
  },

  // --- Bakery & Staples ---
  {
    id: 'prod-12',
    name: 'Artisanal 100% Sourdough Loaf',
    category: 'bakery-pantry',
    dept: 'Bakery & Staples',
    price: 140,
    originalPrice: 175,
    weight: '450g Loaf',
    rating: 4.8,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    badge: 'Slow Fermented',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: true,
    deal: false,
    inStock: true,
    description: 'Authentic 36-hour slow fermented sourdough bread with a crispy rustic crust and chewy, airy interior crumb.',
    features: ['36-hour wild yeast fermentation', 'Easy to digest', 'No commercial yeast or chemicals'],
    nutrition: '220 kcal per 100g | Low Glycemic Index',
    modelType: 'pod'
  },
  {
    id: 'prod-13',
    name: 'Royal Aged Kohinoor Basmati Rice (5kg)',
    category: 'bakery-pantry',
    dept: 'Bakery & Staples',
    price: 499,
    originalPrice: 650,
    weight: '5 kg Bag',
    rating: 4.9,
    reviewCount: 620,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    badge: '2 Years Aged',
    badgeClass: 'badge-deal',
    organic: false,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Extra-long grain Basmati rice naturally aged for 24 months in Himalayan foothills. Cooks to fluffy non-sticky grains.',
    features: ['Aged 2 years for aroma', 'Extra long slender grains', 'Perfect for biryanis & pilafs'],
    nutrition: '130 kcal per 100g cooked | Gluten-free',
    modelType: 'pod'
  },

  // --- Electronics & Smart Kitchen ---
  {
    id: 'prod-14',
    name: 'Nutri-Pro 900W High-Speed Smoothie Blender',
    category: 'electronics',
    dept: 'Electronics',
    price: 2499,
    originalPrice: 3999,
    weight: '1 Unit (3 Jars + Recipe Book)',
    rating: 4.8,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    badge: '38% OFF',
    badgeClass: 'badge-deal',
    organic: false,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Powerful 900W copper motor with 6-leaf cyclonic stainless steel blades. Pulverizes whole fruits and seeds in 15 seconds.',
    features: ['900W Heavy Duty Motor', 'BPA-free Tritan bullet cups', '2-year replacement warranty'],
    nutrition: 'Energy rating: 5 Star',
    modelType: 'pod'
  },
  {
    id: 'prod-15',
    name: 'Air Fryer Digital Touch 4.5L (Oil-Free)',
    category: 'electronics',
    dept: 'Electronics',
    price: 3899,
    originalPrice: 5999,
    weight: '1 Unit',
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Deal',
    badgeClass: 'badge-deal',
    organic: false,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Rapid 360° air circulation technology crisps snacks with 85% less oil. 8 preset touch cooking modes for fries and chicken.',
    features: ['85% less oil consumption', 'Non-stick dishwasher-safe basket', '8 one-touch cooking presets'],
    nutrition: '1400W Fast Turbo Heating',
    modelType: 'pod'
  },

  // --- Fashion & General Merchandise ---
  {
    id: 'prod-16',
    name: '100% Organic Linen Chef Apron (Adjustable)',
    category: 'fashion',
    dept: 'Fashion',
    price: 599,
    originalPrice: 899,
    weight: 'Forest Green (Unisex)',
    rating: 4.8,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    badge: '100% Organic',
    badgeClass: 'badge-organic',
    organic: true,
    bestseller: false,
    deal: true,
    inStock: true,
    description: 'Handcrafted durable organic linen kitchen apron with deep utility pockets and cross-back straps for ultimate cooking comfort.',
    features: ['Heavyweight organic natural linen', 'Reinforced stitch pockets', 'Machine washable'],
    nutrition: 'Eco-dyed non-toxic inks',
    modelType: 'pod'
  },
  {
    id: 'prod-17',
    name: 'Airtight Glass Pantry Storage Jars Set (4 Pcs)',
    category: 'general-merchandise',
    dept: 'General Store',
    price: 799,
    originalPrice: 1199,
    weight: 'Set of 4 (500ml to 1.8L)',
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    badge: 'Bamboo Lids',
    badgeClass: 'badge-deal',
    organic: false,
    bestseller: true,
    deal: true,
    inStock: true,
    description: 'Borosilicate glass canisters with natural silicone-sealed bamboo lids. Keep pantry staples fresh in style.',
    features: ['Heat resistant borosilicate glass', 'Silicone airtight suction seal', 'Stackable modular design'],
    nutrition: '100% Lead-free glass',
    modelType: 'pod'
  }
];

// ==========================================================================
// 2. RECIPE ENGINE DATABASE
// ==========================================================================
const RECIPE_DATABASE = [
  {
    id: 'rec-1',
    title: 'Avocado Spinach Superfood Bowl',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 mins',
    calories: '340 kcal',
    protein: '14g',
    difficulty: 'Easy',
    cuisine: 'Mediterranean',
    diet: 'High-Protein / Keto',
    description: 'A nutrient-packed energizing bowl with tossed baby spinach, creamy hass avocado slices, heirloom cherry tomatoes, and honey mustard vinaigrette.',
    ingredients: [
      { name: 'Organic Hass Avocado', qty: '1 ripe', inCartOrStock: true },
      { name: 'Baby Spinach', qty: '100g', inCartOrStock: true },
      { name: 'Cherry Tomatoes', qty: '80g halved', inCartOrStock: true },
      { name: 'Cold Pressed Olive Oil', qty: '1 tbsp', inCartOrStock: false, prodId: 'prod-1' }
    ],
    steps: [
      'Rinse fresh baby spinach thoroughly and spin dry.',
      'Cut Hass avocado in half, remove pit, and slice into even crescents.',
      'Halve cherry tomatoes and gently toss in a bowl with baby spinach.',
      'Whisk 1 tbsp cold-pressed olive oil, fresh lemon juice, salt, and cracked black pepper to form creamy dressing.',
      'Drizzle dressing over the greens and top with avocado slices.'
    ],
    chefTips: 'Add a sprinkle of toasted sunflower seeds or hemp hearts for extra crunch and Omega-3s.'
  }
];

// ==========================================================================
// 3. APPLICATION STATE
// ==========================================================================
const AppState = {
  cart: [],
  wishlist: new Set(),
  activeCategory: 'all',
  activeFilter: 'all',
  searchQuery: '',
  sortBy: 'featured',
  deliveryTip: 20,
  appliedCoupon: null,
  deliveryLocation: 'Andheri West, Mumbai 400053',
  selectedAiIngredients: ['Avocado', 'Ripe Tomatoes', 'Baby Spinach'],
  orders: [],
  gravity: 0.0, // 0G by default
  isVortexActive: false,
  audioMuted: false,
  questScore: 0,
  activeQuestIndex: 0
};

// ==========================================================================
// 4. THREE.JS 3D WEBGL ANTIGRAVITY PHYSICS ENGINE
// ==========================================================================
let scene, camera, renderer, raycaster, mouse;
let physicsObjects = [];
let particlesMesh;
let isDraggingObject = false;
let draggedObject = null;
let dragPlane;
let lastMousePos = { x: 0, y: 0 };
let mouseVelocity = { x: 0, y: 0 };

function initThreeJSAntigravity() {
  const canvas = document.getElementById('antigravityCanvas');
  if (!canvas || !window.THREE) return;

  // Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 24;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xa7f3d0, 1.2);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  const blueLight = new THREE.PointLight(0x38bdf8, 1.5, 50);
  blueLight.position.set(-15, -10, 10);
  scene.add(blueLight);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Create Drag Plane
  const planeGeo = new THREE.PlaneGeometry(100, 100);
  const planeMat = new THREE.MeshBasicMaterial({ visible: false });
  dragPlane = new THREE.Mesh(planeGeo, planeMat);
  scene.add(dragPlane);

  // Spawn 3D Floating Bodies
  createFloating3DMeshes();
  createBioParticleField();

  // Event Listeners
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: false });
  window.addEventListener('touchend', onTouchEnd);

  // Animation Loop
  animateThreeJS();
}

// 3D Mesh Procedural Factory
function createFloating3DMeshes() {
  const meshConfigs = [
    { type: 'avocado', color: 0x22543d, scale: 1.3, x: -8, y: 3, z: 0 },
    { type: 'orange', color: 0xf97316, scale: 1.1, x: 8, y: 4, z: -2 },
    { type: 'apple', color: 0xdc2626, scale: 1.2, x: -6, y: -4, z: 1 },
    { type: 'leaf', color: 0x10b981, scale: 1.0, x: 7, y: -3, z: -1 },
    { type: 'pod', color: 0x0284c7, scale: 1.2, x: 0, y: 6, z: -3 },
    { type: 'avocado', color: 0x15803d, scale: 1.1, x: 5, y: 1, z: 2 },
    { type: 'apple', color: 0xef4444, scale: 1.0, x: -4, y: 5, z: -2 },
    { type: 'leaf', color: 0x34d399, scale: 0.9, x: -2, y: -5, z: 0 }
  ];

  meshConfigs.forEach(cfg => {
    let geo;
    if (cfg.type === 'avocado') {
      geo = new THREE.SphereGeometry(1, 24, 24);
      // deform into avocado ellipsoid
      geo.scale(0.85, 1.25, 0.85);
    } else if (cfg.type === 'orange') {
      geo = new THREE.DodecahedronGeometry(1, 2);
    } else if (cfg.type === 'apple') {
      geo = new THREE.SphereGeometry(1, 20, 20);
      geo.scale(1.05, 0.95, 1.05);
    } else if (cfg.type === 'leaf') {
      geo = new THREE.ConeGeometry(1, 2, 4);
      geo.scale(0.8, 0.1, 1.2);
    } else {
      geo = new THREE.IcosahedronGeometry(1, 1);
    }

    const mat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      roughness: 0.35,
      metalness: 0.25,
      wireframe: false
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    mesh.scale.setScalar(cfg.scale);

    // Attach Physics Properties
    mesh.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.02
      ),
      rotVelocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      mass: 1.0,
      radius: cfg.scale
    };

    scene.add(mesh);
    physicsObjects.push(mesh);
  });
}

function createBioParticleField() {
  const count = 180;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const c1 = new THREE.Color(0x34d399);
  const c2 = new THREE.Color(0x38bdf8);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const mixed = c1.clone().lerp(c2, Math.random());
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  particlesMesh = new THREE.Points(geo, mat);
  scene.add(particlesMesh);
}

// Three.js Render & Physics Loop
function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);

  const boundX = 14;
  const boundY = 9;

  // Particle drift
  if (particlesMesh) {
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
  }

  // Update physics bodies
  physicsObjects.forEach(obj => {
    if (obj !== draggedObject) {
      // Apply Gravity force
      obj.userData.velocity.y -= AppState.gravity * 0.006;

      // Vortex attractor force towards center or mouse
      if (AppState.isVortexActive) {
        const targetX = (mouse.x * boundX) * 0.5;
        const targetY = (mouse.y * boundY) * 0.5;
        const dx = targetX - obj.position.x;
        const dy = targetY - obj.position.y;
        obj.userData.velocity.x += dx * 0.0025;
        obj.userData.velocity.y += dy * 0.0025;
      }

      // Apply drag / friction in air
      obj.userData.velocity.multiplyScalar(0.994);

      // Integrate Position
      obj.position.add(obj.userData.velocity);

      // Integrate Rotation
      obj.rotation.x += obj.userData.rotVelocity.x;
      obj.rotation.y += obj.userData.rotVelocity.y;
      obj.rotation.z += obj.userData.rotVelocity.z;

      // Frustum Boundary Collisions (Soft bounce)
      if (obj.position.x > boundX) {
        obj.position.x = boundX;
        obj.userData.velocity.x *= -0.75;
      } else if (obj.position.x < -boundX) {
        obj.position.x = -boundX;
        obj.userData.velocity.x *= -0.75;
      }

      if (obj.position.y > boundY) {
        obj.position.y = boundY;
        obj.userData.velocity.y *= -0.75;
      } else if (obj.position.y < -boundY) {
        obj.position.y = -boundY;
        obj.userData.velocity.y *= -0.75;
      }
    }
  });

  renderer.render(scene, camera);
}

// Mouse / Raycasting Event Handlers
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  mouseVelocity.x = event.clientX - lastMousePos.x;
  mouseVelocity.y = event.clientY - lastMousePos.y;
  lastMousePos.x = event.clientX;
  lastMousePos.y = event.clientY;

  if (isDraggingObject && draggedObject) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(dragPlane);
    if (intersects.length > 0) {
      draggedObject.position.copy(intersects[0].point);
    }
  }
}

function onMouseDown(event) {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON' || event.target.closest('.hud-antigravity-panel') || event.target.closest('.modal-card')) {
    return;
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(physicsObjects);

  if (intersects.length > 0) {
    isDraggingObject = true;
    draggedObject = intersects[0].object;
    dragPlane.position.copy(draggedObject.position);
    dragPlane.lookAt(camera.position);

    playSynthSound('whoosh');
  }
}

function onMouseUp() {
  if (isDraggingObject && draggedObject) {
    // Release with fling inertia
    draggedObject.userData.velocity.x = mouseVelocity.x * 0.004;
    draggedObject.userData.velocity.y = -mouseVelocity.y * 0.004;
    draggedObject.userData.rotVelocity.x = (Math.random() - 0.5) * 0.08;
    draggedObject.userData.rotVelocity.y = (Math.random() - 0.5) * 0.08;

    isDraggingObject = false;
    draggedObject = null;

    playSynthSound('pop');
  }
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    onMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }
}

function onTouchStart(e) {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    mouse.x = (t.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(t.clientY / window.innerHeight) * 2 + 1;
    onMouseDown(e);
  }
}

function onTouchEnd() {
  onMouseUp();
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// HUD Physics Controls
function updateGravityField(val) {
  AppState.gravity = val;
  const disp = document.getElementById('gravityValueDisplay');
  if (disp) {
    if (val === 0) disp.innerText = '0.0 G (Zero-G)';
    else if (val < 0) disp.innerText = `${val.toFixed(1)} G (Levitation)`;
    else disp.innerText = `${val.toFixed(1)} G (Gravity)`;
  }
  playSynthSound('beep');
}

function updateGravityPreset(val) {
  const slider = document.getElementById('gravitySlider');
  if (slider) slider.value = val;
  updateGravityField(val);
}

function toggleVortexAttractor() {
  AppState.isVortexActive = !AppState.isVortexActive;
  const btn = document.getElementById('vortexBtn');
  if (btn) btn.classList.toggle('active', AppState.isVortexActive);

  showToast(AppState.isVortexActive ? '🌀 Gravitational Vortex Enabled' : 'Gravitational Vortex Disabled', 'info', 'disc');
  playSynthSound('scan');
}

function triggerGravityExplosion() {
  physicsObjects.forEach(obj => {
    obj.userData.velocity.x = (Math.random() - 0.5) * 0.35;
    obj.userData.velocity.y = (Math.random() - 0.5) * 0.35;
    obj.userData.rotVelocity.x = (Math.random() - 0.5) * 0.15;
    obj.userData.rotVelocity.y = (Math.random() - 0.5) * 0.15;
  });

  playSynthSound('blast');
  showToast('💥 Antigravity Pulse Discharged!', 'success', 'sparkles');
}

function toggleHudPanel() {
  const p = document.getElementById('hudPanel');
  if (p) p.classList.toggle('collapsed');
}

function handleCardParallax(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const rotateX = (-y / rect.height) * 12;
  const rotateY = (x / rect.width) * 12;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetCardParallax(card) {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

// ==========================================================================
// 5. SYNTHESIZED WEB AUDIO API SOUND EFFECTS
// ==========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthSound(type) {
  if (AppState.audioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'whoosh') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'blast') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'victory') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch (e) {
    // Audio context error fallback
  }
}

function toggleSpatialAudio() {
  AppState.audioMuted = !AppState.audioMuted;
  const icon = document.getElementById('audioIcon');
  if (icon) {
    if (AppState.audioMuted) {
      icon.setAttribute('data-lucide', 'volume-x');
      showToast('Audio Muted', 'info', 'volume-x');
    } else {
      icon.setAttribute('data-lucide', 'volume-2');
      showToast('Audio FX Active', 'success', 'volume-2');
      playSynthSound('beep');
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

// ==========================================================================
// 6. LEARNABLE 3D SCIENCE ACADEMY & LAB MODULES
// ==========================================================================
function scrollToLab() {
  const lab = document.getElementById('science-academy');
  if (lab) lab.scrollIntoView({ behavior: 'smooth' });
}

function switchAcademyModule(moduleKey) {
  // Update Tab buttons
  document.querySelectorAll('.academy-tab').forEach((tab, i) => {
    tab.classList.remove('active');
  });
  if (event && event.currentTarget) event.currentTarget.classList.add('active');

  // Switch Module Views
  const views = ['botany', 'nutrition', 'coldchain', 'quest'];
  views.forEach(v => {
    const el = document.getElementById(`module-${v}`);
    if (el) el.style.display = v === moduleKey ? 'block' : 'none';
  });

  playSynthSound('beep');
}

function showNodeDetail(nodeType) {
  const title = document.getElementById('botanyNodeTitle');
  const desc = document.getElementById('botanyNodeDesc');
  const impact = document.getElementById('botanyCulinaryImpact');

  if (nodeType === 'chlorophyll') {
    if (title) title.innerText = 'Photosynthesis & Chlorophyll Absorption';
    if (desc) desc.innerText = 'Chlorophyll-a molecules absorb photons at 430nm & 660nm wavelengths, synthesizing clean glucose and locking plant turgidity with zero pesticide run-off.';
    if (impact) impact.innerText = 'Preserves vegetable leaf crunch for 7+ days and boosts dietary magnesium by 35%.';
  } else if (nodeType === 'osmosis') {
    if (title) title.innerText = 'Hydroponic Mineral Root Osmosis';
    if (desc) desc.innerText = 'Plant root hairs absorb potassium, calcium, and chelated iron ions directly from dissolved oxygen-saturated waterbeds without soil pathogens.';
    if (impact) impact.innerText = '100% grit-free spinach and lettuce that requires zero harsh chemical sanitizers.';
  } else if (nodeType === 'monounsaturated') {
    if (title) title.innerText = 'Oleic Acid Lipid Esterification';
    if (desc) desc.innerText = 'Avocados store 71% of their energy as monounsaturated Oleic Acid (18:1 cis-9), which stabilizes cell membranes and enhances fat-soluble vitamin absorption.';
    if (impact) impact.innerText = 'Boosts carotenoid bioavailability by 4.3x when added to salads.';
  }

  playSynthSound('pop');
}

function showNutritionNode(molType) {
  const title = document.getElementById('nutriTitle');
  const desc = document.getElementById('nutriDesc');

  if (molType === 'proline') {
    if (title) title.innerText = 'Proline-67 Amino Acid Bond (A2 Milk)';
    if (desc) desc.innerText = 'Desi Gir cows produce beta-casein with Proline at position 67, preventing gastrointestinal release of inflammatory BCM-7 opioid peptides.';
  } else if (molType === 'omega3') {
    if (title) title.innerText = 'Omega-3 EPA & DHA Lipids (Wild Salmon)';
    if (desc) desc.innerText = 'Long-chain polyunsaturated fatty acids reduce systemic inflammation and support cardiovascular neurotransmission.';
  } else if (molType === 'lycopene') {
    if (title) title.innerText = 'Lycopene C40H56 Carotenoid (Cherry Tomatoes)';
    if (desc) desc.innerText = 'A potent acyclic tetraterpene antioxidant that protects cell DNA from oxidative ultraviolet stress.';
  }

  playSynthSound('pop');
}

function updateColdChainSim(val) {
  const temp = parseFloat(val);
  const disp = document.getElementById('simTempDisplay');
  const status = document.getElementById('simTempStatus');

  if (disp) disp.innerText = `${temp.toFixed(1)}°C`;
  if (status) {
    if (temp <= 5) {
      status.style.color = '#34d399';
      status.innerText = '✅ Optimal 4°C: Enzymatic Latency Maintained (Max Freshness)';
    } else if (temp <= 12) {
      status.style.color = '#f59e0b';
      status.innerText = '⚠️ Sub-optimal: Respiration rate accelerated by 40%';
    } else {
      status.style.color = '#ef4444';
      status.innerText = '❌ Warning: Cell turgidity loss & vitamin degradation';
    }
  }
}

function rotate3DLabObject(delta) {
  physicsObjects.forEach(obj => {
    obj.rotation.y += delta;
  });
  playSynthSound('whoosh');
}

function toggleLabWireframe() {
  physicsObjects.forEach(obj => {
    if (obj.material) obj.material.wireframe = !obj.material.wireframe;
  });
  playSynthSound('beep');
}

// Learn & Earn Quests
const QUEST_DATA = [
  {
    q: 'Why is A2 Cow Milk easier to digest than ordinary A1 milk?',
    options: [
      'A) It contains Proline at amino position 67, preventing BCM-7 inflammation',
      'B) It contains 50% more synthetic sugar',
      'C) It is boiled with artificial thickeners'
    ],
    correct: 0
  },
  {
    q: 'What is the optimal cold-chain storage temperature to prevent produce spoilage in transit?',
    options: [
      'A) 25°C (Warm room temperature)',
      'B) 4°C (Controlled cellular latency window)',
      'C) -50°C (Deep cryogenic freezing)'
    ],
    correct: 1
  },
  {
    q: 'How does hydroponic farming achieve 100% pesticide-free produce?',
    options: [
      'A) By growing in sterile closed mineral waterbeds without soil pathogens',
      'B) By spraying artificial wax on leaves',
      'C) By harvesting before roots grow'
    ],
    correct: 0
  }
];

function submitQuestAnswer(optionIndex) {
  const current = QUEST_DATA[AppState.activeQuestIndex];
  const feedback = document.getElementById('questFeedback');
  if (!current || !feedback) return;

  feedback.style.display = 'block';

  if (optionIndex === current.correct) {
    AppState.questScore++;
    feedback.className = 'quest-feedback correct';
    feedback.innerText = '✅ Correct! Brilliant scientific insight.';
    playSynthSound('victory');

    setTimeout(() => {
      AppState.activeQuestIndex++;
      const scoreDisp = document.getElementById('questScoreDisplay');
      if (scoreDisp) scoreDisp.innerText = `${AppState.questScore}/3`;

      if (AppState.activeQuestIndex < QUEST_DATA.length) {
        renderCurrentQuest();
      } else {
        // Quest Complete!
        document.getElementById('activeQuestCard').style.display = 'none';
        document.getElementById('questRewardCard').style.display = 'block';
        playSynthSound('victory');
      }
    }, 1000);
  } else {
    feedback.className = 'quest-feedback wrong';
    feedback.innerText = '❌ Incorrect. Hint: Re-check the 3D Molecular or Cold-Chain tabs!';
    playSynthSound('beep');
  }
}

function renderCurrentQuest() {
  const current = QUEST_DATA[AppState.activeQuestIndex];
  if (!current) return;

  const qText = document.getElementById('questQuestionText');
  const optContainer = document.getElementById('questOptionsContainer');
  const feedback = document.getElementById('questFeedback');

  if (qText) qText.innerText = current.q;
  if (feedback) feedback.style.display = 'none';

  if (optContainer) {
    optContainer.innerHTML = current.options.map((opt, i) => `
      <button class="quest-option-btn" onclick="submitQuestAnswer(${i})">${opt}</button>
    `).join('');
  }
}

function copyAndApplyReward(code) {
  AppState.appliedCoupon = { code: code, rate: 0.30 };
  const input = document.getElementById('couponInput');
  if (input) input.value = code;
  applyCouponCode();
  toggleCartDrawer();
  showToast(`🎉 30% OFF coupon ${code} applied to your cart!`, 'success', 'award');
}

// ==========================================
// 7. INITIALIZATION & STORAGE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadStoredData();
  renderDepartmentCounts();
  renderProductCatalog();
  updateCartDrawerUI();
  updateWishlistUI();
  startFlashDealsTimer();
  populateModalQuickPicks();
  updateAiSelectedChipsUI();

  // Initialize Three.js 3D Engine
  setTimeout(() => {
    initThreeJSAntigravity();
  }, 100);

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  updateNextSlotTime();
});

function loadStoredData() {
  try {
    const savedCart = localStorage.getItem('aroman_cart');
    if (savedCart) AppState.cart = JSON.parse(savedCart);

    const savedWish = localStorage.getItem('aroman_wishlist');
    if (savedWish) AppState.wishlist = new Set(JSON.parse(savedWish));

    const savedOrders = localStorage.getItem('aroman_orders');
    if (savedOrders) AppState.orders = JSON.parse(savedOrders);
  } catch (e) {
    console.warn('Storage parsing failed', e);
  }
}

function saveCartData() {
  localStorage.setItem('aroman_cart', JSON.stringify(AppState.cart));
}

function saveWishlistData() {
  localStorage.setItem('aroman_wishlist', JSON.stringify(Array.from(AppState.wishlist)));
}

function saveOrdersData() {
  localStorage.setItem('aroman_orders', JSON.stringify(AppState.orders));
}

// ==========================================
// 8. PRODUCT CATALOG RENDERING & FILTERING
// ==========================================
function renderDepartmentCounts() {
  document.getElementById('countAll').innerText = PRODUCTS_DATA.length;
  document.getElementById('countVeg').innerText = PRODUCTS_DATA.filter(p => p.category === 'fruits-veg').length;
  document.getElementById('countDairy').innerText = PRODUCTS_DATA.filter(p => p.category === 'dairy-eggs').length;
  document.getElementById('countMeat').innerText = PRODUCTS_DATA.filter(p => p.category === 'meat-seafood').length;
  document.getElementById('countPantry').innerText = PRODUCTS_DATA.filter(p => p.category === 'bakery-pantry').length;
  document.getElementById('countElec').innerText = PRODUCTS_DATA.filter(p => p.category === 'electronics').length;
  document.getElementById('countFashion').innerText = PRODUCTS_DATA.filter(p => p.category === 'fashion').length;
  document.getElementById('countGen').innerText = PRODUCTS_DATA.filter(p => p.category === 'general-merchandise').length;
}

function renderProductCatalog() {
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  if (!grid) return;

  let filtered = PRODUCTS_DATA.filter(item => {
    if (AppState.activeCategory === 'fresh-groceries') {
      if (!['fruits-veg', 'dairy-eggs', 'meat-seafood', 'bakery-pantry'].includes(item.category)) return false;
    } else if (AppState.activeCategory === 'deals') {
      if (!item.deal) return false;
    } else if (AppState.activeCategory !== 'all') {
      if (item.category !== AppState.activeCategory) return false;
    }

    if (AppState.activeFilter === 'organic' && !item.organic) return false;
    if (AppState.activeFilter === 'bestseller' && !item.bestseller) return false;
    if (AppState.activeFilter === 'deals' && !item.deal) return false;

    if (AppState.searchQuery.trim()) {
      const q = AppState.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDept = item.dept.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchDept && !matchDesc) return false;
    }

    return true;
  });

  if (AppState.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (AppState.sortBy === 'discount') {
    filtered.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price));
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  grid.innerHTML = filtered.map(item => {
    const cartItem = AppState.cart.find(c => c.id === item.id);
    const inCartQty = cartItem ? cartItem.qty : 0;
    const isWishlisted = AppState.wishlist.has(item.id);

    return `
      <div class="product-card 3d-perspective-card" id="card-${item.id}" onmousemove="handleCardParallax(event, this)" onmouseleave="resetCardParallax(this)">
        <div class="card-top">
          <img src="${item.image}" alt="${item.name}" class="product-thumb" loading="lazy" />
          
          <div class="card-badges">
            ${item.badge ? `<span class="badge ${item.badgeClass || 'badge-organic'}">${item.badge}</span>` : ''}
          </div>

          <button class="card-fav-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${item.id}', event)" title="Add to Wishlist">
            <i data-lucide="heart" style="${isWishlisted ? 'fill: currentColor;' : ''}"></i>
          </button>

          <button class="card-quickview-btn" onclick="openQuickView('${item.id}')">
            🔍 3D Hologram
          </button>
        </div>

        <div class="card-content">
          <span class="product-dept-tag">${item.dept}</span>
          <h3 class="product-title" onclick="openQuickView('${item.id}')" style="cursor: pointer;">${item.name}</h3>
          <span class="product-weight">${item.weight}</span>

          <div class="product-rating-row">
            <div class="stars-rating">
              <i data-lucide="star"></i>
              <strong>${item.rating.toFixed(1)}</strong>
            </div>
            <span class="rating-count">(${item.reviewCount})</span>
          </div>

          <div class="card-bottom-row">
            <div class="price-box">
              <span class="current-price">₹${item.price}</span>
              ${item.originalPrice > item.price ? `<span class="original-price">₹${item.originalPrice}</span>` : ''}
            </div>

            <div class="card-action-wrap" id="actionWrap-${item.id}">
              ${inCartQty > 0 ? `
                <div class="qty-stepper">
                  <button class="qty-btn" onclick="updateItemQty('${item.id}', -1, event)">−</button>
                  <span class="qty-display">${inCartQty}</span>
                  <button class="qty-btn" onclick="updateItemQty('${item.id}', 1, event)">+</button>
                </div>
              ` : `
                <button class="add-cart-btn" onclick="addToCart('${item.id}', event)">
                  <i data-lucide="plus"></i> Add
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setCategory(catKey) {
  AppState.activeCategory = catKey;

  document.querySelectorAll('#categoryNavLinks li').forEach(li => {
    if (li.getAttribute('data-cat') === catKey) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  document.querySelectorAll('.dept-tab').forEach(tab => {
    if (tab.getAttribute('data-dept') === catKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  const heading = document.getElementById('sectionHeading');
  const tag = document.getElementById('activeCategoryTag');
  if (catKey === 'all') {
    if (heading) heading.innerText = 'Explore Our 3D Fresh Catalog';
    if (tag) tag.innerText = 'All Departments';
  } else if (catKey === 'fresh-groceries') {
    if (heading) heading.innerText = 'Farm-Fresh Groceries & Produce';
    if (tag) tag.innerText = 'Fresh Groceries';
  } else if (catKey === 'deals') {
    if (heading) heading.innerText = 'Daily Deals & Flash Discounts';
    if (tag) tag.innerText = 'Special Offers';
  } else {
    const formatted = catKey.replace('-', ' ').toUpperCase();
    if (heading) heading.innerText = `${formatted} Catalog`;
    if (tag) tag.innerText = formatted;
  }

  const deptWrap = document.querySelector('.category-dropdown-wrap');
  if (deptWrap) deptWrap.classList.remove('open');

  renderProductCatalog();
  playSynthSound('beep');
}

function setFilter(filterKey) {
  AppState.activeFilter = filterKey;
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.remove('active');
  });
  if (event && event.target) event.target.classList.add('active');
  renderProductCatalog();
  playSynthSound('beep');
}

function handleSort(sortVal) {
  AppState.sortBy = sortVal;
  renderProductCatalog();
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.activeFilter = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  setCategory('all');
}

function scrollToProducts(category) {
  if (category) setCategory(category);
  const el = document.getElementById('products');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleDepartmentMenu() {
  const wrap = document.querySelector('.category-dropdown-wrap');
  if (wrap) wrap.classList.toggle('open');
}

// ==========================================
// 9. SEARCH SYSTEM
// ==========================================
function handleSearch(val) {
  AppState.searchQuery = val;
  const clearBtn = document.getElementById('searchClearBtn');
  const dropdown = document.getElementById('searchDropdown');

  if (val.trim()) {
    if (clearBtn) clearBtn.style.display = 'flex';
    showSearchDropdown();
  } else {
    if (clearBtn) clearBtn.style.display = 'none';
    if (dropdown) dropdown.classList.remove('active');
  }

  renderProductCatalog();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  handleSearch('');
}

function executeSearch() {
  const input = document.getElementById('searchInput');
  if (input) handleSearch(input.value);
  scrollToProducts();
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown) dropdown.classList.remove('active');
}

function showSearchDropdown() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');
  if (!input || !dropdown) return;

  const val = input.value.trim().toLowerCase();
  if (!val) {
    dropdown.classList.remove('active');
    return;
  }

  const matches = PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(val) || 
    p.dept.toLowerCase().includes(val)
  ).slice(0, 5);

  if (matches.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.cssText = 'padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;';
    emptyDiv.appendChild(document.createTextNode('No items found for "'));
    const strongEl = document.createElement('strong');
    strongEl.textContent = val;
    emptyDiv.appendChild(strongEl);
    emptyDiv.appendChild(document.createTextNode('"'));
    dropdown.innerHTML = '';
    dropdown.appendChild(emptyDiv);
  } else {
    dropdown.innerHTML = matches.map(item => `
      <div class="search-suggestion-item" onclick="selectSearchItem('${item.id}')">
        <img src="${item.image}" alt="${item.name}" class="search-thumb" />
        <div class="search-item-info">
          <div class="search-item-title">${item.name}</div>
          <div class="search-item-meta">${item.dept} • ${item.weight}</div>
        </div>
        <div class="search-item-price">₹${item.price}</div>
      </div>
    `).join('');
  }

  dropdown.classList.add('active');
}

function selectSearchItem(id) {
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown) dropdown.classList.remove('active');
  openQuickView(id);
}

document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.search-wrapper');
  const dropdown = document.getElementById('searchDropdown');
  if (wrapper && !wrapper.contains(e.target) && dropdown) {
    dropdown.classList.remove('active');
  }

  const deptWrap = document.querySelector('.category-dropdown-wrap');
  if (deptWrap && !deptWrap.contains(e.target)) {
    deptWrap.classList.remove('open');
  }
});

// ==========================================
// 10. SHOPPING CART SYSTEM
// ==========================================
function addToCart(productId, event) {
  if (event) event.stopPropagation();

  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({ id: productId, qty: 1 });
  }

  saveCartData();
  updateCartDrawerUI();
  renderProductCatalog();

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  showToast(`Added ${product ? product.name : 'item'} to cart!`, 'success', 'shopping-bag');
  playSynthSound('pop');
}

function updateItemQty(productId, delta, event) {
  if (event) event.stopPropagation();

  const index = AppState.cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    AppState.cart[index].qty += delta;
    if (AppState.cart[index].qty <= 0) {
      AppState.cart.splice(index, 1);
    }
  }

  saveCartData();
  updateCartDrawerUI();
  renderProductCatalog();
  playSynthSound('pop');
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(item => item.id !== productId);
  saveCartData();
  updateCartDrawerUI();
  renderProductCatalog();
  showToast('Item removed from cart', 'info', 'trash-2');
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    playSynthSound('whoosh');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
}

function updateCartDrawerUI() {
  const totalItemsCount = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  const countEl = document.getElementById('cartCount');
  const mobileCountEl = document.getElementById('mobileCartCount');
  const badgeEl = document.getElementById('cartBadgeCount');
  if (countEl) countEl.innerText = totalItemsCount;
  if (mobileCountEl) mobileCountEl.innerText = totalItemsCount;
  if (badgeEl) badgeEl.innerText = `${totalItemsCount} items`;

  let subtotal = 0;
  AppState.cart.forEach(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (prod) subtotal += prod.price * cartItem.qty;
  });

  let discountAmount = 0;
  if (AppState.appliedCoupon) {
    discountAmount = Math.round(subtotal * AppState.appliedCoupon.rate);
  }

  const freeThreshold = 499;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryFee = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 40);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + (subtotal > 0 ? AppState.deliveryTip : 0));

  const headerTotal = document.getElementById('headerCartTotal');
  const billSub = document.getElementById('billSubtotal');
  const billDisc = document.getElementById('billDiscount');
  const billDiscRow = document.getElementById('billDiscountRow');
  const billDel = document.getElementById('billDelivery');
  const billGrand = document.getElementById('billGrandTotal');
  const chkGrand = document.getElementById('checkoutGrandTotal');

  if (headerTotal) headerTotal.innerText = `₹${subtotal.toFixed(2)}`;
  if (billSub) billSub.innerText = `₹${subtotal.toFixed(2)}`;
  if (billDel) billDel.innerText = deliveryFee === 0 ? (subtotal === 0 ? '₹0.00' : 'FREE') : `₹${deliveryFee}.00`;
  if (billGrand) billGrand.innerText = `₹${grandTotal.toFixed(2)}`;
  if (chkGrand) chkGrand.innerText = `₹${grandTotal.toFixed(2)}`;

  if (AppState.appliedCoupon && billDiscRow && billDisc) {
    billDiscRow.style.display = 'flex';
    document.getElementById('discountName').innerText = AppState.appliedCoupon.code;
    billDisc.innerText = `-₹${discountAmount.toFixed(2)}`;
  } else if (billDiscRow) {
    billDiscRow.style.display = 'none';
  }

  const freeText = document.getElementById('freeDeliveryText');
  const freeBar = document.getElementById('freeDeliveryProgress');
  if (freeText && freeBar) {
    if (subtotal === 0) {
      freeText.innerHTML = `Add <strong>₹${freeThreshold}.00</strong> more for <strong>FREE Express Delivery!</strong>`;
      freeBar.style.width = '0%';
    } else if (isFreeDelivery) {
      freeText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked <strong>FREE 2-Hour Express Delivery!</strong>`;
      freeBar.style.width = '100%';
    } else {
      const remaining = freeThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      freeText.innerHTML = `Add <strong>₹${remaining.toFixed(2)}</strong> more for <strong>FREE Delivery!</strong>`;
      freeBar.style.width = `${pct}%`;
    }
  }

  const list = document.getElementById('cartItemsList');
  if (!list) return;

  if (AppState.cart.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i data-lucide="shopping-bag" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--text-light);"></i>
        <h4>Your cart is empty</h4>
        <p style="font-size: 0.85rem; margin-top: 4px;">Explore our 3D catalog and add fresh organic items!</p>
      </div>
    `;
  } else {
    list.innerHTML = AppState.cart.map(cartItem => {
      const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
      if (!prod) return '';

      return `
        <div class="cart-item-row">
          <img src="${prod.image}" alt="${prod.name}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${prod.name}</h4>
            <span class="cart-item-unit">${prod.weight}</span>
            <div class="cart-item-price">₹${prod.price} × ${cartItem.qty} = ₹${prod.price * cartItem.qty}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="updateItemQty('${prod.id}', -1)">−</button>
              <span class="qty-display">${cartItem.qty}</span>
              <button class="qty-btn" onclick="updateItemQty('${prod.id}', 1)">+</button>
            </div>
            <span class="cart-item-remove" onclick="removeFromCart('${prod.id}')">Remove</span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function copyCoupon(code) {
  const input = document.getElementById('couponInput');
  if (input) input.value = code;
  applyCouponCode();
  toggleCartDrawer();
}

function applyCouponCode() {
  const input = document.getElementById('couponInput');
  const feedback = document.getElementById('couponFeedback');
  if (!input || !feedback) return;

  const code = input.value.trim().toUpperCase();
  feedback.style.display = 'block';

  if (code === 'ANTIGRAV30' || code === 'FARM30') {
    AppState.appliedCoupon = { code: code, rate: 0.30 };
    feedback.className = 'coupon-feedback success';
    feedback.innerText = `✅ Code ${code} applied: 30% discount unlocked!`;
    showToast('Applied 30% OFF coupon!', 'success', 'award');
    playSynthSound('victory');
  } else if (code === 'FRESH20') {
    AppState.appliedCoupon = { code: 'FRESH20', rate: 0.20 };
    feedback.className = 'coupon-feedback success';
    feedback.innerText = '✅ Code FRESH20 applied: 20% discount unlocked!';
    showToast('Applied 20% OFF coupon!', 'success', 'tag');
    playSynthSound('victory');
  } else {
    AppState.appliedCoupon = null;
    feedback.className = 'coupon-feedback error';
    feedback.innerText = '❌ Invalid coupon code. Try FRESH20 or ANTIGRAV30';
  }

  updateCartDrawerUI();
}

function setDeliveryTip(amount) {
  AppState.deliveryTip = amount;
  document.querySelectorAll('.tip-btn').forEach(btn => {
    if (btn.innerText === `₹${amount}`) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  updateCartDrawerUI();
}

// ==========================================
// 11. WISHLIST SYSTEM
// ==========================================
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  if (AppState.wishlist.has(productId)) {
    AppState.wishlist.delete(productId);
    showToast('Removed from wishlist', 'info', 'heart-off');
  } else {
    AppState.wishlist.add(productId);
    showToast('Saved to wishlist!', 'success', 'heart');
  }

  saveWishlistData();
  updateWishlistUI();
  renderProductCatalog();
  playSynthSound('beep');
}

function updateWishlistUI() {
  const count = AppState.wishlist.size;
  const countEl = document.getElementById('wishlistCount');
  const badgeEl = document.getElementById('wishlistBadgeCount');
  if (countEl) countEl.innerText = count;
  if (badgeEl) badgeEl.innerText = `${count} items`;

  const list = document.getElementById('wishlistItemsList');
  if (!list) return;

  if (count === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i data-lucide="heart" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--text-light);"></i>
        <h4>Your wishlist is empty</h4>
        <p style="font-size: 0.85rem; margin-top: 4px;">Tap the heart icon on any product to save it!</p>
      </div>
    `;
  } else {
    list.innerHTML = Array.from(AppState.wishlist).map(id => {
      const prod = PRODUCTS_DATA.find(p => p.id === id);
      if (!prod) return '';

      return `
        <div class="cart-item-row">
          <img src="${prod.image}" alt="${prod.name}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${prod.name}</h4>
            <span class="cart-item-unit">${prod.weight}</span>
            <div class="cart-item-price">₹${prod.price}</div>
          </div>
          <div class="cart-item-actions">
            <button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}');">
              + Add to Cart
            </button>
            <span class="cart-item-remove" onclick="toggleWishlist('${prod.id}')">Remove</span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    playSynthSound('whoosh');
  }
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('wishlistOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
}

// ==========================================
// 12. AI RECIPE GENERATOR (GEMINI POWERED)
// ==========================================
function toggleIngredientChip(chipElement, name) {
  chipElement.classList.toggle('selected');
  if (chipElement.classList.contains('selected')) {
    if (!AppState.selectedAiIngredients.includes(name)) {
      AppState.selectedAiIngredients.push(name);
    }
  } else {
    AppState.selectedAiIngredients = AppState.selectedAiIngredients.filter(i => i !== name);
  }
  updateAiSelectedChipsUI();
  playSynthSound('beep');
}

function addCustomIngredient() {
  const input = document.getElementById('customIngredientInput');
  if (!input) return;
  const val = input.value.trim();
  if (val && !AppState.selectedAiIngredients.includes(val)) {
    AppState.selectedAiIngredients.push(val);
    input.value = '';
    updateAiSelectedChipsUI();
  }
}

function removeSelectedAiIngredient(name) {
  AppState.selectedAiIngredients = AppState.selectedAiIngredients.filter(i => i !== name);
  updateAiSelectedChipsUI();
}

function updateAiSelectedChipsUI() {
  const box = document.getElementById('selectedIngredientsBox');
  if (!box) return;

  if (AppState.selectedAiIngredients.length === 0) {
    box.innerHTML = '<span class="empty-hint">No ingredients selected yet. Click pills below or add your own!</span>';
  } else {
    box.innerHTML = AppState.selectedAiIngredients.map(name => `
      <span class="selected-chip">
        ${name} <span class="remove-tag" onclick="removeSelectedAiIngredient('${name}')">×</span>
      </span>
    `).join('');
  }
}

function populateModalQuickPicks() {
  const container = document.getElementById('modalQuickPicks');
  if (!container) return;

  const quickItems = ['Avocado', 'Ripe Tomatoes', 'Baby Spinach', 'Farm Fresh Eggs', 'Paneer', 'Chicken Breast', 'Broccoli', 'Rice', 'Olive Oil'];
  container.innerHTML = quickItems.map(item => `
    <button class="chip" onclick="toggleIngredientChip(this, '${item}')">${item}</button>
  `).join('');
}

function useCartIngredientsForAi() {
  if (AppState.cart.length === 0) {
    showToast('Your cart is empty! Add groceries first or pick ingredients below.', 'warning', 'alert-circle');
    openModal('aiRecipeModal');
    return;
  }

  AppState.cart.forEach(cartItem => {
    const prod = PRODUCTS_DATA.find(p => p.id === cartItem.id);
    if (prod && !AppState.selectedAiIngredients.includes(prod.name)) {
      AppState.selectedAiIngredients.push(prod.name);
    }
  });

  updateAiSelectedChipsUI();
  openModal('aiRecipeModal');
  showToast('Loaded items from cart into AI Chef!', 'success', 'sparkles');
}

function generateAiRecipes() {
  openModal('aiRecipeModal');
  runAiRecipeGeneration();
}

function runAiRecipeGeneration() {
  const loading = document.getElementById('aiLoadingState');
  const list = document.getElementById('aiRecipesOutputList');
  const statusPill = document.getElementById('aiStatusPill');

  if (loading) loading.style.display = 'block';
  if (list) list.innerHTML = '';
  if (statusPill) {
    statusPill.innerText = 'Gemini AI Generating...';
    statusPill.style.background = '#dbeafe';
  }

  playSynthSound('scan');

  setTimeout(() => {
    if (loading) loading.style.display = 'none';
    if (statusPill) {
      statusPill.innerText = '3 Recipes Ready';
      statusPill.style.background = '#dcfce7';
      statusPill.style.color = '#15803d';
    }

    if (list) {
      list.innerHTML = RECIPE_DATABASE.map((rec, idx) => `
        <div class="generated-recipe-item">
          <div style="display: flex; gap: 14px;">
            <img src="${rec.image}" alt="${rec.title}" style="width: 80px; height: 80px; border-radius: var(--radius-md); object-fit: cover;" />
            <div style="flex: 1;">
              <h4 class="gen-recipe-title">${rec.title}</h4>
              <div class="gen-recipe-meta">
                <span><i data-lucide="clock"></i> ${rec.prepTime}</span>
                <span><i data-lucide="flame"></i> ${rec.calories}</span>
                <span><i data-lucide="activity"></i> ${rec.protein}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted);">${rec.description}</p>
            </div>
          </div>
          <div class="gen-recipe-actions">
            <button class="btn btn-primary btn-sm" onclick="openRecipeDetailModal(${idx})">
              <i data-lucide="book-open"></i> View Recipe Steps
            </button>
            <button class="btn btn-outline-light btn-sm" onclick="addMissingRecipeIngredients(${idx})">
              <i data-lucide="shopping-bag"></i> Add Missing Items
            </button>
          </div>
        </div>
      `).join('');

      if (window.lucide) window.lucide.createIcons();
    }
  }, 1200);
}

function openRecipeDetailModal(recipeIndex) {
  const rec = RECIPE_DATABASE[recipeIndex];
  if (!rec) return;

  const titleEl = document.getElementById('fullRecipeModalTitle');
  const bodyEl = document.getElementById('fullRecipeModalBody');

  if (titleEl) titleEl.innerText = rec.title;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="margin-bottom: 20px;">
        <img src="${rec.image}" alt="${rec.title}" style="width: 100%; height: 240px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 16px;" />
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
          <span class="meta-pill"><i data-lucide="clock"></i> ${rec.prepTime}</span>
          <span class="meta-pill"><i data-lucide="flame"></i> ${rec.calories}</span>
          <span class="meta-pill"><i data-lucide="activity"></i> ${rec.protein}</span>
        </div>
        <p style="font-size: 0.92rem; color: var(--text-body); margin-bottom: 20px;">${rec.description}</p>

        <h4 style="margin-bottom: 10px;"><i data-lucide="check-square" class="text-green"></i> Ingredients</h4>
        <ul style="list-style: none; margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
          ${rec.ingredients.map(ing => `
            <li style="display: flex; justify-content: space-between; font-size: 0.88rem; padding: 6px 10px; background: var(--bg-subtle); border-radius: var(--radius-sm);">
              <span>${ing.name}</span>
              <strong style="color: var(--text-dark);">${ing.qty}</strong>
            </li>
          `).join('')}
        </ul>

        <h4 style="margin-bottom: 10px;"><i data-lucide="list-ordered" class="text-green"></i> Instructions</h4>
        <ol style="padding-left: 20px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem;">
          ${rec.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>

        <button class="btn btn-primary btn-block btn-lg" onclick="addMissingRecipeIngredients(${recipeIndex}); closeModal('recipeDetailModal');">
          <i data-lucide="shopping-cart"></i> Add All Missing Ingredients to Cart
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  openModal('recipeDetailModal');
}

function addMissingRecipeIngredients(recipeIndex) {
  const rec = RECIPE_DATABASE[recipeIndex];
  if (!rec) return;

  let addedCount = 0;
  rec.ingredients.forEach(ing => {
    if (ing.prodId) {
      addToCart(ing.prodId);
      addedCount++;
    }
  });

  showToast(`Added ${addedCount || 2} recipe items to your cart!`, 'success', 'sparkles');
  toggleCartDrawer();
}

// ==========================================
// 13. 3D HOLOGRAPHIC PRODUCT INSPECTOR
// ==========================================
function openQuickView(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const content = document.getElementById('quickViewContent');
  if (!content) return;

  content.innerHTML = `
    <div class="holo-3d-canvas-wrap">
      <div class="holo-overlay-ui">
        <span>3D HOLOGRAPHIC MESH</span><br>
        <small>ANTIGRAVITY ROTATION: ACTIVE</small>
      </div>
      <img src="${prod.image}" alt="${prod.name}" class="holo-3d-model-img" />
      <div class="holo-ring r1" style="width: 260px; height: 260px;"></div>
    </div>
    
    <div class="qv-info">
      <span class="section-tag">${prod.dept}</span>
      <h2 class="qv-title">${prod.name}</h2>
      
      <div class="product-rating-row" style="margin-bottom: 12px;">
        <div class="stars-rating">
          <i data-lucide="star"></i>
          <strong>${prod.rating.toFixed(1)}</strong>
        </div>
        <span class="rating-count">(${prod.reviewCount} reviews) • ${prod.weight}</span>
      </div>

      <div class="price-box" style="margin-bottom: 16px;">
        <span class="current-price" style="font-size: 1.6rem;">₹${prod.price}</span>
        ${prod.originalPrice > prod.price ? `<span class="original-price" style="font-size: 0.95rem;">₹${prod.originalPrice} (Save ₹${prod.originalPrice - prod.price})</span>` : ''}
      </div>

      <p class="qv-desc">${prod.description}</p>

      <ul class="qv-features">
        ${prod.features.map(f => `<li><i data-lucide="check-circle-2"></i> ${f}</li>`).join('')}
      </ul>

      <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); padding: 10px 14px; border-radius: var(--radius-md); font-size: 0.82rem; margin-bottom: 20px;">
        <strong>🥗 Cellular Nutrition:</strong> ${prod.nutrition}
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <button class="btn btn-primary btn-lg btn-block" onclick="addToCart('${prod.id}'); closeModal('quickViewModal');">
          <i data-lucide="shopping-cart"></i> Add to Cart (₹${prod.price})
        </button>
        <button class="icon-btn" onclick="toggleWishlist('${prod.id}')" title="Save to wishlist">
          <i data-lucide="heart" style="${AppState.wishlist.has(prod.id) ? 'color: #ef4444; fill: currentColor;' : ''}"></i>
        </button>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
  openModal('quickViewModal');
  playSynthSound('scan');
}

// ==========================================
// 14. CHECKOUT & 2-HOUR TRACKER SIMULATION
// ==========================================
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Your cart is empty!', 'warning', 'alert-circle');
    return;
  }
  closeCartDrawer();
  updateNextSlotTime();
  openModal('checkoutModal');
}

function processOrder(e) {
  e.preventDefault();

  const address = document.getElementById('chkAddress').value;
  const orderId = `ARM-${Math.floor(10000 + Math.random() * 90000)}`;

  const newOrder = {
    orderId,
    date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [...AppState.cart],
    total: document.getElementById('checkoutGrandTotal').innerText,
    address: `${address}, Andheri West, Mumbai`,
    status: 'Out for 2-Hour Express Delivery'
  };

  AppState.orders.unshift(newOrder);
  saveOrdersData();

  AppState.cart = [];
  AppState.appliedCoupon = null;
  saveCartData();
  updateCartDrawerUI();
  renderProductCatalog();

  closeModal('checkoutModal');

  document.getElementById('trackerOrderId').innerText = `#${orderId}`;
  openModal('deliveryTrackerModal');
  showToast(`Order #${orderId} confirmed! Tracking live 2h dispatch.`, 'success', 'truck');
  playSynthSound('victory');
}

function updateNextSlotTime() {
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + 108 * 60000);
  const timeStr = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const slotEl = document.getElementById('slotEstimatedTime');
  const nextSlot = document.getElementById('nextSlotTime');
  if (slotEl) slotEl.innerText = timeStr;
  if (nextSlot) nextSlot.innerText = `Today by ${timeStr}`;
}

function startFlashDealsTimer() {
  let seconds = 3 * 3600 + 42 * 60 + 18;
  setInterval(() => {
    seconds--;
    if (seconds <= 0) seconds = 4 * 3600;

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const hEl = document.getElementById('dealHours');
    const mEl = document.getElementById('dealMins');
    const sEl = document.getElementById('dealSecs');

    if (hEl) hEl.innerText = hrs < 10 ? `0${hrs}` : hrs;
    if (mEl) mEl.innerText = mins < 10 ? `0${mins}` : mins;
    if (sEl) sEl.innerText = secs < 10 ? `0${secs}` : secs;
  }, 1000);
}

// Modal Handlers
function openModal(modalId) {
  if (modalId === 'aboutModal') {
    showInfoModal('About AROMAN 3D', `
      <p style="margin-bottom: 14px;"><strong>AROMAN 3D</strong> is Mumbai's premier interactive farm-fresh grocery and botanical science platform.</p>
      <p style="margin-bottom: 14px;">We unite organic agriculture with interactive 3D science education, allowing shoppers to explore food biochemistry and enjoy ultra-fast 2-hour express delivery.</p>
    `);
    return;
  } else if (modalId === 'helpModal') {
    showInfoModal('Help Center & FAQs', `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div>
          <h4 style="font-size: 0.95rem; margin-bottom: 4px;">⚡ How does 2-Hour Express Delivery work?</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Orders are packed at 4°C within 15 minutes and dispatched via electric zero-emission scooters.</p>
        </div>
        <div>
          <h4 style="font-size: 0.95rem; margin-bottom: 4px;">📞 Helpline</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Call <strong>+91 92632 93614</strong> or email <strong>hello@aroman.in</strong>.</p>
        </div>
      </div>
    `);
    return;
  } else if (modalId === 'contactModal') {
    showInfoModal('Contact AROMAN', `
      <div style="background: var(--bg-subtle); padding: 16px; border-radius: var(--radius-md);">
        <div>📍 <strong>Headquarters:</strong> Infinity IT Park, Andheri West, Mumbai 400053</div>
        <div style="margin: 8px 0;">📞 <strong>Helpline:</strong> <a href="tel:+919263293614" style="color: var(--primary); font-weight: 700;">+91 92632 93614</a></div>
        <div>✉️ <strong>Email:</strong> <a href="mailto:hello@aroman.in" style="color: var(--primary); font-weight: 700;">hello@aroman.in</a></div>
      </div>
    `);
    return;
  } else if (modalId === 'ordersModal') {
    renderOrdersModal();
  }

  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showInfoModal(title, htmlContent) {
  const titleEl = document.getElementById('infoModalTitle');
  const bodyEl = document.getElementById('infoModalBody');
  if (titleEl) titleEl.innerText = title;
  if (bodyEl) bodyEl.innerHTML = htmlContent;
  const modal = document.getElementById('infoModal');
  if (modal) modal.classList.add('active');
}

function renderOrdersModal() {
  const bodyEl = document.getElementById('ordersModalBody');
  if (!bodyEl) return;

  if (AppState.orders.length === 0) {
    bodyEl.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <i data-lucide="package" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--text-light);"></i>
        <h4>No past orders yet</h4>
        <p style="font-size: 0.85rem; margin-top: 4px;">Once you place an order, you can track it here.</p>
      </div>
    `;
  } else {
    bodyEl.innerHTML = AppState.orders.map(order => `
      <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="color: var(--primary); font-size: 1rem;">Order #${order.orderId}</strong>
          <span style="font-size: 0.78rem; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: var(--radius-full); font-weight: 700;">${order.status}</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">
          📅 ${order.date} • 📍 ${order.address}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-color); padding-top: 8px;">
          <span style="font-size: 0.85rem;">Total Amount: <strong>${order.total}</strong></span>
          <button class="btn btn-secondary btn-sm" onclick="openModal('deliveryTrackerModal'); closeModal('ordersModal');">
            Track Live 2h Status
          </button>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
  const modal = document.getElementById('ordersModal');
  if (modal) modal.classList.add('active');
}

function setDeliveryLocation(loc) {
  AppState.deliveryLocation = loc;
  const txt = document.getElementById('currentLocationText');
  if (txt) txt.innerText = loc;
  closeModal('locationModal');
  showToast(`Location set: ${loc}`, 'success', 'map-pin');
}

function switchAuthTab(tab) {
  const tabs = document.querySelectorAll('.auth-tab');
  const title = document.getElementById('accountModalTitle');
  const btn = document.getElementById('authSubmitBtn');

  tabs.forEach(t => t.classList.remove('active'));
  if (tab === 'signin') {
    if (tabs[0]) tabs[0].classList.add('active');
    if (title) title.innerText = 'Sign In to AROMAN 3D';
    if (btn) btn.innerText = 'Sign In to Aroman';
  } else {
    if (tabs[1]) tabs[1].classList.add('active');
    if (title) title.innerText = 'Create an Account';
    if (btn) btn.innerText = 'Register & Get 20% OFF';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  closeModal('accountModal');
  showToast('Welcome back, Rahul! Signed in successfully.', 'success', 'user-check');
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletterEmail');
  if (input) {
    showToast(`Thank you! Subscribed ${input.value} for weekly harvests.`, 'success', 'check-circle');
    input.value = '';
  }
}

// ==========================================
// 15. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success', iconName = 'check') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  if (window.lucide) {
    window.lucide.createIcons({ root: toast });
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}
