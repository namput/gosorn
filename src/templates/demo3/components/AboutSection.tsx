// components/AboutSection.tsx
import React from "react";
import { TutorData } from "../types";

interface AboutSectionProps {
  data: TutorData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <section id="about" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">เกี่ยวกับติวเตอร์</h2>
        <p className="mb-4">{data.bio}</p>
      </div>
    </section>
  );
};

export default AboutSection;
