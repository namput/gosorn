import React from "react";

const WhyChooseUsSection: React.FC = () => {
  const advantages = [
    {
      title: "ติวเตอร์มากประสบการณ์",
      detail: "คัดเลือกติวเตอร์ที่เชี่ยวชาญและมีผลงานด้านการสอน",
      icon: "🌟",
    },
    {
      title: "เรียนได้ทั้งออนไลน์และตัวต่อตัว",
      detail: "เลือกวิธีเรียนที่สะดวก ไม่ว่าจะอยู่ที่ไหนก็เรียนได้",
      icon: "💻",
    },
    {
      title: "เนื้อหาปรับตามผู้เรียน",
      detail: "วิเคราะห์จุดอ่อนของผู้เรียนและปรับหลักสูตรให้เหมาะสม",
      icon: "⚙️",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          ทำไมต้องเลือกเรา?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-white p-6 rounded shadow hover:shadow-md">
              <div className="text-6xl mb-4">{adv.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
              <p className="text-gray-600">{adv.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
