"use client";
import { motion } from "framer-motion";

export default function CollectionsPage() {
  const collections = [
    {
      title: "SOFT LEATHER JACKETS",
      description: "Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.",
      image: "https://themewagon.github.io/kaira/images/banner-image-6.jpg",
    },
    {
      title: "CLASSIC LEATHER COATS",
      description: "Premium quality leather coats with timeless design for all seasons.",
      image: "https://themewagon.github.io/kaira/images/banner-image-1.jpg",
    },
    {
      title: "BOMBER LEATHER JACKETS",
      description: "Modern style bomber jackets with superior comfort and durability.",
      image: "https://themewagon.github.io/kaira/images/banner-image-3.jpg",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  const imageHover = {
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  };

  return (
    <main className="min-h-screen py-8">
      <motion.div 
        className="px-4 py-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="flex flex-nowrap md:flex-wrap gap-6 overflow-x-auto pb-6 md:overflow-visible md:justify-center">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group w-80 md:w-96 overflow-hidden transition-all duration-500 ease-in-out flex-shrink-0 md:flex-shrink"
            >
              <motion.div 
                className="h-[400px] w-full overflow-hidden"
                whileHover={imageHover}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="py-4 transition-colors duration-300">
                <motion.h2 
                  className="text-xl font-semibold mb-3 group-hover:text-gray-800"
                  whileHover={{ x: 5 }}
                >
                  {collection.title}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mb-4 text-sm group-hover:text-gray-700"
                  whileHover={{ x: 5 }}
                >
                  {collection.description}
                </motion.p>
                <motion.button 
                  className="font-[1.5rem] border-b border-gray-600 hover:border-black hover:pb-2 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  DISCOVER NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}