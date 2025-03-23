
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
    globeRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create the globe geometry
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create a custom shader material for the globe
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(0x2563eb) },  // Royal blue accent
        glowColor: { value: new THREE.Color(0x4f46e5) }   // Slightly different color for glow
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // Create a grid pattern
          float grid = 0.05;
          vec2 wrap = fract(vUv * 15.0);
          float gridX = smoothstep(grid, 0.0, wrap.x) + smoothstep(1.0 - grid, 1.0, wrap.x);
          float gridY = smoothstep(grid, 0.0, wrap.y) + smoothstep(1.0 - grid, 1.0, wrap.y);
          float gridFactor = clamp(gridX + gridY, 0.0, 1.0) * 0.35;
          
          // Edge glow
          float edgeFactor = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          // Combine edge glow with grid
          vec3 color = mix(baseColor * 0.4, glowColor, edgeFactor + gridFactor);
          
          // Pulse animation
          float pulse = sin(time * 0.5) * 0.1 + 0.2;
          float alpha = edgeFactor * 0.7 + gridFactor + pulse;
          
          gl_FragColor = vec4(color, clamp(alpha, 0.1, 0.95));
        }
      `,
      transparent: true,
      side: THREE.FrontSide
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Position the 2D technology icons around the 3D globe
    techIcons.forEach((tech, index) => {
      const iconPos = new THREE.Vector3(tech.position[0], tech.position[1], tech.position[2]);
      iconPos.normalize().multiplyScalar(1.2); // Position slightly outside the globe
      
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
        
        // Store the element in a data attribute for animation
        tech.element = iconElement;
        tech.position3D = iconPos;
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
      if (!globeMaterial.uniforms) return;
      
      // Update shader time uniform
      globeMaterial.uniforms.time.value += 0.01;
      
      // Smooth rotation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Apply rotation to the globe
      globe.rotation.y += rotationSpeed;
      globe.rotation.x = currentRotationY * 0.3;
      globe.rotation.z = currentRotationX * 0.3;
      
      // Update the positions of the 2D icons based on the 3D positions
      techIcons.forEach((tech) => {
        if (tech.element && tech.position3D) {
          // Create a copy of the original position vector
          const position = tech.position3D.clone();
          
          // Apply the same rotation as the globe
          position.applyAxisAngle(new THREE.Vector3(0, 1, 0), globe.rotation.y);
          position.applyAxisAngle(new THREE.Vector3(1, 0, 0), globe.rotation.x);
          position.applyAxisAngle(new THREE.Vector3(0, 0, 1), globe.rotation.z);
          
          // Project 3D position to 2D screen space
          const screenPosition = position.clone();
          screenPosition.project(camera);
          
          // Convert to CSS coordinates
          const x = (screenPosition.x * 0.5 + 0.5) * globeRef.current.clientWidth;
          const y = (-(screenPosition.y * 0.5) + 0.5) * globeRef.current.clientHeight;
          
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
    const tempDiv = document.createElement('div');
    const reactEl = React.isValidElement(element) ? element : <>{element}</>;
    
    // A simple mapping of Lucide icons to SVG strings
    const iconName = reactEl.type?.displayName || '';
    switch (iconName) {
      case 'Code':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
      case 'Box':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>';
      case 'FileJson':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path></svg>';
      case 'Database':
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>';
      // Add more icons as needed
      default:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>';
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
