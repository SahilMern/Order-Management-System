"use client";
import React from "react";
import { motion } from "framer-motion";

const MainText = () => {
  return (
    <motion.section
      className="text-center py-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-wide mb-6"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        New Collections
      </motion.h1>
      <motion.p
        className="text-lg text-gray-400 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Saepe voluptas
        ut dolorum consequuntur, adipisci repellat! Eveniet commodi voluptatem
        voluptate, eum minima, in suscipit explicabo voluptatibus harum,
        quibusdam ex repellat eaque!
      </motion.p>
    </motion.section>
  );
};

export default MainText;