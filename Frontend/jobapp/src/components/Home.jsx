import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CartegoryCarousel from "./CartegoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  if (user?.role === "recruiter") {
    navigate("/admin/companies");
  }
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CartegoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
