import { ReactNode } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100 text-gray-900 font-sans">{children}</div> // ✅ ใช้ฟอนต์และธีมเดียวกันทั่วเว็บ
  );
};

export default ThemeProvider;
