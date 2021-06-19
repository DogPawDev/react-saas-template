import React, { Fragment } from "react";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import ResultSection from "./ResultSection";

function Home(props) {
  return (
    <Fragment>
      <HeadSection />
      <ResultSection/>
      <FeatureSection/>
      
      <PricingSection />
    </Fragment>
  );
}



export default Home;
