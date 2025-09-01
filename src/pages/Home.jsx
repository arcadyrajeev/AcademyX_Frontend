import React from "react";
import HomeHero from "../components/Home/HomeHero";
import TopCreators from "../components/Home/TopCreators";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../Stylesheets/base.css";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-2 lg:p-5 gap-6 lg:gap-10">
        <HomeHero />
        <TopCreators />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
