import React from "react";
import MainText from "./components/Home/MainText";
import CollectionsPage from "./components/Home/Collection";
import { ServicesSection } from "./components/Home/SpecialAbout";
import BestSellers from "./components/Home/BestSellers";
import { AboutGrid } from "./components/Home/AboutGrid";

const page = () => {
  return (
    <div className=" mt-10 ">
      <MainText />
      <CollectionsPage />
      <ServicesSection />
      <BestSellers />
      <AboutGrid />
    </div>
  );
};

export default page;
