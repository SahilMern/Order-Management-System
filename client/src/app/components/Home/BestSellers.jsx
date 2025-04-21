"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: "DARK FLORISH ONEPIECE",
      price: "$95.00",
      image: "/bestseller.png",
    },
    {
      id: 2,
      name: "BAGGY SHIRT",
      price: "$55.00",
      image: "/bestseller2.png",
    },
    {
      id: 3,
      name: "COTTON OFF-WHITE SHIRT",
      price: "$65.00",
      image: "/bestseller4.png",
    },
    {
      id: 4,
      name: "CROP SWEATER",
      price: "$50.00",
      image: "/bestseller5.png",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5, // Initial delay of 500ms
        when: "beforeChildren",
        staggerChildren: 0.2, // Stagger children by 0.2s
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="py-12 px-4 sm:px-6 lg:px-8 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-gray-900"
          variants={item}
        >
          OUR BEST SELLERS
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              className="group relative overflow-hidden rounded-lg  hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={667}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-2 text-gray-700">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-10 text-center"
          variants={item}
        >
          <Link href="/products">
            <button className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-300">
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BestSellers;