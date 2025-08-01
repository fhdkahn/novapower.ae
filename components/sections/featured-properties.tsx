"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { GradientText } from '@/components/ui/gradient-text'

const properties = [
  {
    id: 1,
    title: "Large-Scale Community Development",
    location: "From Villas • Mid to High-Rise • Master Planned Communities",
    price: "G+2 to G+25 | 1–6 BR Units",
    image: "/residntia.webp",
  },
  {
    id: 2,
    title: "Large-Scale Commercial Office Development",
    location: "From Office Towers • Shopping District • Master-Planned Business Zones",
    price: "Multi-Tower Campuses",
    image: "/offic.webp",

  },
  {
    id: 3,
    title: "Industrial & Logistics Parks Development",
    location: "Smart Warehousing • Logistics Parks • Light & Heavy Industrial Zones",
    price: "Sustainable Design",
    image: "/industria.webp",

  }
]

export function FeaturedProperties() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="properties" className="min-h-screen flex items-center py-12 px-4 sm:px-6 bg-background">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              ✨ NOVA POWER
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
            <GradientText>Development</GradientText> Expertise
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
          From skyline-defining towers to family-centered villas, Nova Power Developer. leads the way in crafting spaces that elevate how people live and work.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={itemVariants} className="flex justify-center mb-6 md:mb-0">
              <CardContainer className="inter-var" containerClassName="py-0 w-full">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full max-w-sm h-auto rounded-xl p-4 sm:p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white leading-tight"
                  >
                    {property.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 leading-relaxed"
                  >
                    {property.location}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={property.image}
                      height="1000"
                      width="1000"
                      className="h-44 sm:h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={`${property.title} - ${property.location}`}
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-4">
                    <CardItem
                      translateZ={20}
                      as="span"
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      {property.price}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 