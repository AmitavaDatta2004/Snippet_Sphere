'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Code2, Github, Linkedin, ChevronDown, ExternalLink } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion'

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
              color={`hsl(${Math.random() * 360}, 70%, 50%)`}
              opacity={0.7}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Typewriter({ words, loop = true, typingSpeed = 150, deletingSpeed = 100, delayBetweenWords = 1000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout

    const type = () => {
      const currentWord = words[currentWordIndex]
      
      if (isWaiting) {
        timeout = setTimeout(() => {
          setIsWaiting(false)
          setIsDeleting(true)
        }, delayBetweenWords)
        return
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
          if (currentWordIndex === words.length - 1 && !loop) return
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        if (currentText === currentWord) {
          setIsWaiting(true)
        }
      }

      const typingDelay = isDeleting ? deletingSpeed : typingSpeed
      timeout = setTimeout(type, typingDelay)
    }

    timeout = setTimeout(type, 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isWaiting, currentWordIndex, words, loop, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <span className="inline-block min-w-[1ch]">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  )
}

const creators = [
  {
    name: 'Amitava Datta',
    role: 'Lead Developer',
    github: 'https://github.com/AmitavaDatta2004',
    linkedin: 'https://www.linkedin.com/in/amitava-datta-301920292/',
    avatar: './collaborators/AmitavaDatta.png',
    bio: 'Passionate about creating elegant and efficient code solutions.',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    mail : 'dattaamitava2004@gmail.com'
  },
  {
    name: 'Pranay De',
    role: 'Core Developer',
    github: 'https://github.com/PRANAY130',
    linkedin: 'https://www.linkedin.com/in/amitava-datta-301920292/',
    avatar: './collaborators/PranayDe.jpg',
    bio: 'Dedicated to building robust and scalable applications.',
    skills: ['Python', 'Django', 'Machine Learning', 'AWS'],
    mail : 'pranayde201@gmail.com'
  },
]

function DeveloperCard({ creator, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
      className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-400 shadow-lg transform transition-transform group-hover:scale-110">
            <Image
              src={creator.avatar}
              alt={creator.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover:scale-110"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-1">{creator.name}</h3>
            <p className="text-lg text-purple-200 mb-2">{creator.role}</p>
            <p className="text-sm text-purple-100 mb-4">{creator.bio}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
              {creator.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-br from-purple-600 to-pink-600 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center sm:justify-start space-x-4">
          <a
            href={creator.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-white transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={`mailto:${creator.mail}`}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <ExternalLink className="h-6 w-6" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 dark:from-gray-900 dark:via-purple-900/30 dark:to-violet-950/50">
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
            count={5000}
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
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl font-extrabold text-white sm:text-7xl lg:text-8xl"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                <Typewriter
                  words={['Snippet Sphere', 'Explore Snippets', 'Learn & Share']}
                  loop={true}
                  typingSpeed={100}
                  deletingSpeed={80}
                  delayBetweenWords={2000}
                />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-xl text-purple-200 sm:text-2xl lg:text-3xl"
            >
              <Typewriter
                words={[
                  'A beautiful collection of code snippets and programs.',
                  'Browse, search, and copy code with ease.',
                  'Contribute and learn from the community.',
                ]}
                loop={true}
                typingSpeed={50}
                deletingSpeed={30}
                delayBetweenWords={3000}
              />
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-16 flex justify-center space-x-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                <Link href="/snippets">
                  <Code2 className="mr-2 h-5 w-5" />
                  Browse Snippets
                </Link>
              </Button>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-3xl font-bold text-white mb-8"
            >
              Meet Our Developers
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid gap-8 sm:grid-cols-2"
            >
              {creators.map((creator, index) => (
                <DeveloperCard key={creator.name} creator={creator} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-white opacity-50" />
      </motion.div>
    </div>
  )
}

