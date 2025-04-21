"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutGrid = () => {
  return (
    <section className="relative bg-gray-100 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content - Animate from left */}
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-6">
            CLASSIC WINTER COLLECTION
          </h2>
          
          <motion.p 
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a. 
            Ac sed eu fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero. 
            Utiricies quam nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis donec dolor id in. 
            Pulvinar commodo mollis diam sed facilisis at cursus imperdiet cursus ac faucibus sit faucibus sit libero.
          </motion.p>
          
          <motion.button 
            className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300 border border-black hover:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            SHOP COLLECTION
          </motion.button>
        </motion.div>

        {/* Image Section - Animate from right */}
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-full aspect-[4/5] bg-gray-200 relative overflow-hidden rounded-lg">
            <Image
              src="/AboutGrid.png"
              alt="Winter Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={85}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};