import React, { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
interface STLViewerProps {
  stlFile: string
  width?: number | string
  height?: number | string
  backgroundColor?: string
  modelColor?: string
  className?: string
}
export function STLViewer({
  stlFile,
  width = '100%',
  height = '100%',
  backgroundColor = '#F7FBFB',
  modelColor = '#47BDBF',
  className = '',
}: STLViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Mesh | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0)
  const [rotationAxis, setRotationAxis] = useState<'x' | 'y' | 'z'>('y')
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const handleRotationAxisChange = (axis: 'x' | 'y' | 'z') => {
    setRotationAxis(axis)
  }
  const handleRotationSpeedChange = (speed: number) => {
    setRotationSpeed(speed)
    setIsAutoRotating(speed !== 0)
  }
  const handleRotateLeft = () => {
    if (modelRef.current) {
      if (rotationAxis === 'x') {
        modelRef.current.rotation.x -= Math.PI / 12
      } else if (rotationAxis === 'y') {
        modelRef.current.rotation.y -= Math.PI / 12
      } else {
        modelRef.current.rotation.z -= Math.PI / 12
      }
    }
  }
  const handleRotateRight = () => {
    if (modelRef.current) {
      if (rotationAxis === 'x') {
        modelRef.current.rotation.x += Math.PI / 12
      } else if (rotationAxis === 'y') {
        modelRef.current.rotation.y += Math.PI / 12
      } else {
        modelRef.current.rotation.z += Math.PI / 12
      }
    }
  }
  const handleResetRotation = () => {
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0)
      setRotationSpeed(0)
      setIsAutoRotating(false)
    }
  }
  useEffect(() => {
    if (!containerRef.current) return
    setIsLoading(true)
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(backgroundColor)
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    cameraRef.current = camera
    camera.position.z = 5
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    rendererRef.current = renderer
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controlsRef.current = controls
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = true
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight2.position.set(-1, -1, -1)
    scene.add(directionalLight2)
    // Load STL file
    const loader = new STLLoader()
    loader.load(
      stlFile,
      (geometry) => {
        const material = new THREE.MeshStandardMaterial({
          color: modelColor,
          metalness: 0.2,
          roughness: 0.5,
        })
        const mesh = new THREE.Mesh(geometry, material)
        modelRef.current = mesh
        // Center the model
        geometry.computeBoundingBox()
        const boundingBox = geometry.boundingBox
        if (boundingBox) {
          const center = new THREE.Vector3()
          boundingBox.getCenter(center)
          mesh.position.set(-center.x, -center.y, -center.z);
          mesh.rotation.x = -(Math.PI / 2) + Math.PI / 4;
          // Adjust camera position based on model size
          const size = new THREE.Vector3()
          boundingBox.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z)
          camera.position.z = maxDim * 2.5
          camera.far = maxDim * 10
          camera.updateProjectionMatrix()
        }
        scene.add(mesh)
        setIsLoading(false)
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('An error occurred loading the STL file:', error)
        setIsLoading(false)
      },
    )
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      // Auto-rotation
      if (isAutoRotating && modelRef.current) {
        if (rotationAxis === 'x') {
          modelRef.current.rotation.x += rotationSpeed * 0.01
        } else if (rotationAxis === 'y') {
          modelRef.current.rotation.y += rotationSpeed * 0.01
        } else {
          modelRef.current.rotation.z += rotationSpeed * 0.01
        }
      }
      if (controlsRef.current) {
        controlsRef.current.update()
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }
    animate()
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (modelRef.current) {
        if (modelRef.current.geometry) modelRef.current.geometry.dispose()
        if (modelRef.current.material) {
          if (Array.isArray(modelRef.current.material)) {
            modelRef.current.material.forEach((material) => material.dispose())
          } else {
            modelRef.current.material.dispose()
          }
        }
      }
    }
  }, [stlFile, backgroundColor, modelColor])
  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        position: 'relative',
      }}
      className={className}
    >
      {/* Rotation controls */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto flex flex-col items-center">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate bg-opacity-30 rounded-lg">
            <div className="bg-mist p-3 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aqua"></div>
              <p className="mt-2 text-sm text-slate">Loading model...</p>
            </div>
          </div>
        )}
        {/* Rotation controls panel */}
        <div className="bg-mist bg-opacity-90 p-3 rounded-lg shadow-lg max-w-xs w-full">
          {/* Axis selection */}
          <div className="flex justify-center space-x-2 mb-3">
            <button
              className={`px-3 py-1 rounded-md text-xs font-medium ${rotationAxis === 'x' ? 'bg-aqua text-mist' : 'bg-slate bg-opacity-20 text-slate'}`}
              onClick={() => handleRotationAxisChange('x')}
            >
              X Axis
            </button>
            <button
              className={`px-3 py-1 rounded-md text-xs font-medium ${rotationAxis === 'y' ? 'bg-aqua text-mist' : 'bg-slate bg-opacity-20 text-slate'}`}
              onClick={() => handleRotationAxisChange('y')}
            >
              Y Axis
            </button>
            <button
              className={`px-3 py-1 rounded-md text-xs font-medium ${rotationAxis === 'z' ? 'bg-aqua text-mist' : 'bg-slate bg-opacity-20 text-slate'}`}
              onClick={() => handleRotationAxisChange('z')}
            >
              Z Axis
            </button>
          </div>
          {/* Manual rotation controls */}
          <div className="flex justify-center items-center space-x-2 mb-3">
            <button
              className="bg-aqua text-mist p-1 rounded-full"
              onClick={handleRotateLeft}
              aria-label="Rotate left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="bg-slate bg-opacity-20 text-slate p-1 rounded-full"
              onClick={handleResetRotation}
              aria-label="Reset rotation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
            <button
              className="bg-aqua text-mist p-1 rounded-full"
              onClick={handleRotateRight}
              aria-label="Rotate right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          {/* Auto-rotation speed control */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate">Auto-rotate:</span>
            <input
              type="range"
              min="-10"
              max="10"
              value={rotationSpeed}
              onChange={(e) =>
                handleRotationSpeedChange(Number(e.target.value))
              }
              className="flex-1 h-2 bg-slate bg-opacity-20 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-slate font-medium w-6 text-center">
              {rotationSpeed}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
