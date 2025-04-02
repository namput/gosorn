import React from "react";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "สมชาย ใจดี",
      feedback:
        "คุณครูอธิบายเข้าใจง่าย ทำให้ผมเขียนโค้ดได้ดีขึ้นมาก!",
      avatar: "https://picsum.photos/id/1005/60/60",
    },
    {
      name: "สมหญิง สอนดี",
      feedback:
        "เรียนออนไลน์ก็สะดวกดี ติวเตอร์มีเทคนิคดี ๆ แนะนำตลอด",
      avatar: "https://picsum.photos/id/1001/60/60",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          รีวิวจากนักเรียน
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded shadow hover:shadow-md flex flex-col items-center"
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="rounded-full mb-4"
              />
              <p className="text-gray-700 italic mb-2">“{item.feedback}”</p>
              <p className="text-sm text-gray-600">- {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
