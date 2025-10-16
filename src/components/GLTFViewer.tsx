import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

interface GLTFViewerProps {
  gltfFile: string
  width?: number | string
  height?: number | string
  backgroundColor?: string
  className?: string
}

export function GLTFViewer({
  gltfFile,
  width = '100%',
  height = '100%',
  backgroundColor = '#F7FBFB',
  className = '',
}: GLTFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0)
  const [rotationAxis, setRotationAxis] = useState<'x' | 'y' | 'z'>('y')
  const [isAutoRotating, setIsAutoRotating] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !gltfFile) return
    setIsLoading(true)

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0.5, 3)
    cameraRef.current = camera

    // Renderer (safe mounting)
    let renderer = rendererRef.current
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      rendererRef.current = renderer
    }
    if (!container.contains(renderer.domElement)) {
      container.appendChild(renderer.domElement)
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enableZoom = true
    controlsRef.current = controls

    // Lighting for PBR materials
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir1 = new THREE.DirectionalLight(0xffffff, 1)
    dir1.position.set(2, 2, 2)
    scene.add(dir1)
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dir2.position.set(-2, -2, -2)
    scene.add(dir2)

    // Load GLTF file
    const loader = new GLTFLoader()
    loader.load(
      gltfFile,
      (gltf) => {
        const model = gltf.scene
        modelRef.current = model
        scene.add(model)

        // // Apply initial color
        // model.traverse((child) => {
        //   if (child.isMesh && child.material) {
        //     child.material = new THREE.MeshStandardMaterial({ color: 0x47BDBF })
        //   }
        // })

        // Center + scale model
        const box = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)
        model.position.sub(center)

        const maxDim = Math.max(size.x, size.y, size.z)
        camera.position.set(0, 0, maxDim * 2.5)
        camera.far = maxDim * 10
        camera.updateProjectionMatrix()
        controls.minDistance = maxDim   // 👈 minimum zoom distance
        controls.maxDistance = maxDim + 30.0  // 👈 maximum zoom distance

        // Add centered PointLight above model
        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(center.x, center.y + 2, center.z + 2)
        scene.add(pointLight)
        pointLightRef.current = pointLight

        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF:', error)
        setIsLoading(false)
      }
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      if (isAutoRotating && modelRef.current) {
        const r = modelRef.current.rotation
        if (rotationAxis === 'x') r.x += rotationSpeed * 0.01
        else if (rotationAxis === 'y') r.y += rotationSpeed * 0.01
        else r.z += rotationSpeed * 0.01
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
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

    // Cleanup (safe)
    return () => {
      window.removeEventListener('resize', handleResize)

      const renderer = rendererRef.current
      if (renderer && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }

      renderer?.dispose()
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry)
          (obj as THREE.Mesh).geometry.dispose()
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
          else mat.dispose()
        }
      })
    }
  }, [gltfFile, backgroundColor, rotationAxis, rotationSpeed, isAutoRotating])

  return (
    <div
      ref={containerRef}
      style={{ width, height, position: 'relative' }}
      className={className}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate bg-opacity-30 rounded-lg">
          <div className="bg-mist p-3 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aqua"></div>
            <p className="mt-2 text-sm text-slate">Loading model...</p>
          </div>
        </div>
      )}

      {/* Controls}
      <div className="absolute bottom-4 left-0 right-0 mx-auto flex flex-col items-center">
        <div className="bg-mist bg-opacity-90 p-3 rounded-lg shadow-lg max-w-xs w-full">
          <div className="flex justify-center space-x-2 mb-3">
            {(['x', 'y', 'z'] as const).map((axis) => (
              <button
                key={axis}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  rotationAxis === axis
                    ? 'bg-aqua text-mist'
                    : 'bg-slate bg-opacity-20 text-slate'
                }`}
                onClick={() => setRotationAxis(axis)}
              >
                {axis.toUpperCase()} Axis
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-xs text-slate">Auto-rotate:</span>
            <input
              type="range"
              min="-10"
              max="10"
              value={rotationSpeed}
              onChange={(e) => {
                const val = Number(e.target.value)
                setRotationSpeed(val)
                setIsAutoRotating(val !== 0)
              }}
              className="flex-1 h-2 bg-slate bg-opacity-20 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-slate font-medium w-6 text-center">
              {rotationSpeed}
            </span>
          </div>
        </div>
      </div>
      {Controls */}
    </div>
  )
}
