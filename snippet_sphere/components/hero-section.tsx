'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code2, Github, Linkedin } from 'lucide-react';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Typewriter } from 'react-simple-typewriter';

function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial
          color="#4338ca"
          emissive="#312e81"
          specular="#818cf8"
          shininess={100}
        />
      </mesh>
    </Float>
  );
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
              color={`hsl(${Math.random() * 360}, 50%, 50%)`}
              opacity={0.7}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  );
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
];

export function HeroSection() {
  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          className="bg-gradient-to-b from-indigo-500/20 to-purple-500/20"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <AnimatedBox />
          <FloatingCubes />
          <Stars
            radius={50}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
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
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.2,
              }}
            >
              <Typewriter
                words={['Code Showcase']}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </motion.h1>
            <motion.p
              className="mb-8 text-lg text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typewriter
                words={[
                  'A beautiful collection of code snippets and programs.',
                  'Browse, search, and copy code with ease.',
                ]}
                loop={1}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                deleteSpeed={30}
              />
            </motion.p>
            <motion.div
              className="mb-12 flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              >
                <Link href="/snippets">
                  <Code2 className="mr-2 h-5 w-5" />
                  Browse Snippets
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid gap-8 rounded-lg border bg-card/50 p-6 backdrop-blur-sm sm:grid-cols-2"
            >
              {creators.map((creator) => (
                <motion.div
                  key={creator.name}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 rounded-lg bg-background/50 p-4 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground">{creator.role}</p>
                  <div className="flex space-x-4">
                    <Link
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}