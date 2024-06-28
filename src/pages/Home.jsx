import React from "react";
import { useSelector } from "react-redux";
import HeroSection from "../components/HeroSection.home";
import Loader from "../components/Loader";

const Home = () => {
  const { error, loading, products } = useSelector((state) => state.products);

  if (loading) {
    return <Loader />;
  }

  if (error !== null) {
    return <h1>something went wrong.. please try again</h1>;
  }
  return (
    <div>
      <HeroSection />
      {/* <Card data={user} /> */}
    </div>
  );
};

export default Home;
