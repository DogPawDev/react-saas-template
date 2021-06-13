import React, { Fragment } from "react";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";

function Home(props) {
  return (
    <Fragment>
      <HeadSection />
      <FeatureSection />
      <PricingSection />
    </Fragment>
  );
}



export default Home;
