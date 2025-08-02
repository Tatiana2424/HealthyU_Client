import React from "react";
import "./AboutUs.scss";
import Banner from "../../components/common/Banner/Banner";

const AboutUs: React.FC = () => {
  return (
    <>
      <Banner
        title="About HealthyU"
        bannerImageUrl="https://www.steroplast.co.uk/media/webp_image/blogimage--avocado.webp"
        bannerMarginTop={100}
        bannerHeight={300}
        alignment={"center"}
        isDarken={true}
      />
      <div className="about-us-container">
        <br />
        <p>
          At <b>HealthyU</b>, we believe that good health is the foundation of
          vibrant lives, thriving communities, and forward progress. Since 2024,
          we've been on a mission to help our customers achieve and maintain
          optimal health through our comprehensive platform that focuses on
          nutrition, fitness, mental well-being, and holistic health.
        </p>

        <p>
          Our journey began with Tatiana Shumylo, whose personal experiences
          with relevant health journey led to the creation of <b>HealthyU</b>.
          What started as a blog to share personal insights and health tips has
          grown into a full-fledged wellness platform serving thousands of
          individuals seeking to improve their lives.
        </p>

        <p>
          <b>HealthyU</b> offers a wide range of services, including
          personalized meal plans, fitness routines, mental health support, and
          a supportive community that encourages every member to reach their
          potential. Our expert team of nutritionists, personal trainers, and
          health advisors are dedicated to providing the best advice tailored to
          individual needs.
        </p>

        <p>
          We're proud to have created a space where the conversation about
          health and wellness is ongoing and dynamic. Whether you're looking to
          transform your body, improve your mental agility, or simply live a
          healthier lifestyle, <b>HealthyU</b> is here to guide you every step
          of the way.
        </p>

        <p>
          Thank you for choosing us as your partner on this journey to health
          and wellness. If you have any questions, ideas, or stories to share,
          our team at <b>HealthyU</b> is always here to listen and support.
        </p>

        <p>With health at the heart of everything we do,</p>
        <p>
          <b>The HealthyU Team</b>
        </p>
      </div>
    </>
  );
};

export default AboutUs;
