import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const HelpCenter = ({ darkMode }: { darkMode: boolean }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "สมัครสมาชิกอย่างไร?",
      answer: "ไปที่หน้า 'สมัครสมาชิก' และกรอกข้อมูลตามแบบฟอร์มให้ครบถ้วน แล้วกด 'สมัครสมาชิก' เพื่อเริ่มต้นใช้งาน",
    },
    {
      question: "ลืมรหัสผ่านต้องทำอย่างไร?",
      answer: "กดที่ 'ลืมรหัสผ่าน' บนหน้าเข้าสู่ระบบ แล้วทำตามขั้นตอนเพื่อรีเซ็ตรหัสผ่านใหม่ผ่านอีเมลของคุณ",
    },
    {
      question: "เติมเงินไม่สำเร็จต้องทำอย่างไร?",
      answer: "ตรวจสอบยอดเงินและสถานะอินเทอร์เน็ตของคุณ แล้วลองทำรายการใหม่ หากยังมีปัญหา กรุณาติดต่อทีม Support",
    },
    {
      question: "ต้องการยกเลิกคอร์สเรียนทำอย่างไร?",
      answer: "คุณสามารถยกเลิกคอร์สได้จากหน้า 'คอร์สของฉัน' ภายในระยะเวลาที่กำหนด โดยไม่มีค่าใช้จ่ายเพิ่มเติม",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`p-6 min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">🆘 ศูนย์ช่วยเหลือ</h1>
          <p className="text-gray-500 dark:text-gray-400">หากคุณมีคำถามหรือพบปัญหาเกี่ยวกับการใช้งาน สามารถค้นหาคำตอบได้ที่นี่</p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 mt-10 text-center">
          <h2 className="text-2xl font-bold">📞 ติดต่อทีม Support</h2>
          <p>หากยังไม่พบคำตอบที่ต้องการ คุณสามารถติดต่อเราได้ที่:</p>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>อีเมล: support@guson.in.th</p>
            <p>เบอร์โทร: 098-123-4567</p>
            <p>ไลน์: @gusonsupport</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HelpCenter;
