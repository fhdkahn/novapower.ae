"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChromaGrid from '@/components/ui/ChromaGrid';
import Particles from '../ui/Particles';

interface TeamMember {
  image: string;
  title: string;
  subtitle: string;
  borderColor: string;
  gradient: string;
}

export function Team() {
  const dubaiTeamMembers: TeamMember[] = [
    {
      image: "/sui.png",
      title: "Sui JianSheng",
      subtitle: "Managing Director of Dubai Branch",
      borderColor: "#D97706",
      gradient: "linear-gradient(145deg, #D97706, #000)",
    },
    {
      image: "/chn.png",
      title: "Chen AiQiang",
      subtitle: "Head of Engineering Department",
      borderColor: "#DC2626",
      gradient: "linear-gradient(165deg, #DC2626, #000)",
    },
    {
      image: "/you.jpg",
      title: "Omar Hassan",
      subtitle: "Investment Director",
      borderColor: "#059669",
      gradient: "linear-gradient(195deg, #059669, #000)",
    },
    {
      image: "https://i.pravatar.cc/300?img=45",
      title: "Layla Abdullah",
      subtitle: "Market Research Lead",
      borderColor: "#7C3AED",
      gradient: "linear-gradient(225deg, #7C3AED, #000)",
    },
  ];

  // Add state for mouse position
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Handler for mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMouse({ x, y });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/30 via-white to-pink-50/40 dark:from-gray-900/50 dark:via-gray-950 dark:to-gray-900/70 pt-12 pb-4">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/20 via-transparent to-purple-100/10 dark:from-gray-800/30 dark:via-transparent dark:to-blue-900/10" />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-200/15 via-transparent to-transparent dark:from-white/5 dark:via-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-2xl" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border shadow-lg bg-white/40 border-orange-200/50 text-gray-800 dark:bg-gray-800/50 dark:border-gray-600/50 dark:text-gray-200"
          >
            ✨ Meet Our Leadership
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Our Dubai{' '}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Leadership Team
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Driven by excellence and powered by innovation, our Dubai leadership team 
            brings decades of combined experience in real estate and investment.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center"
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <ChromaGrid 
              items={dubaiTeamMembers}
              radius={300}
              columns={4}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </motion.div>

        {/* Contact Form Placeholder */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-5xl bg-gray-900/80 rounded-2xl shadow-xl p-8 border border-gray-700/50 backdrop-blur-md relative overflow-hidden flex flex-col" onMouseMove={handleMouseMove}>
            {/* Particles Background */}
            <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
                externalMouse={mouse}
              />
            </div>
            <div className="relative z-10 flex flex-col">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Get More Details</h3>
                <p className="text-gray-300">Submit your details and our team will get in touch with you soon.</p>
              </div>
              <form className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
                <div className="flex-1">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                </div>
                <div className="flex-1">
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                </div>
                <div className="flex-1">
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition" />
                </div>
                <div className="w-full md:w-auto">
                  <button type="submit" className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 whitespace-nowrap">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 