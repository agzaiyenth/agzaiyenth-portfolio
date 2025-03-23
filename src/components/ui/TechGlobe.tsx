
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Code,
  Box,
  FileJson,
  Database,
  Layers,
  GanttChart,
  Brush,
  Figma,
  CircuitBoard,
  PaintBucket,
  AppWindow,
  Server,
  Github
} from 'lucide-react';

interface TechIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
  position: [number, number, number];
  // Add properties that were missing
  element?: HTMLDivElement;
  position3D?: THREE.Vector3;
}

const TechGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const iconsContainerRef = useRef<HTMLDivElement>(null);

  // Tech stack data
  const techIcons: TechIcon[] = [
    { name: 'React', icon: <Code size={28} />, color: '#61DAFB', position: [0.8, 0.2, 0.1] },
    { name: 'Java', icon: <FileJson size={28} />, color: '#f89820', position: [-0.7, 0.4, 0.3] },
    { name: 'TypeScript', icon: <Box size={28} />, color: '#3178C6', position: [0.2, 0.8, 0.4] },
    { name: 'Python', icon: <GanttChart size={28} />, color: '#306998', position: [-0.5, -0.5, 0.6] },
    { name: 'Kotlin', icon: <CircuitBoard size={28} />, color: '#7F52FF', position: [0.5, -0.6, 0.2] },
    { name: 'MySQL', icon: <Database size={28} />, color: '#00758F', position: [-0.3, 0.7, -0.4] },
    { name: 'Spring', icon: <Layers size={28} />, color: '#6DB33F', position: [0.6, -0.2, -0.7] },
    { name: 'Next.js', icon: <AppWindow size={28} />, color: '#ffffff', position: [-0.8, -0.1, -0.4] },
    { name: 'Figma', icon: <Figma size={28} />, color: '#F24E1E', position: [0.1, -0.8, -0.5] },
    { name: 'GitHub', icon: <Github size={28} />, color: '#ffffff', position: [-0.2, -0.3, 0.9] },
    { name: 'Docker', icon: <Server size={28} />, color: '#2496ED', position: [0.3, 0.3, -0.9] },
    { name: 'Adobe PS', icon: <Brush size={28} />, color: '#31A8FF', position: [-0.9, 0.1, 0.1] },
  ];

  useEffect(() => {
    if (!containerRef.current || !globeRef.current || !iconsContainerRef.current) return;

    // Initialize Three.js objects
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      globeRef.current.clientWidth / globeRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    globeRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create a more realistic globe texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
    const earthBumpMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
    const earthSpecMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');
    const cloudsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png');

    // Create Earth globe
    const earthGeometry = new THREE.SphereGeometry(0.9, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.05,
      specularMap: earthSpecMap,
      specular: new THREE.Color('grey'),
      shininess: 10,
      transparent: true,
      opacity: 0.9
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Add clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(0.93, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.4
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(cloudsMesh);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(0.95, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x0066ff) },
        viewVector: { value: new THREE.Vector3(0, 0, 1) }
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity * 0.4);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Add directional light (sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Position the 2D technology icons around the 3D globe
    techIcons.forEach((tech, index) => {
      const iconPos = new THREE.Vector3(tech.position[0], tech.position[1], tech.position[2]);
      iconPos.normalize().multiplyScalar(1.2); // Position slightly outside the globe
      tech.position3D = iconPos;
      
      if (iconsContainerRef.current) {
        const iconElement = document.createElement('div');
        iconElement.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500';
        iconElement.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="p-3 rounded-full bg-background/20 backdrop-blur-md border border-white/10 shadow-glow-sm" style="color: ${tech.color}">
              ${renderToString(tech.icon)}
            </div>
            <span class="mt-2 text-xs font-medium bg-background/50 px-2 py-1 rounded-full backdrop-blur-sm text-white/90">
              ${tech.name}
            </span>
          </div>
        `;
        iconsContainerRef.current.appendChild(iconElement);
        tech.element = iconElement;
      }
    });

    // Animation function
    let rotationSpeed = 0.0005;
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const animate = () => {
      // Update Earth rotation
      earthMesh.rotation.y += rotationSpeed;
      
      // Update clouds rotation (slightly slower)
      cloudsMesh.rotation.y += rotationSpeed * 0.8;
      
      // Smooth rotation from mouse interaction
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Apply tilt based on mouse position
      earthMesh.rotation.x = currentRotationY * 0.3;
      earthMesh.rotation.z = currentRotationX * 0.3;
      cloudsMesh.rotation.x = currentRotationY * 0.3;
      cloudsMesh.rotation.z = currentRotationX * 0.3;
      
      // Update atmosphere glow
      if (atmosphereMaterial.uniforms) {
        atmosphereMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(
          camera.position,
          earthMesh.position
        );
      }
      
      // Update the positions of the 2D icons based on the 3D positions
      techIcons.forEach((tech) => {
        if (tech.element && tech.position3D) {
          // Create a copy of the original position vector
          const position = tech.position3D.clone();
          
          // Apply the same rotation as the globe
          position.applyAxisAngle(new THREE.Vector3(0, 1, 0), earthMesh.rotation.y);
          position.applyAxisAngle(new THREE.Vector3(1, 0, 0), earthMesh.rotation.x);
          position.applyAxisAngle(new THREE.Vector3(0, 0, 1), earthMesh.rotation.z);
          
          // Project 3D position to 2D screen space
          const screenPosition = position.clone();
          screenPosition.project(camera);
          
          // Convert to CSS coordinates
          const x = (screenPosition.x * 0.5 + 0.5) * globeRef.current!.clientWidth;
          const y = (-(screenPosition.y * 0.5) + 0.5) * globeRef.current!.clientHeight;
          
          // Check if icon is on the front side of the globe
          const isFront = position.z > 0;
          
          // Update icon position and visibility
          tech.element.style.left = `${x}px`;
          tech.element.style.top = `${y}px`;
          tech.element.style.opacity = isFront ? '1' : '0';
          tech.element.style.transform = `translate(-50%, -50%) scale(${isFront ? 1 : 0.5})`;
        }
      });
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      
      targetRotationX = mouseX * 0.5;
      targetRotationY = mouseY * 0.5;
      
      // Slow down automatic rotation when user is interacting
      rotationSpeed = 0.0002;
    };

    const handleMouseLeave = () => {
      // Resume normal rotation speed
      rotationSpeed = 0.0005;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Handle window resize
    const handleResize = () => {
      if (!globeRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      if (rendererRef.current && globeRef.current) {
        globeRef.current.removeChild(rendererRef.current.domElement);
      }
      techIcons.forEach(tech => {
        if (tech.element && iconsContainerRef.current) {
          iconsContainerRef.current.removeChild(tech.element);
        }
      });
    };
  }, []);

  // Helper function to convert React elements to strings
  function renderToString(element: React.ReactNode): string {
    if (!React.isValidElement(element)) {
      return '';
    }
    
    // A simple mapping of Lucide icons to SVG strings
    const iconName = element.type.displayName || '';
    switch (iconName) {
      case 'Code':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
      case 'Box':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>';
      case 'FileJson':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path></svg>';
      case 'Database':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>';
      case 'Layers':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>';
      case 'GanttChart':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h10"></path><path d="M6 12h9"></path><path d="M11 18h7"></path></svg>';
      case 'CircuitBoard':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M11 9h4a2 2 0 0 0 2-2V3"></path><circle cx="9" cy="9" r="2"></circle><path d="M7 21v-4a2 2 0 0 1 2-2h4"></path><circle cx="15" cy="15" r="2"></circle></svg>';
      case 'Figma':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>';
      case 'Brush':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path></svg>';
      case 'AppWindow':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M10 4v4"></path><path d="M2 8h20"></path><path d="M6 4v4"></path></svg>';
      case 'Server':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>';
      case 'Github':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>';
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-square max-w-xl mx-auto cursor-pointer"
    >
      <div ref={globeRef} className="w-full h-full"></div>
      <div ref={iconsContainerRef} className="absolute inset-0 pointer-events-none"></div>
    </div>
  );
};

export default TechGlobe;
