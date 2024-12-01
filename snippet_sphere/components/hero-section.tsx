'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Code2, Github, Linkedin, ChevronDown } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial
          color={hovered ? "#9333ea" : "#6d28d9"}
          emissive={hovered ? "#7e22ce" : "#5b21b6"}
          specular="#c4b5fd"
          shininess={100}
        />
      </mesh>
    </Float>
  )
}

function FloatingCubes() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
          ]}
          speed={1}
          rotationIntensity={1}
          floatIntensity={1}
        >
          <mesh scale={0.2}>
            <boxGeometry />
            <meshPhongMaterial
              color={`hsl(${Math.random() * 360}, 70%, 40%)`}
              opacity={0.7}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

const creators = [
  {
    name: 'Amitava Datta',
    role: 'Lead Developer',
    github: 'https://github.com/amitavadatta',
    linkedin: 'https://linkedin.com/in/amitavadatta',
  },
  {
    name: 'Pranay De',
    role: 'Core Developer',
    github: 'https://github.com/pranayde',
    linkedin: 'https://linkedin.com/in/pranayde',
  },
]

export function HeroSection() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-purple-900/30 dark:to-violet-950/50">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          className="bg-transparent"
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          />
          <AnimatedBox />
          <FloatingCubes />
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
                Code Showcase
              </span>
            </h1>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 sm:text-xl lg:text-2xl">
              A beautiful collection of code snippets and programs.
              Browse, search, and copy code with ease.
            </p>
            <div className="mb-12 flex justify-center space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all transform hover:scale-105"
              >
                <Link href="/snippets">
                  <Code2 className="mr-2 h-5 w-5" />
                  Browse Snippets
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-8 rounded-lg border border-gray-200 bg-white/50 p-6 backdrop-blur-sm sm:grid-cols-2 dark:border-purple-500/30 dark:bg-purple-950/30">
              {creators.map((creator) => (
                <div
                  key={creator.name}
                  className="flex flex-col items-center space-y-2 rounded-lg bg-gray-100/50 p-4 backdrop-blur-sm hover:bg-gray-200/50 transition-all hover:shadow-lg dark:bg-purple-900/50 dark:hover:bg-purple-800/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{creator.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-purple-200">{creator.role}</p>
                  <div className="flex space-x-4 mt-2">
                    <Link
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors dark:text-purple-300 dark:hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors dark:text-purple-300 dark:hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-600 dark:text-white opacity-50" />
      </div>
    </div>
  )
}

